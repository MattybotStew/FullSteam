#!/usr/bin/env python3
"""
HTML -> Figma wireframe spec.

Reads a Fullsteam wireframe HTML file and emits a JSON spec that build.js
turns into real Figma frames, text nodes and placeholder rectangles.

Structural fidelity, not pixel fidelity. Every string survives as editable text.
Re-runnable: same HTML in, same frames out.

Usage
  python3 parse.py ../../02_Wireframes/active/pages/vertical-software.html out/vs.json
"""

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

# ---------------------------------------------------------------- palette
INK = "#000000"
TAN = "#F3E6D0"
WHITE = "#FFFFFF"
DARK = "#111111"
YELLOW = "#FFC600"
PH = "#4A4A4A"

SKIP = {"script", "style", "head", "title", "noscript", "svg", "meta", "link"}
VOID = {"br", "img", "hr", "input", "source", "area", "base", "col", "embed", "wbr"}

INLINE = {"span", "strong", "b", "em", "i", "code", "a", "small", "sup", "sub"}
BLOCKISH = {"div", "section", "article", "p", "h1", "h2", "h3", "h4", "ul", "ol", "figure",
            "header", "footer", "nav", "main", "form", "details", "aside", "table", "li"}


class Node:
    __slots__ = ("tag", "attrs", "children")

    def __init__(self, tag, attrs=None):
        self.tag = tag
        self.attrs = dict(attrs or {})
        self.children = []          # Node | str

    @property
    def classes(self):
        return (self.attrs.get("class") or "").split()

    def has(self, *names):
        return any(n in self.classes for n in names)

    def elements(self):
        return [c for c in self.children if isinstance(c, Node)]


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs)
        self.stack[-1].children.append(n)
        if tag not in VOID:
            self.stack.append(n)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].children.append(Node(tag, attrs))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        if self.stack:
            self.stack[-1].children.append(data)


def parse(html, keep=("body",)):
    p = Tree()
    p.feed(html)
    node = p.root
    for tag in keep:
        found = find(node, tag)
        if found:
            node = found
    return node


def find(node, tag):
    for c in node.elements():
        if c.tag == tag:
            return c
        r = find(c, tag)
        if r:
            return r
    return None


def txt(node):
    """All descendant text, whitespace-collapsed."""
    if isinstance(node, str):
        return node
    out = []
    for c in node.children:
        if isinstance(c, str):
            out.append(c)
        elif c.tag not in SKIP and c.tag not in ("br",):
            out.append(txt(c))
    return re.sub(r"\s+", " ", " ".join(out)).strip()


def own_text(node):
    """Text of this node, stopping at nested block elements."""
    out = []

    def walk(n):
        for c in n.children:
            if isinstance(c, str):
                out.append(c)
            elif c.tag in SKIP:
                continue
            elif c.tag in BLOCKISH and c.tag != "li":
                continue
            else:
                walk(c)

    walk(node)
    return re.sub(r"\s+", " ", " ".join(out)).strip()


# ------------------------------------------------------------------ spec

# Page-level conversion options (set from argv in main, before convert()).
# SUBS: literal token -> value, applied to every text run (e.g. {{V}} -> Hospitality).
SUBS = {}


# CSS grid containers in the wireframes that would otherwise stack as columns.
# (class, columns, gap, frame name) — mirrors the desktop grid-template-columns.
GRID_CLASSES = [
    ("bleed-imgs", 4, 10, "Image band"),
    ("kpi-row", 4, 12, "KPI row"),
    ("leaders", 3, 24, "Leaders"),
    ("founder-videos", 3, 16, "Founder videos"),
    ("video-row", 3, 16, "Videos"),
    ("ucases", 3, 16, "Use cases"),
    ("agl", 3, 16, "Grid"),
    ("careers-grid", 2, 16, "Careers grid"),
    ("founders", 2, 16, "Founders"),
    ("layout", 2, 32, "Layout"),
    ("vrow__grid", 2, 16, "Row grid"),
    ("close__cards", 2, 16, "Close cards"),
    ("stage", 2, 14, "Stage"),
]


def T(text, size=16, weight="Regular", mono=False, color=INK, italic=False,
      upper=False, lh=None, ls=None, maxw=None, name=None):
    for token, value in SUBS.items():
        if token in text:
            text = text.replace(token, value)
    d = {"k": "text", "t": text, "fs": size, "fw": weight,
         "ff": "mono" if mono else "sans", "lc": color}
    if name in ("H1", "H2", "H3", "H4"):
        d["fd"] = 1          # headline face (Archivo), mirrors --display in the CSS
    if italic: d["it"] = 1
    if upper: d["up"] = 1
    if lh: d["lh"] = lh
    if ls is not None: d["ls"] = ls
    if maxw: d["mw"] = maxw
    if name: d["nm"] = name
    return d


