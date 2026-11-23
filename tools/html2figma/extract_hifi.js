/* Browser-side hi-fi extractor for the client-review HTML pages.
 *
 * Unlike extract.js (wireframe parity: Archivo/Menlo, no images), this one
 * captures the real visual system — Instrument Sans/Serif, Fragment Mono,
 * photography, gradients, SVG marks — so the frame can be a faithful copy.
 *
 *   const src = await (await fetch('/tools/html2figma/extract_hifi.js')).text();
 *   eval(src);
 *   const spec = await window.__h2fHifi({ heroStill: 'assets/img/hero.jpg' });
 *   await fetch('http://localhost:8124/save?name=homepage-hifi', {...});
 *
 * The page must be at scroll 0 with reveal animations frozen. Call
 * window.__h2fFreeze() first (it is idempotent).
 */
window.__h2fFreeze = function () {
  document.querySelectorAll('.r').forEach((el) => el.classList.add('in'));
  const scale = document.querySelector('#scale');
  if (scale) scale.classList.add('is-strokes-in');
  document.querySelectorAll('[data-count]').forEach((el) => {
    const n = Number(el.getAttribute('data-count'));
    const p = el.getAttribute('data-prefix') || '';
    const s = el.getAttribute('data-suffix') || '';
    el.textContent = p + n.toLocaleString('en-US') + s;
  });
  document.querySelectorAll('.step.r').forEach((el) => {
    el.classList.add('in');
    el.style.setProperty('--d', '0ms');
  });
  // the founders quote is gated by its own scroll class, not .r
  document.querySelectorAll('.founders__quote').forEach((el) => el.classList.add('is-in'));
  let st = document.getElementById('__h2f');
  if (!st) {
    st = document.createElement('style');
    st.id = '__h2f';
    st.textContent =
      '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}';
    document.head.appendChild(st);
  }
  window.scrollTo(0, 0);
  return true;
};

