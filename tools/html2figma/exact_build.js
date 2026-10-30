/* Figma-side builder for the exact-geometry wireframe copy.
 *
 * Pairs with extract.js: the browser measures every box and text run, this
 * replays those coordinates as an absolutely positioned frame.
 *
 *   <this file>
 *   const SPEC = {...}; const OPTS = {...};
 *   return await exactBuild(SPEC, OPTS);
 */

const SOLID = (hex) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return { type: 'SOLID', color: { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 } };
};

const FONTS = {
  'display/Bold': { family: 'Archivo', style: 'Bold' },
  'sans/Regular': { family: 'Archivo', style: 'Regular' },
  'sans/Bold': { family: 'Archivo', style: 'Bold' },
  'mono/Regular': { family: 'Menlo', style: 'Regular' },
  'mono/Bold': { family: 'Menlo', style: 'Bold' },
};

const withTimeout = (p, ms, label) => Promise.race([
  p,
  new Promise((_, reject) => setTimeout(() => reject(new Error('timeout: ' + label)), ms)),
]);

/**
 * Resolve every font once, up front. Loading per text node made long runs stall
 * (a single unresolved loadFontAsync hangs the whole frame build).
 */
async function loadFonts() {
  const out = {};
  for (const [key, font] of Object.entries(FONTS)) {
    try {
      await withTimeout(figma.loadFontAsync(font), 4000, key);
      out[key] = font;
    } catch (e) {
      const fallback = key.startsWith('mono')
        ? { family: 'Roboto Mono', style: font.style }
        : { family: 'Inter', style: font.style };
      try {
        await withTimeout(figma.loadFontAsync(fallback), 4000, key + ' fallback');
        out[key] = fallback;
      } catch (e2) {
        out[key] = { family: 'Inter', style: 'Regular' };
      }
    }
  }
  return out;
}

let FONT_CACHE = null;
async function fontFor(kind, weight) {
  if (!FONT_CACHE) FONT_CACHE = await loadFonts();
  return FONT_CACHE[kind + '/' + weight] || FONT_CACHE['sans/Regular'];
}

async function exactBuild(spec, opts) {
  const page = await figma.getNodeByIdAsync(opts.pageId || figma.currentPage.id);
  const root = figma.createFrame();
  root.name = (opts.name || 'Page') + ' — Wireframe';
  root.resize(spec.w || 1440, spec.h || 1000);
  root.fills = [SOLID('#FFFFFF')];
  root.clipsContent = true;
  page.appendChild(root);
  if (opts.x !== undefined) root.x = opts.x;
  if (opts.y !== undefined) root.y = opts.y;

  for (const n of spec.nodes) {
    try {
      if (n.k === 'rect') {
        const r = figma.createRectangle();
        r.x = n.x; r.y = n.y;
        r.resize(Math.max(n.w, 0.5), Math.max(n.h, 0.5));
        r.fills = [SOLID(n.fill)];
        if (n.radius) r.cornerRadius = n.radius;
        if (n.dash) { try { r.dashPattern = [6, 4]; } catch (e) { /* ignore */ } }
        root.appendChild(r);
      } else if (n.k === 'text') {
        const t = figma.createText();
        root.appendChild(t);
        t.fontName = await fontFor(n.ff, n.fw);
        t.characters = n.up ? n.t.toUpperCase() : n.t;
        t.fontSize = n.fs;
        if (n.lh) t.lineHeight = { value: n.lh, unit: 'PIXELS' };
        if (n.ls) t.letterSpacing = { value: n.ls, unit: 'PIXELS' };
        t.fills = [SOLID(n.color)];
        // one text node per browser line box: never re-wrap, keep the exact origin
        t.textAutoResize = 'WIDTH_AND_HEIGHT';
        t.x = n.x;
        t.y = n.y;
      }
    } catch (e) {
      // one bad node must not abort the page
      continue;
    }
  }

  return { id: root.id, name: root.name, w: Math.round(root.width), h: Math.round(root.height), x: Math.round(root.x), y: Math.round(root.y), nodes: spec.nodes.length };
}