def F(children, mode="col", pad=None, gap=None, bg=None, border=None, name=None,
      fill=True, width=None, align=None, justify=None, minh=None, grow=None, maxw=None):
    d = {"k": "frame", "c": [c for c in children if c]}
    if mode != "col": d["d"] = mode
    if pad: d["p"] = pad
    if gap is not None: d["g"] = gap
    if bg: d["bg"] = bg
    if border: d["bd"] = border
    if name: d["nm"] = name
    if not fill:
        d["w"] = "fixed"
        if width: d["fw"] = width
    if align: d["al"] = align
    if justify: d["jc"] = justify
    if minh: d["mh"] = minh
    if grow: d["gr"] = grow
    if maxw: d["mw"] = maxw
    return d


def PH(height=180, name="Image placeholder"):
    return {"k": "ph", "mh": height, "nm": name}


def PILL(text, big=False):
    return {"k": "pill", "t": text, "fs": 16 if big else 13,
            "pad": [14, 28, 14, 28] if big else [9, 18, 9, 18]}


def ANNO(text, dark=False):
    return {"k": "anno", "t": text, "lc": WHITE if dark else INK}


def BORDER(sides="all", color=INK, weight=1, dashed=False):
    return {"c": color, "w": weight, "dash": 1 if dashed else 0, "s": sides}


# ------------------------------------------------------------- converter