window.__h2fHifi = async function (opts) {
  opts = opts || {};
  await document.fonts.ready;
  window.scrollTo(0, 0);
  const scrollY = window.scrollY;
  const W = document.documentElement.clientWidth;
  const H = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  const round = (v) => Math.round(v * 100) / 100;

  const SKIP = new Set(['SCRIPT', 'STYLE', 'HEAD', 'TITLE', 'NOSCRIPT', 'META', 'LINK', 'TEMPLATE']);
  const SKIP_CLASS = ['site-overlay', 'menu-scrim'];

  const colorOf = (s, allowZeroAlpha) => {
    if (!s) return null;
    const key = s.trim().toLowerCase();
    if (key === 'transparent') return allowZeroAlpha ? { r: 0, g: 0, b: 0, a: 0 } : null;
    if (key === 'white') return { r: 255, g: 255, b: 255, a: 1 };
    if (key === 'black') return { r: 0, g: 0, b: 0, a: 1 };
    const hx = key.match(/^#([0-9a-f]{3,8})$/);
    if (hx) {
      const h = hx[1];
      const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h.slice(0, 6);
      const v = parseInt(n, 16);
      return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255, a: 1 };
    }
    const m = s.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(parseFloat);
    const a = p.length > 3 ? p[3] : 1;
    if (a === 0 && !allowZeroAlpha) return null;
    return { r: p[0], g: p[1], b: p[2], a };
  };
  const rgba = (s) => colorOf(s, false);

  const isVisible = (el, cs) => {
    if (!cs) return false;
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    let n = el;
    while (n && n !== document.documentElement) {
      const s = getComputedStyle(n);
      if (parseFloat(s.opacity) === 0) return false;
      n = n.parentElement;
    }
    return true;
  };

  const inClosedDetails = (el) => {
    const det = el.closest('details');
    if (!det || det.open) return false;
    return !el.closest('summary');
  };

  const box = (r) => ({
    x: round(r.left),
    y: round(r.top + scrollY),
    w: round(r.width),
    h: round(r.height),
  });

  /* ------------------------------------------------------------- gradients */
  const splitLayers = (s) => {
    const out = [];
    let depth = 0;
    let cur = '';
    for (const ch of s) {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && depth === 0) {
        out.push(cur.trim());
        cur = '';
      } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  };

  const parseGradient = (layer) => {
    const m = layer.match(/^(repeating-)?(linear|radial)-gradient\((.*)\)$/i);
    if (!m) return null;
    const type = m[2].toLowerCase();
    const body = m[3];
    const parts = splitLayers(body);
    const stops = [];
    let angle = 180;
    let shape = { at: [50, 50], rx: 50, ry: 50 };
    let head = null;
    for (const p of parts) {
      const c = p.match(/^(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}|transparent|white|black)\s*(.*)$/i);
      if (c) {
        const col = colorOf(c[1], true);
        const pos = c[2].match(/(-?\d*\.?\d+)%/);
        if (col) stops.push({ color: col, pos: pos ? parseFloat(pos[1]) / 100 : null });
        continue;
      }
      head = p;
    }
    if (head) {
      const am = head.match(/^(?:to\s+)?(-?\d*\.?\d+)(deg|turn|rad)?/i);
      if (type === 'linear') {
        if (/^to\s+/i.test(head)) {
          const dirs = head.toLowerCase().split(/\s+/).slice(1);
          let a = 180;
          if (dirs.includes('top')) a = dirs.includes('left') ? 315 : dirs.includes('right') ? 45 : 0;
          else if (dirs.includes('bottom')) a = dirs.includes('left') ? 225 : dirs.includes('right') ? 135 : 180;
          else if (dirs.includes('left')) a = 270;
          else if (dirs.includes('right')) a = 90;
          angle = a;
        } else if (am) {
          let v = parseFloat(am[1]);
          if (am[2] === 'turn') v *= 360;
          if (am[2] === 'rad') v = (v * 180) / Math.PI;
          angle = v;
        }
      } else {
        const at = head.match(/at\s+(-?[\d.]+)%\s+(-?[\d.]+)%/);
        if (at) shape.at = [parseFloat(at[1]), parseFloat(at[2])];
        const radii = head.match(/(-?[\d.]+)%\s+(-?[\d.]+)%/);
        if (radii) shape.rx = parseFloat(radii[1]);
        if (radii && radii[2]) shape.ry = parseFloat(radii[2]);
      }
    }
    if (!stops.length) return null;
    // Figma needs the first stop at 0 and the last at 1.
    if (stops[0].pos === null) stops[0].pos = 0;
    stops.forEach((s, i) => {
      if (s.pos === null) {
        const prev = stops[i - 1];
        const next = stops.slice(i + 1).find((x) => x.pos !== null);
        s.pos = prev && next ? (prev.pos + next.pos) / 2 : prev ? prev.pos : 0;
      }
    });
    const last = stops[stops.length - 1];
    if (last.pos <= 0) last.pos = 1;
    return { type, angle, shape, stops };
  };

  const nodes = [];

  const layerOf = (el) => {
    let n = el;
    let layer = 0;
    while (n && n !== document.documentElement) {
      const s = getComputedStyle(n);
      if (s.position === 'fixed') return 2;
      if (s.position === 'sticky') layer = Math.max(layer, 1);
      n = n.parentElement;
    }
    return layer;
  };

  const emitBorders = (cs, b) => {
    const px = (v) => parseFloat(v) || 0;
    const sides = [
      ['Top', b.x, b.y, b.w, px(cs.borderTopWidth), cs.borderTopStyle, cs.borderTopColor],
      ['Right', b.x + b.w - (parseFloat(cs.borderRightWidth) || 0), b.y, parseFloat(cs.borderRightWidth) || 0, b.h, cs.borderRightStyle, cs.borderRightColor],
      ['Bottom', b.x, b.y + b.h - (parseFloat(cs.borderBottomWidth) || 0), b.w, parseFloat(cs.borderBottomWidth) || 0, cs.borderBottomStyle, cs.borderBottomColor],
      ['Left', b.x, b.y, parseFloat(cs.borderLeftWidth) || 0, b.h, cs.borderLeftStyle, cs.borderLeftColor],
    ];
    for (const [, x, y, w, h, style, color] of sides) {
      if (!w || !h || !style || style === 'none') continue;
      const c = rgba(color);
      if (!c) continue;
      nodes.push({ k: 'rect', x: round(x), y: round(y), w: round(w), h: round(h), fill: c, dash: /dashed|dotted/.test(style) });
    }
  };

  /* --------------------------------------------------------------- elements */
  const all = document.body.querySelectorAll('*');
  for (const el of all) {
    if (SKIP.has(el.tagName)) continue;
    const cls = (el.className && el.className.toString()) || '';
    if (SKIP_CLASS.some((c) => cls.split(/\s+/).includes(c))) continue;
    if (el.closest('.site-overlay') || el.closest('.menu-scrim')) continue;
    const cs = getComputedStyle(el);
    if (!isVisible(el, cs)) continue;
    if (inClosedDetails(el)) continue;
    if (cs.clip === 'rect(0px, 0px, 0px, 0px)') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 0.5 || r.height < 0.5) continue;
    if (r.bottom + scrollY < 0) continue;
    // visually-hidden helpers (skip links, sr-only labels) clip their own box
    if (el.classList.contains('sr-only') || el.classList.contains('visually-hidden')) continue;
    const b = box(r);
    const startIndex = nodes.length;

    // --- SVG marks: keep them vectors
    if (el.tagName.toLowerCase() === 'svg') {
      const svg = el.cloneNode(true);
      const off = [el, ...el.querySelectorAll('*')];
      const cln = [svg, ...svg.querySelectorAll('*')];
      // the page styles icons from CSS; Figma gets no stylesheet, so inline them
      off.forEach((o, i) => {
        const c = cln[i];
        if (!c) return;
        const s = getComputedStyle(o);
        const paint = (v) => {
          if (!v) return null;
          const key = v.trim();
          if (key === 'none') return 'none';
          return colorOf(key, true)
            ? 'rgb(' + [colorOf(key, true).r, colorOf(key, true).g, colorOf(key, true).b].map(Math.round).join(',') + ')'
            : key === 'currentColor' ? s.color : key;
        };
        const f = paint(s.fill);
        const st = paint(s.stroke);
        if (f) c.setAttribute('fill', f);
        if (st) c.setAttribute('stroke', st);
        const sw = parseFloat(s.strokeWidth);
        if (isFinite(sw) && sw > 0) c.setAttribute('stroke-width', sw);
        if (s.strokeLinecap && s.strokeLinecap !== 'butt') c.setAttribute('stroke-linecap', s.strokeLinecap);
        if (s.strokeLinejoin) c.setAttribute('stroke-linejoin', s.strokeLinejoin);
        const op = parseFloat(s.opacity);
        if (isFinite(op) && op < 1) c.setAttribute('opacity', op);
      });
      nodes.push({ k: 'svg', ...b, markup: svg.outerHTML, z: layerOf(el) });
      continue;
    }

    // --- video → the still that stands in for it
    if (el.tagName.toLowerCase() === 'video') {
      nodes.push({ k: 'image', ...b, src: opts.heroStill || '', fit: 'cover', radius: 0, name: 'Hero still', z: layerOf(el) });
      continue;
    }

    const bg = rgba(cs.backgroundColor);
    const radius = parseFloat(cs.borderTopLeftRadius) || 0;
    const bi = cs.backgroundImage;

    // CSS paints background-color below background-image: solid first, gradients over it
    if (bg) nodes.push({ k: 'rect', ...b, fill: bg, radius });

    if (bi && bi !== 'none' && /gradient/.test(bi)) {
      const layers = splitLayers(bi);
      for (const layer of layers) {
        const g = parseGradient(layer);
        if (g) nodes.push({ k: 'grad', ...b, radius, ...g });
      }
    }

    if (el.tagName === 'IMG') {
      const url = el.currentSrc || el.src || '';
      nodes.push({
        k: 'image',
        ...b,
        src: url,
        fit: cs.objectFit || 'fill',
        radius,
        name: el.alt || 'image',
      });
    }

    emitBorders(cs, b);

    // --- pseudo-element paint (decorative blobs, scrims, rules)
    for (const pe of ['::before', '::after']) {
      const ps = getComputedStyle(el, pe);
      if (!ps) continue;
      if (ps.content === 'none' || ps.content === 'normal') continue;
      if (ps.display === 'none' || ps.visibility === 'hidden') continue;
      const pbg = rgba(ps.backgroundColor);
      const pbi = ps.backgroundImage;
      const pr = parseFloat(ps.borderTopLeftRadius) || 0;
      let pb = b;
      const pw = parseFloat(ps.width);
      const ph = parseFloat(ps.height);
      if (ps.position === 'absolute') {
        // offset relative to the element box using inset values when present
        pb = { ...b, w: isFinite(pw) ? pw : b.w, h: isFinite(ph) ? ph : b.h };
        const top = parseFloat(ps.top);
        const left = parseFloat(ps.left);
        if (isFinite(top)) pb.y = round(b.y + top);
        if (isFinite(left)) pb.x = round(b.x + left);
      }
      if (pbi && pbi !== 'none' && /gradient/.test(pbi)) {
        for (const layer of splitLayers(pbi)) {
          const g = parseGradient(layer);
          if (g) nodes.push({ k: 'grad', ...pb, radius: pr, ...g });
        }
      }
      if (pbg) nodes.push({ k: 'rect', ...pb, fill: pbg, radius: pr });
    }

    for (let i = startIndex; i < nodes.length; i++) nodes[i].z = layerOf(el);
  }

  /* ------------------------------------------------------------------ text */
  const styleOf = (el) => {
    const cs = getComputedStyle(el);
    const fam = (cs.fontFamily || '').toLowerCase();
    const family = fam.includes('instrument serif')
      ? 'Instrument Serif'
      : fam.includes('fragment mono') || fam.includes('mono')
        ? 'Fragment Mono'
        : 'Instrument Sans';
    const italic = cs.fontStyle === 'italic' || cs.fontStyle.startsWith('oblique');
    const weight = parseInt(cs.fontWeight, 10) || 400;
    let style = 'Regular';
    if (family === 'Instrument Serif') style = italic ? 'Italic' : 'Regular';
    else if (family === 'Fragment Mono') style = 'Regular';
    else style = weight >= 700 ? 'Bold' : weight >= 600 ? 'SemiBold' : weight >= 500 ? 'Medium' : 'Regular';
    return {
      family,
      style,
      fs: parseFloat(cs.fontSize),
      lh: cs.lineHeight === 'normal' ? Math.round(parseFloat(cs.fontSize) * 1.2) : parseFloat(cs.lineHeight),
      ls: cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing),
      color: rgba(cs.color) || { r: 0, g: 0, b: 0, a: 1 },
      up: cs.textTransform === 'uppercase',
      underline: /underline/.test(cs.textDecorationLine || ''),
      align: cs.textAlign,
    };
  };

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      const p = node.parentElement;
      if (!p || SKIP.has(p.tagName)) return NodeFilter.FILTER_REJECT;
      if (p.closest('.site-overlay') || p.closest('.menu-scrim')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const collapse = (s) => s.replace(/\s+/g, ' ').trim();
  let tn;
  while ((tn = walker.nextNode())) {
    const parent = tn.parentElement;
    const pcs = getComputedStyle(parent);
    if (!isVisible(parent, pcs)) continue;
    if (pcs.clip === 'rect(0px, 0px, 0px, 0px)') continue;
    if (parseFloat(pcs.width) <= 1 || parseFloat(pcs.height) <= 1) continue;
    if (inClosedDetails(parent)) continue;
    const raw = tn.textContent;
    const style = styleOf(parent);
    const range = document.createRange();
    range.selectNodeContents(tn);
    const rects = [...range.getClientRects()].filter((x) => x.width > 0.5 && x.height > 0.5);
    if (!rects.length) continue;

    if (rects.length === 1) {
      const t = collapse(raw);
      if (!t) continue;
      if (rects[0].top + scrollY + rects[0].height <= 0) continue;
      nodes.push({ k: 'text', ...box(rects[0]), t, ...style, z: layerOf(parent) });
      continue;
    }

    const lines = [];
    let current = null;
    for (let i = 0; i < raw.length; i++) {
      const cr = document.createRange();
      if (i >= raw.length) break;
      cr.setStart(tn, i);
      cr.setEnd(tn, Math.min(i + 1, raw.length));
      const bb = cr.getBoundingClientRect();
      if (bb.width === 0 && bb.height === 0) continue;
      const key = Math.round(bb.top);
      if (!current || current.key !== key) {
        current = { key, top: bb.top, left: bb.left, right: bb.right, chars: [] };
        lines.push(current);
      }
      current.chars.push(raw[i]);
      current.left = Math.min(current.left, bb.left);
      current.right = Math.max(current.right, bb.right);
    }
    for (const ln of lines) {
      const t = collapse(ln.chars.join(''));
      if (!t) continue;
      if (ln.top + scrollY + style.lh <= 0) continue;
      nodes.push({
        k: 'text',
        x: round(ln.left),
        y: round(ln.top + scrollY),
        w: round(ln.right - ln.left),
        h: round(style.lh || style.fs * 1.2),
        t,
        ...style,
        z: layerOf(parent),
      });
    }
  }

  // boxes first, then text — so type always reads over its surface; within each
  // pass, fixed/sticky chrome paints last (the header sits over the hero plate)
  const boxes = nodes.filter((n) => n.k !== 'text').sort((a, b) => (a.z || 0) - (b.z || 0));
  const texts = nodes.filter((n) => n.k === 'text').sort((a, b) => (a.z || 0) - (b.z || 0));
  return { w: W, h: Math.ceil(H), nodes: boxes.concat(texts) };
};
