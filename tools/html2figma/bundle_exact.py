#!/usr/bin/env python3
"""Bundle an exact-geometry spec with exact_build.js for figma_execute.

Usage
  python3 bundle_exact.py out/careers.exact.json --page 3:55487 \
    --name "Careers" --x 25075 --y -3213 --out out/e-careers.js
"""
import argparse
import json
import pathlib

HERE = pathlib.Path(__file__).parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--page", required=True)
    ap.add_argument("--name", required=True)
    ap.add_argument("--x", type=float, default=None)
    ap.add_argument("--y", type=float, default=None)
    ap.add_argument("--from", dest="start", type=int, default=None)
    ap.add_argument("--to", type=int, default=None)
    ap.add_argument("--frame-id", default=None)
    ap.add_argument("--out", default=None)
    a = ap.parse_args()

    spec = json.loads(pathlib.Path(a.spec).read_text(encoding="utf-8"))
    build = (HERE / "exact_build.js").read_text(encoding="utf-8")
    opts = {"pageId": a.page, "name": a.name}
    if a.x is not None:
        opts["x"] = a.x
    if a.y is not None:
        opts["y"] = a.y
    if a.start is not None:
        opts["from"] = a.start
    if a.to is not None:
        opts["to"] = a.to
    if a.frame_id:
        opts["frameId"] = a.frame_id

    code = (
        build
        + "\nconst SPEC = "
        + json.dumps(spec, ensure_ascii=False, separators=(",", ":"))
        + ";\nconst OPTS = "
        + json.dumps(opts)
        + ";\nreturn await exactBuild(SPEC, OPTS);\n"
    )
    if a.out:
        pathlib.Path(a.out).write_text(code, encoding="utf-8")
        print(f"{a.out}  {len(code)} bytes  ({len(spec['nodes'])} nodes)")
    else:
        print(code)


if __name__ == "__main__":
    main()