class Conv:
    def __init__(self):
        pass

    # -- dispatch ------------------------------------------------
    def el(self, n, dark=False):
        if not isinstance(n, Node):
            return None
        tag = n.tag.lower()
        if tag in SKIP:
            return None
        cls = n.classes

        # text-bearing leaves first
        if tag == "h1":
            return T(own_text(n), 56, "Bold", lh=1.05, ls=-1.5, maxw=760, name="H1")
        if tag == "h2":
            return T(own_text(n), 40, "Bold", lh=1.1, ls=-1, maxw=720, name="H2")
        if tag == "h3":
            return T(own_text(n), 20, "Bold", name="H3")
        if tag == "h4":
            return T(own_text(n), 15, "Bold", name="H4")
        if tag == "summary":
            return T(own_text(n), 18, "Bold", name="Question")
        if tag == "p":
            # A <p> that wraps a pill (or a row of them) is an action row; render the
            # children so the gold button survives instead of becoming body text.
            if any(isinstance(c, Node) and "pill" in c.classes for c in n.children):
                kids = [self.el(c) for c in n.elements()]
                return F([k for k in kids if k], mode="row", gap=12, name="Actions")
            t = own_text(n)
            if not t:
                return None
            if "anno" in cls:
                return ANNO(t, dark)
            if "beat" in cls:
                return T(t, 11, "Bold", mono=True, upper=True, ls=1.4,
                         color=WHITE if dark else INK, name="Beat")
            if "lede" in cls:
                return T(t, 18, "Regular", maxw=560, name="Lede")
            if "step-k" in cls:
                return T(t, 12, "Bold", mono=True, upper=True, name="StepK")
            return T(t, 16, "Regular", maxw=680, name="P")
        if "anno" in cls:
            return ANNO(own_text(n), dark)
        if "beat" in cls:
            return T(own_text(n), 11, "Bold", mono=True, upper=True, ls=1.4,
                     color=WHITE if dark else INK, name="Beat")
        if "img-ph" in cls or tag == "img":
            return PH(180)
        if "pill" in cls:
            return PILL(own_text(n) or "CTA", big="pill-lg" in cls)
        if "logo" in cls and tag == "a":
            return T(txt(n), 18, "Bold", name="Logo", ls=0.4)
        if "fh" in cls:
            return T(own_text(n), 11, "Bold", mono=True, upper=True, ls=1.2, name="FooterHeading")
        if "menu-btn" in cls:
            return {"k": "bars", "nm": "Menu button"}
        if "nav-right" in cls:
            return F([self.el(c) for c in n.elements()], mode="row", gap=16,
                     align="center", justify="end", name="Nav right")
        if "filmstrip" in cls:
            return self.grid(n, 11, 0, "Filmstrip")
        if "ai-strip" in cls:
            return self.grid(n, 3, 0, "AI strip")
        if "v-hero-grid" in cls:
            return self.grid(n, 2, 44, "Hero grid")
        for gcls, gcols, ggap, gname in GRID_CLASSES:
            if gcls in cls:
                return self.grid(n, gcols, ggap, gname)

        # structure
        if tag == "header":
            return self.header(n)
        if tag == "footer":
            return self.footer(n)
        if tag == "main":
            return F([self.el(c) for c in n.elements()], name="Main")
        if tag == "section":
            return self.section(n)
        if "wrap" in cls:
            if "split" in cls:
                return F([self.el(c) for c in n.elements()], mode="row", gap=32,
                         align="start", pad=[0, 24, 0, 24],
                         name="Wrap split", fill=False, width=1120)
            return F([self.el(c) for c in n.elements()], pad=[0, 24, 0, 24],
                     name="Wrap", fill=False, width=1120)
        if "split" in cls:
            return F([self.el(c) for c in n.elements()], mode="row", gap=32,
                     align="start", name="Split")
        if "cards" in cls:
            return self.grid(n, 3, 16, "Cards")
        if "values" in cls:
            return self.grid(n, 3, 12, "Values")
        if "facts" in cls:
            return self.grid(n, 2, 12, "Facts")
        if "logo-row" in cls:
            return self.grid(n, 4, 12, "Logo row")
        if "shot-row" in cls:
            return self.grid(n, 3, 12, "Screenshot row")
        if "steps" in cls:
            return F([self.step(c) for c in n.elements() if c.tag == "li"], gap=16, name="Steps")
        if "faq" in cls:
            return F([self.faq(c) for c in n.elements() if c.tag == "details"], name="FAQ")
        if "posts" in cls:
            return self.grid(n, 3, 16, "Posts")
        if "careers-points" in cls:
            return F([self.step(c) for c in n.elements() if c.tag == "li"], gap=16, name="Points")
        if "compare" in cls:
            return self.grid(n, 2, 16, "Compare")
        if "stat-row" in cls:
            return self.grid(n, 3, 16, "Stats")
        if "logo-line" in cls:
            return self.grid(n, 4, 12, "Logo line")
        if "logo-grid" in cls:
            return self.grid(n, 3, 16, "Logo grid")
        if "v-photo-pair" in cls:
            return self.grid(n, 2, 16, "Photos")
        if "v-shot" in cls:
            return self.grid(n, 3, 16, "Screenshots")
        if "voices" in cls:
            return self.grid(n, 3, 16, "Testimonials")
        if "use-grid" in cls:
            return self.grid(n, 3, 16, "Use cases")
        if "li-posts" in cls:
            return self.grid(n, 3, 16, "LinkedIn posts")
        if "v-layout" in cls:
            return F([self.el(c) for c in n.elements()], mode="row", gap=40,
                     align="start", name="Vertical layout")
        if "oe-layout" in cls:
            return F([self.el(c) for c in n.elements()], mode="row", gap=40,
                     align="start", name="Our Advantage layout")
        if "v-side" in cls:
            return self.sidebar(n)
        if "oe-side" in cls:
            return self.sidebar(n)
        if "v-content" in cls:
            # The panel bodies are filled by JS from <template id="tpl-vertical">.
            # Rendering the template gives the static wireframe its default state.
            panels = [c for c in n.elements() if c.tag == "article"]
            tpls = [c for c in n.elements() if c.tag == "template"]
            kids = [self.el(t) for t in tpls]
            # the live panels are empty shells filled by JS from the template above
            kids += [self.el(a) for a in panels if a.has("is-active") and a.elements()]
            return F([k for k in kids if k], gap=16, name="Content")
        if tag == "template":
            return F([self.el(c) for c in n.elements()], gap=16, name="Template")
        if tag == "details":
            return self.faq(n)
        if tag in ("ul", "ol"):
            items = [self.el(c) for c in n.elements() if c.tag == "li"]
            return F([i for i in items if i], gap=8, name=tag.upper())
        if tag == "li":
            return self.li(n)
        if tag == "figure":
            return F([self.el(c) for c in n.elements()], gap=8, name="Figure")
        if tag == "article":
            return F([self.el(c) for c in n.elements()], bg=WHITE,
                     border=BORDER(), name="Card")
        if tag == "a" and "text-link" in cls:
            return T(txt(n), 15, "Bold", name="Text link")
        if tag in ("table",):
            return F([self.el(c) for c in n.elements()], gap=8, name="Table")
        if tag == "nav":
            return None

        # A block whose only children are inline (or none) is a text leaf:
        # e.g. <div><span>Capital</span>Borrow against future transactions.</div>
        # own_text() stops at nested blocks, so this never swallows a container.
        if not any(c.tag in BLOCKISH and c.tag != "li" for c in n.elements()):
            leaf = own_text(n)
            if leaf:
                return T(leaf, 15, "Regular", name=cls[0] if cls else tag)

        kids = [self.el(c, dark) for c in n.elements()]
        kids = [k for k in kids if k]
        if not kids:
            t = own_text(n)
            return T(t, 15, "Regular") if t else None
        return F(kids, gap=12, name=(cls[0] if cls else tag))

    # -- composites ---------------------------------------------
    def header(self, n):
        kids = []
        for c in n.elements():
            if c.tag == "nav" or c.has("site-overlay", "menu-scrim"):
                continue
            k = self.el(c)
            if k:
                kids.append(k)
        return F([F(kids, mode="row", justify="space-between", align="center", name="Nav")],
                 pad=[12, 24, 12, 24], bg=WHITE, border=BORDER("bottom"),
                 name="Header", minh=84)

    def footer(self, n):
        cols = []
        for c in n.elements():
            if c.has("foot"):
                for col in c.elements():
                    kids = [self.el(x) for x in col.elements()]
                    cols.append(F([k for k in kids if k], gap=4, name="Footer column"))
            else:
                k = self.el(c)
                if k:
                    cols.append(k)
        return F([F(cols, mode="row", gap=48, justify="space-between", name="Footer row")],
                 pad=[40, 160, 56, 160], bg=TAN, border=BORDER("top"), name="Footer")

    def section(self, n):
        cls = n.classes
        bg = DARK if "dark" in cls else (TAN if "tan" in cls else WHITE)
        dark = "dark" in cls
        pad = [64, 0, 64, 0]
        if "page-hero" in cls or "v-hero" in cls:
            pad = [64, 0, 48, 0]
        kids = [self.el(c, dark) for c in n.elements()]
        return F([k for k in kids if k], pad=pad, bg=bg, border=BORDER("bottom"),
                 name="Section" + (": " + " ".join(cls) if cls else ""))

    def grid(self, n, cols, gap, name):
        kids = [self.el(c) for c in n.elements()]
        kids = [k for k in kids if k]
        if cols <= 1 or len(kids) <= 1:
            return F(kids, gap=gap, name=name)
        rows = [F(kids[i:i + cols], mode="row", gap=gap, name="Row")
                for i in range(0, len(kids), cols)]
        return F(rows, gap=gap, name=name)

    def step(self, n):
        num, body = None, []
        for c in n.elements():
            if c.tag == "b":
                num = own_text(c)
            else:
                k = self.el(c)
                if k:
                    body.append(k)
        return F([T(num or "01", 12, "Bold", mono=True, name="Number"),
                  F(body, gap=6, name="Body")],
                 mode="row", gap=14, pad=[16, 0, 0, 0],
                 border=BORDER("top"), name="Step")

    def faq(self, n):
        """A <details> is either an FAQ row (summary + p) or an accordion row
        whose body contains nested structure (homepage vertical rows). Render
        whatever is actually there instead of assuming the FAQ shape."""
        kids = []
        for c in n.elements():
            if c.tag == "summary":
                continue
            k = self.el(c)
            if k:
                kids.append(k)
        head = [T(own_text(s), 18, "Bold", name="Question")
                for s in n.elements() if s.tag == "summary"]
        return F(head + kids, gap=10, pad=[14, 0, 14, 0],
                 border=BORDER("bottom"), name="Accordion item")

    def li(self, n):
        kids = [self.el(c) for c in n.elements()]
        kids = [k for k in kids if k]
        if not kids:
            t = own_text(n)
            return T(t, 15, "Regular") if t else None
        return F(kids, gap=8, name="Item")

    def sidebar(self, n):
        kids = []
        for c in n.elements():
            if c.tag == "div" and (c.has("v-side-list") or c.has("oe-side-list")):
                for b in c.elements():
                    if b.tag == "button":
                        kids.append(F([T(own_text(b), 15, "Bold", name="Vertical")],
                                      pad=[12, 0, 12, 0], border=BORDER("bottom"),
                                      name="Sidebar item"))
                continue
            k = self.el(c)
            if k:
                kids.append(k)
        return F(kids, gap=0, fill=False, width=260, name="Sidebar")


def convert(html, name):
    body = parse(html)
    conv = Conv()
    kids = [conv.el(c) for c in body.elements()]
    kids = [k for k in kids if k]
    return {
        "n": name,
        "w": 1440,
        "c": kids,
    }


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    for a in sys.argv[1:]:
        if a.startswith("--sub="):
            token, _, value = a[len("--sub="):].partition("=")
            SUBS[token] = value
    if len(args) < 2:
        raise SystemExit("usage: parse.py <in.html> <out.json> "
                         "[--sub='{{V}}=Hospitality']")
    src = Path(args[0])
    dst = Path(args[1])
    html = src.read_text(encoding="utf-8")
    title_m = re.search(r"<title>(.*?)</title>", html, re.S)
    name = (title_m.group(1).split("—")[0].strip() if title_m else src.stem)
    spec = convert(html, name)
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(json.dumps(spec, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{src.name} -> {dst}  nodes={len(spec['c'])}  bytes={dst.stat().st_size}")


if __name__ == "__main__":
    main()
