/* Browser-side extractor: turns the rendered wireframe into an absolute-geometry
 * spec that exact_build.js replays in Figma.
 *
 * Run it in the page (viewport width = the design width, scrolled to top):
 *   const src = await (await fetch('/tools/html2figma/extract.js')).text();
 *   eval(src); const spec = await window.__h2fExtract();
 *
 * Text is emitted line by line from Range.getClientRects(), so Figma never
 * re-wraps: every line keeps the browser's exact x/y and its own string.
 */
window.__h2fExtract = async function () {
  await document.fonts.ready;
  const scrollH = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight
  );
  const W = document.documentElement.clientWidth;

  const SKIP = new Set(['SCRIPT', 'STYLE', 'HEAD', 'TITLE', 'NOSCRIPT', 'META', 'LINK', 'TEMPLATE']);
  const SKIP_CLASS = ['site-overlay', 'menu-scrim'];

  const round = (v) => Math.round(v * 100) / 100;
  const hex = (s) => {
    if (!s || s === 'transparent' || s === 'none') return null;
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map(parseFloat);
    if (p.length > 3 && p[3] === 0) return null;
    return '#' + p.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  };

  const shown = (el, cs) => {
    if (!cs) return false;
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    if (parseFloat(cs.opacity) === 0) return false;
    return true;
  };

  const fontKind = (family) => {
    const f = (family || '').toLowerCase();
    if (f.includes('mono') || f.includes('menlo') || f.includes('courier')) return 'mono';
    if (f.includes('archivo')) return 'display';
    return 'sans';
  };

  // Chrome still returns boxes for content inside a closed <details>; it is not
  // painted, so it must not be copied into the frame.
  const inClosedDetails = (el) => {
    const det = el.closest('details');
    if (!det || det.open) return false;
    return !el.closest('summary');
  };

  const box = (r) => ({
    x: round(r.left),
    y: round(r.top + window.scrollY),
    w: round(r.width),
    h: round(r.height),
  });

  const nodes = [];

  /* ---------------------------------------------------------------- boxes */
  for (const el of document.body.querySelectorAll('*')) {
    if (SKIP.has(el.tagName)) continue;
    const cls = (el.className && el.className.toString()) || '';
    if (SKIP_CLASS.some((c) => cls.split(/\s+/).includes(c))) continue;
    const cs = getComputedStyle(el);
    if (!shown(el, cs)) continue;
    if (inClosedDetails(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 0.5 || r.height < 0.5) continue;
    const b = box(r);

    const bg = hex(cs.backgroundColor);
    if (bg) nodes.push({ k: 'rect', ...b, fill: bg, radius: parseFloat(cs.borderTopLeftRadius) || 0 });

    const sides = {
      t: [parseFloat(cs.borderTopWidth) || 0, cs.borderTopStyle, hex(cs.borderTopColor)],
      r: [parseFloat(cs.borderRightWidth) || 0, cs.borderRightStyle, hex(cs.borderRightColor)],
      b: [parseFloat(cs.borderBottomWidth) || 0, cs.borderBottomStyle, hex(cs.borderBottomColor)],
      l: [parseFloat(cs.borderLeftWidth) || 0, cs.borderLeftStyle, hex(cs.borderLeftColor)],
    };
    const dash = /dashed|dotted/.test(cs.borderTopStyle);
    const [t, ri, bo, l] = [sides.t, sides.r, sides.b, sides.l];
    if (t[0] && t[1] !== 'none' && t[2]) nodes.push({ k: 'rect', x: b.x, y: b.y, w: b.w, h: t[0], fill: t[2], dash });
    if (bo[0] && bo[1] !== 'none' && bo[2]) nodes.push({ k: 'rect', x: b.x, y: round(b.y + b.h - bo[0]), w: b.w, h: bo[0], fill: bo[2], dash });
    if (l[0] && l[1] !== 'none' && l[2]) nodes.push({ k: 'rect', x: b.x, y: b.y, w: l[0], h: b.h, fill: l[2], dash });
    if (ri[0] && ri[1] !== 'none' && ri[2]) nodes.push({ k: 'rect', x: round(b.x + b.w - ri[0]), y: b.y, w: ri[0], h: b.h, fill: ri[2], dash });
  }

  /* ---------------------------------------------------------------- text  */
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const p = node.parentElement;
      if (!p || SKIP.has(p.tagName)) return NodeFilter.FILTER_REJECT;
      const cls = (p.className && p.className.toString()) || '';
      if (SKIP_CLASS.some((c) => cls.split(/\s+/).includes(c))) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const styleOf = (el) => {
    const cs = getComputedStyle(el);
    return {
      ff: fontKind(cs.fontFamily),
      fs: parseFloat(cs.fontSize),
      fw: parseInt(cs.fontWeight, 10) >= 600 ? 'Bold' : 'Regular',
      lh: cs.lineHeight === 'normal' ? Math.round(parseFloat(cs.fontSize) * 1.2) : parseFloat(cs.lineHeight),
      ls: cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing),
      color: hex(cs.color) || '#000000',
      up: cs.textTransform === 'uppercase',
    };
  };

  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!shown(parent, getComputedStyle(parent))) continue;
    if (inClosedDetails(parent)) continue;
    const raw = node.textContent;
    const style = styleOf(parent);
    const range = document.createRange();
    range.selectNodeContents(node);
    const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
    if (!rects.length) continue;

    const collapse = (s) => s.replace(/\s+/g, ' ').trim();

    if (rects.length === 1) {
      const t = collapse(raw);
      if (!t) continue;
      nodes.push({ k: 'text', ...box(rects[0]), t, ...style });
      continue;
    }

    // Split the run across line boxes by measuring each character once.
    const lines = [];
    let current = null;
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      const cr = document.createRange();
      cr.setStart(node, i);
      cr.setEnd(node, i + 1);
      const b = cr.getBoundingClientRect();
      if (b.width === 0 && b.height === 0) continue;
      const key = Math.round(b.top);
      if (!current || current.key !== key) {
        current = { key, top: b.top, left: b.left, right: b.right, chars: [] };
        lines.push(current);
      }
      current.chars.push(ch);
      current.left = Math.min(current.left, b.left);
      current.right = Math.max(current.right, b.right);
    }
    for (const ln of lines) {
      const t = collapse(ln.chars.join(''));
      if (!t) continue;
      const fs = style.fs;
      nodes.push({
        k: 'text',
        x: round(ln.left),
        y: round(ln.top + window.scrollY),
        w: round(ln.right - ln.left),
        h: round(style.lh || fs * 1.2),
        t,
        ...style,
      });
    }
  }

  nodes.sort((a, b) => (a.k === 'text' ? 1 : 0) - (b.k === 'text' ? 1 : 0));
  return { w: W, h: Math.ceil(scrollH), nodes };
};
