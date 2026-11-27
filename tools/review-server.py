#!/usr/bin/env python3
"""
Local review server for the Fullsteam client-review pages.

Serves the repo root exactly like `python3 -m http.server`, and adds one
endpoint so the homepage comment pointer can persist notes into the repo:

    GET  /__design-notes?page=/03_Design/client-review/homepage/
         -> { ok, page, notes, updatedAt, json, md }

    POST /__design-notes
         body: { "page": "/03_Design/.../", "notes": [ ... ] }
         -> replaces that page's notes, writes design-comments.json + .md

The notes are intentionally local-only (gitignored) and never staged by
pages.yml. DeepSeek reads design-comments.md / .json and applies the changes.

Run from anywhere:
    python3 tools/review-server.py [port]     # default 8000
"""

from __future__ import annotations

import json
import os
import sys
import threading
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "03_Design" / "client-review" / "homepage"
JSON_PATH = DATA_DIR / "design-comments.json"
MD_PATH = DATA_DIR / "design-comments.md"

MAX_BODY = 1_000_000
MAX_NOTES_PER_PAGE = 300
MAX_NOTE_TEXT = 5_000
LOCK = threading.Lock()

ALLOWED_NOTE_KEYS = {
    "id",
    "selector",
    "rx",
    "ry",
    "snippet",
    "tag",
    "context",
    "text",
    "createdAt",
    "updatedAt",
    "viewport",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load_data() -> dict:
    if not JSON_PATH.exists():
        return {"version": 1, "updatedAt": None, "notes": []}
    try:
        raw = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {"version": 1, "updatedAt": None, "notes": []}
    if not isinstance(raw, dict) or not isinstance(raw.get("notes"), list):
        return {"version": 1, "updatedAt": None, "notes": []}
    return raw


def clean_note(note: object, page: str) -> dict | None:
    if not isinstance(note, dict):
        return None
    text = note.get("text")
    if not isinstance(text, str) or not text.strip():
        return None
    cleaned = {k: note.get(k) for k in ALLOWED_NOTE_KEYS if k in note}
    cleaned["page"] = page
    cleaned["text"] = text.strip()[:MAX_NOTE_TEXT]
    return cleaned


def page_label(page: str) -> str:
    if page.endswith("/"):
        return page
    return page + "/" if not page.endswith(".html") else page


def write_markdown(data: dict) -> None:
    notes = data.get("notes", [])
    pages: dict[str, list[dict]] = {}
    for note in notes:
        if not isinstance(note, dict):
            continue
        pages.setdefault(note.get("page", "unknown"), []).append(note)

    lines = [
        "# Fullsteam design comments",
        "",
        f"Updated: {data.get('updatedAt') or 'unknown'}",
        "",
        "Notes left with the comment pointer on the client-review pages.",
        "DeepSeek: read this file, apply the changes, then delete the notes you handled.",
        "",
    ]

    if not pages:
        lines.append("_No comments yet._")
        lines.append("")
    else:
        for page in sorted(pages):
            lines.append(f"## `{page}`")
            lines.append("")
            ordered = sorted(pages[page], key=lambda n: n.get("createdAt") or 0)
            for i, note in enumerate(ordered, 1):
                context = note.get("context") or note.get("tag") or "page"
                selector = note.get("selector") or "(no selector)"
                rx = note.get("rx")
                ry = note.get("ry")
                pos = ""
                if isinstance(rx, (int, float)) and isinstance(ry, (int, float)):
                    pos = f" · {round(rx * 100)}% / {round(ry * 100)}%"
                lines.append(f"### {i}. {context}")
                lines.append("")
                lines.append(f"`{selector}`{pos}")
                snippet = note.get("snippet")
                if snippet:
                    lines.append(f"Element text: “{snippet}”")
                lines.append("")
                for line in str(note.get("text", "")).splitlines() or [""]:
                    lines.append(f"> {line}")
                lines.append("")

    MD_PATH.write_text("\n".join(lines), encoding="utf-8")


def write_data(data: dict) -> None:
    data["version"] = 1
    data["updatedAt"] = now_iso()
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    tmp = JSON_PATH.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    os.replace(tmp, JSON_PATH)
    write_markdown(data)


class ReviewHandler(SimpleHTTPRequestHandler):
    server_version = "FullsteamReview/1.0"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    # -- helpers ---------------------------------------------------------

    def send_json(self, status: int, payload: dict) -> None:
        body = (json.dumps(payload, ensure_ascii=False) + "\n").encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def read_json_body(self) -> dict | None:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return None
        if length <= 0 or length > MAX_BODY:
            return None
        try:
            raw = self.rfile.read(length)
            parsed = json.loads(raw.decode("utf-8"))
        except (OSError, UnicodeDecodeError, json.JSONDecodeError):
            return None
        return parsed if isinstance(parsed, dict) else None

    # -- routes ----------------------------------------------------------

    def do_GET(self) -> None:  # noqa: N802 (http.server API)
        parsed = urlparse(self.path)
        if parsed.path == "/__design-notes":
            page = parse_qs(parsed.query).get("page", [""])[0]
            with LOCK:
                data = load_data()
            notes = [
                n
                for n in data.get("notes", [])
                if isinstance(n, dict) and (not page or n.get("page") == page)
            ]
            self.send_json(
                HTTPStatus.OK,
                {
                    "ok": True,
                    "page": page,
                    "notes": notes,
                    "updatedAt": data.get("updatedAt"),
                    "json": str(JSON_PATH.relative_to(ROOT)),
                    "md": str(MD_PATH.relative_to(ROOT)),
                },
            )
            return
        super().do_GET()

    def do_POST(self) -> None:  # noqa: N802 (http.server API)
        parsed = urlparse(self.path)
        if parsed.path != "/__design-notes":
            self.send_json(HTTPStatus.NOT_FOUND, {"ok": False, "error": "not found"})
            return

        payload = self.read_json_body()
        if payload is None:
            self.send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": "invalid JSON body"})
            return

        page = payload.get("page")
        notes = payload.get("notes")
        if not isinstance(page, str) or not page.startswith("/") or ".." in page or "//" in page:
            self.send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": "invalid page"})
            return
        if not isinstance(notes, list):
            self.send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": "notes must be an array"})
            return
        if len(notes) > MAX_NOTES_PER_PAGE:
            self.send_json(HTTPStatus.BAD_REQUEST, {"ok": False, "error": "too many notes"})
            return

        cleaned = [n for n in (clean_note(item, page) for item in notes) if n]
        with LOCK:
            data = load_data()
            kept = [
                n
                for n in data.get("notes", [])
                if isinstance(n, dict) and n.get("page") != page
            ]
            data["notes"] = kept + cleaned
            write_data(data)

        self.send_json(
            HTTPStatus.OK,
            {
                "ok": True,
                "count": len(cleaned),
                "updatedAt": data.get("updatedAt"),
                "json": str(JSON_PATH.relative_to(ROOT)),
                "md": str(MD_PATH.relative_to(ROOT)),
            },
        )

    # -- caching ---------------------------------------------------------

    def end_headers(self) -> None:
        path = urlparse(self.path).path
        if path.endswith((".html", ".js", ".css")) or path.endswith("/"):
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt: str, *args) -> None:
        # Keep request noise down, but show writes.
        if self.command == "POST":
            sys.stderr.write("[review] %s %s\n" % (self.command, self.path))
            return
        if args and str(args[1]).startswith(("4", "5")):
            sys.stderr.write("[review] %s\n" % (fmt % args))


def main() -> int:
    port = 8000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("usage: review-server.py [port]", file=sys.stderr)
            return 2

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(("127.0.0.1", port), ReviewHandler)
    print(f"Fullsteam review server: http://127.0.0.1:{port}/")
    print(f"Comment file:           {JSON_PATH.relative_to(ROOT)}")
    print(f"Readable notes:         {MD_PATH.relative_to(ROOT)}")
    print("Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nstopped")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
