#!/usr/bin/env python3
"""Static server + capture sink for the exact-geometry Figma sync.

Serves the repo so Playwright can open a wireframe, and accepts the JSON the
in-page extractor POSTs back:

  python3 tools/html2figma/capture.py 8124
  # page:  http://localhost:8124/02_Wireframes/active/pages/careers.html
  # sink:  POST http://localhost:8124/save?name=careers
  #        -> tools/html2figma/out/careers.exact.json
"""
import json
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent / "out"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ROOT), **kw)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "content-type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        from urllib.parse import urlparse, parse_qs

        q = parse_qs(urlparse(self.path).query)
        name = (q.get("name") or ["page"])[0]
        if not name.replace("-", "").isalnum():
            self.send_response(400)
            self.end_headers()
            return
        length = int(self.headers.get("content-length", 0))
        body = self.rfile.read(length)
        OUT.mkdir(parents=True, exist_ok=True)
        dest = OUT / f"{name}.exact.json"
        try:
            data = json.loads(body)
        except Exception as exc:  # noqa: BLE001
            self.send_response(400)
            self.end_headers()
            self.wfile.write(str(exc).encode())
            return
        dest.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        self.send_response(200)
        self.send_header("content-type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({
            "ok": True,
            "file": str(dest),
            "nodes": len(data.get("nodes", [])),
            "h": data.get("h"),
        }).encode())

    def log_message(self, *a):  # quiet
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8124
    print(f"serving {ROOT} on http://localhost:{port}  (sink -> {OUT})")
    ThreadingHTTPServer(("", port), Handler).serve_forever()
