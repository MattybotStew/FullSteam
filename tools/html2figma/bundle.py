#!/usr/bin/env python3
"""
Bundle a parsed spec + the Figma builder into one file you can paste into
figma_execute (via the Figma Desktop Bridge).

Usage
  python3 bundle.py out/homepage.json --page 3:55487 --x 0 --y 0 > bundle_home.json.js

Then in the console:
  read bundle_home.json.js, paste its whole contents as the `code` argument.
The bundle ends with a `return await buildPage(...)`, so it is the whole script.
"""

import argparse
import json
import pathlib

HERE = pathlib.Path(__file__).parent


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--page", required=True, help="Figma page node id, e.g. 3:55487")
    ap.add_argument("--x", type=float, default=None)
    ap.add_argument("--y", type=float, default=None)
    ap.add_argument("--out", default=None)
    a = ap.parse_args()

    spec = json.loads(pathlib.Path(a.spec).read_text(encoding="utf-8"))
    build = (HERE / "build.js").read_text(encoding="utf-8")

    opts = {"pageId": a.page}
    if a.x is not None:
        opts["x"] = a.x
    if a.y is not None:
        opts["y"] = a.y

    code = (
        build
        + "\nconst SPEC = "
        + json.dumps(spec, ensure_ascii=False, separators=(",", ":"))
        + ";\nconst OPTS = "
        + json.dumps(opts)
        + ";\nreturn await buildPage(SPEC, OPTS);\n"
    )

    if a.out:
        pathlib.Path(a.out).write_text(code, encoding="utf-8")
        print(f"{a.out}  {len(code)} bytes  ({spec['n']})")
    else:
        print(code)


if __name__ == "__main__":
    main()
