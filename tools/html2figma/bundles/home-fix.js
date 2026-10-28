/* Figma-side builder for the html2figma wireframe converter.
 *
 * Paste this file's contents into figma_execute, followed by:
 *   const SPEC = <json>;
 *   return await buildPage(SPEC, { pageId: '3:55487', x: 0, y: 0 });
 */

const COLOR = (hex) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
};

const SOLID = (hex) => ({ type: 'SOLID', color: COLOR(hex) });

let FONT_SANS = { family: 'Archivo', style: 'Regular' };
let FONT_SANS_BOLD = { family: 'Archivo', style: 'Bold' };
let FONT_DISPLAY = { family: 'Archivo', style: 'Bold' };
let FONT_MONO = { family: 'Menlo', style: 'Regular' };
const loaded = new Set();

async function ensureFont(font) {
  const key = font.family + '/' + font.style;
  if (loaded.has(key)) return font;
  try {
    await figma.loadFontAsync(font);
    loaded.add(key);
    return font;
  } catch (e) {
    const fallback = font.family === 'Menlo'
      ? { family: 'Roboto Mono', style: 'Regular' }
      : { family: 'Inter', style: font.style === 'Bold' ? 'Bold' : 'Regular' };
    try {
      await figma.loadFontAsync(fallback);
      loaded.add(fallback.family + '/' + fallback.style);
      return fallback;
    } catch (e2) {
      return { family: 'Inter', style: 'Regular' };
    }
  }
}

function applyFill(node, hex) {
  if (!hex) { node.fills = []; return; }
  node.fills = [SOLID(hex)];
}

function setDashes(node, pattern) {
  // `strokeDashes` is read-only in some Figma builds; `dashPattern` is the setter.
  try { node.dashPattern = pattern; return true; } catch (e) { /* fall through */ }
  try { node.strokeDashes = pattern; return true; } catch (e) { return false; }
}

function applyStroke(node, bd) {
  if (!bd) { node.strokes = []; return; }
  node.strokes = [SOLID(bd.c)];
  node.strokeWeight = bd.w || 1;
  node.strokeAlign = 'INSIDE';
  if (bd.dash) setDashes(node, [6, 4]);
  const s = bd.s || 'all';
  if (s === 'bottom') {
    // Figma auto-layout frames have no per-side strokes; buildDivider() adds a 1px rule.
    node.strokes = [];
  }
}

/** Per-side border as a real 1px line child (Figma has no per-side strokes). */
function buildDivider(parent, side, color, weight) {
  const w = weight || 1;
  const r = figma.createRectangle();
  r.name = 'Rule';
  r.fills = [SOLID(color || '#000000')];
  r.resize(200, w);
  parent.appendChild(r);
  try { r.layoutSizingVertical = 'FIXED'; } catch (e) { /* ignore */ }
  try { r.layoutSizingHorizontal = 'FILL'; } catch (e) { r.resize(parent.width || 1000, w); }
  if (side === 'top') parent.insertChild(0, r);
  return r;
}

/** Frames built at a fixed width are tagged so the fill pass leaves them alone. */
function markFixed(node) {
  try { node.setPluginData('h2f_fixed', '1'); } catch (e) { /* ignore */ }
}
function isFixed(node) {
  try { return node.getPluginData('h2f_fixed') === '1'; } catch (e) { return false; }
}

/**
 * Sections were hugging their 1120px content column instead of spanning the
 * 1440px page, so tan bands stopped short. Everything inside a vertical
 * auto-layout frame fills, except frames explicitly built at a fixed width
 * (the .wrap column), which get centred instead.
 */
function fillColumns(node) {
  if (!node.children || !('layoutMode' in node)) return;
  const isCol = node.layoutMode === 'VERTICAL';
  for (const c of node.children) {
    if (isCol) {
      if (c.type === 'TEXT' || c.type === 'RECTANGLE' || c.type === 'FRAME') {
        if (!isFixed(c)) {
          try { c.layoutSizingHorizontal = 'FILL'; } catch (e) { /* ignore */ }
        }
      }
    }
    fillColumns(c);
  }
  if (isCol) {
    const fixedKids = node.children.filter(isFixed);
    if (fixedKids.length) {
      try { node.counterAxisAlignItems = 'CENTER'; } catch (e) { /* ignore */ }
    }
  }
}

async function makeText(spec, colorOverride) {
  const t = figma.createText();
  const bold = spec.fw === 'Bold';
  let font;
  if (spec.ff === 'mono') font = await ensureFont(FONT_MONO);
  else if (spec.fd) font = await ensureFont(FONT_DISPLAY);
  else font = await ensureFont(bold ? FONT_SANS_BOLD : FONT_SANS);
  if (bold && font.style !== 'Bold') {
    try { font = await ensureFont({ family: font.family, style: 'Bold' }); } catch (e) { /* keep */ }
  }
  t.fontName = font;
  t.characters = spec.up ? (spec.t || '').toUpperCase() : (spec.t || '');
  t.fontSize = spec.fs || 16;
  t.fills = [SOLID(colorOverride || spec.lc || '#000000')];
  if (spec.lh) t.lineHeight = { value: Math.round((spec.lh || 1) * (spec.fs || 16)), unit: 'PIXELS' };
  if (spec.ls) t.letterSpacing = { value: spec.ls, unit: 'PIXELS' };
  if (spec.it && font.style === 'Regular') t.fontName = await ensureFont({ family: font.family, style: 'Italic' });
  t.textAutoResize = 'HEIGHT';
  if (spec.nm) t.name = spec.nm;
  return t;
}

async function buildNode(spec, ctx) {
  const { parent, dark } = ctx;

  if (spec.k === 'text') {
    const t = await makeText(spec);
    parent.appendChild(t);
    try { t.layoutSizingHorizontal = 'FILL'; } catch (e) { /* fixed parent */ }
    return t;
  }

  if (spec.k === 'anno') {
    const f = figma.createFrame();
    f.name = 'Annotation';
    f.layoutMode = 'VERTICAL';
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
    f.paddingTop = 10; f.paddingBottom = 10;
    f.paddingLeft = 12; f.paddingRight = 12;
    f.fills = [];
    f.strokes = [SOLID(dark ? '#FFFFFF' : '#000000')];
    f.strokeWeight = 1;
    setDashes(f, [6, 4]);
    f.strokeAlign = 'INSIDE';
    parent.appendChild(f);
    const t = await makeText({ k: 'text', t: spec.t, fs: 12, fw: 'Regular', ff: 'mono', lc: dark ? '#FFFFFF' : '#000000' });
    f.appendChild(t);
    t.layoutSizingHorizontal = 'FILL';
    return f;
  }

  if (spec.k === 'pill') {
    const f = figma.createFrame();
    f.name = 'Button';
    f.layoutMode = 'HORIZONTAL';
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
    const [pt, pr, pb, pl] = spec.pad;
    f.paddingTop = pt; f.paddingRight = pr; f.paddingBottom = pb; f.paddingLeft = pl;
    f.fills = [SOLID('#FFC600')];
    parent.appendChild(f);
    const t = await makeText({ k: 'text', t: spec.t, fs: spec.fs, fw: 'Bold' });
    f.appendChild(t);
    return f;
  }

  if (spec.k === 'ph') {
    const f = figma.createFrame();
    f.name = spec.nm || 'Image placeholder';
    f.layoutMode = 'VERTICAL';
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'FIXED';
    f.fills = [SOLID('#4A4A4A')];
    f.paddingTop = 24; f.paddingBottom = 24;
    f.primaryAxisAlignItems = 'CENTER';
    f.counterAxisAlignItems = 'CENTER';
    parent.appendChild(f);
    try { f.layoutSizingHorizontal = 'FILL'; } catch (e) { /* fixed */ }
    const t = await makeText({ k: 'text', t: 'IMAGE', fs: 10, fw: 'Regular', ff: 'mono', lc: '#C8C8C8' });
    f.appendChild(t);
    try { t.layoutSizingHorizontal = 'INHERIT'; } catch (e) { /* keep */ }
    f.minHeight = spec.mh || 160;
    return f;
  }

  // frame
  const f = figma.createFrame();
  f.name = spec.nm || 'Frame';
  f.layoutMode = spec.d === 'row' ? 'HORIZONTAL' : 'VERTICAL';
  f.primaryAxisSizingMode = 'AUTO';
  f.counterAxisSizingMode = 'AUTO';
  f.itemSpacing = spec.g || 0;
  const p = spec.p || [0, 0, 0, 0];
  f.paddingTop = p[0]; f.paddingRight = p[1]; f.paddingBottom = p[2]; f.paddingLeft = p[3];
  f.fills = spec.bg ? [SOLID(spec.bg)] : [];
  if (spec.bd) applyStroke(f, spec.bd);
  if (spec.al === 'center') f.counterAxisAlignItems = 'CENTER';
  if (spec.al === 'start') f.counterAxisAlignItems = 'MIN';
  if (spec.jc === 'space-between') f.primaryAxisAlignItems = 'SPACE_BETWEEN';
  if (spec.mh) f.minHeight = spec.mh;
  if (spec.w === 'fixed' && spec.fw) {
    f.counterAxisSizingMode = 'FIXED';
    f.resize(spec.fw, f.height);
    markFixed(f);
  }
  // clipContents so nothing bleeds
  f.clipsContent = false;
  parent.appendChild(f);

  const kids = spec.c || [];
  if (!kids.length) {
    f.minHeight = 80;
    f.fills = [SOLID('#FAFAFA')];
    f.strokes = [SOLID('#C8C8C8')];
    f.strokeWeight = 1;
    setDashes(f, [4, 4]);
    f.strokeAlign = 'INSIDE';
    f.primaryAxisAlignItems = 'CENTER';
    f.counterAxisAlignItems = 'CENTER';
    const t = await makeText({ k: 'text', t: '(empty)', fs: 10, fw: 'Regular', ff: 'mono', lc: '#9A9A9A' });
    f.appendChild(t);
    return f;
  }

  for (const kid of kids) {
    await buildNode(kid, { parent: f, dark: dark || spec.bg === '#111111' });
  }

  // sizing: rows distribute, columns fill
  if (spec.d === 'row') {
    const fillable = f.children.filter((c) => c.type === 'FRAME' || c.type === 'TEXT');
    for (const c of fillable) {
      try { c.layoutSizingHorizontal = 'FILL'; } catch (e) { /* fixed width children stay */ }
    }
  }

  // per-side borders become a real rule, since Figma has no per-side strokes
  if (spec.bd && (spec.bd.s === 'bottom' || spec.bd.s === 'top')) {
    buildDivider(f, spec.bd.s, spec.bd.c, spec.bd.w);
  }
  return f;
}

async function buildPage(spec, opts) {
  const page = await figma.getNodeByIdAsync(opts.pageId || figma.currentPage.id);
  let x = opts.x, y = opts.y;
  if (x === undefined || x === null) {
    x = 0;
    for (const c of page.children) x = Math.max(x, c.x + c.width + 400);
    y = 0;
  }

  const root = figma.createFrame();
  root.name = spec.n + ' — Wireframe';
  root.layoutMode = 'VERTICAL';
  root.primaryAxisSizingMode = 'AUTO';
  root.counterAxisSizingMode = 'FIXED';
  root.resize(spec.w || 1440, root.height);
  root.fills = [SOLID('#FFFFFF')];
  root.clipsContent = true;
  page.appendChild(root);
  root.x = x;
  root.y = y;

  for (const block of spec.c || []) {
    await buildNode(block, { parent: root, dark: false });
  }
  // everything at the top level of the page fills the 1440 column
  for (const c of root.children) {
    try { c.layoutSizingHorizontal = 'FILL'; } catch (e) { /* fixed */ }
  }
  // sections inside <main> were hugging their 1120 column; stretch them
  fillColumns(root);
  return { id: root.id, name: root.name, w: root.width, h: root.height, x: root.x, y: root.y };
}

const SPEC = {"n":"Homepage","w":1440,"c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"FULLSTEAM","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","ls":0.4,"nm":"Logo"},{"k":"text","t":"Explore vertical solutions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"nav-right"}],"g":12,"nm":"nav"}],"d":"row","nm":"Nav","al":"center","jc":"space-between"}],"p":[12,24,12,24],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Header","mh":84},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Any industry, we own the software.","fs":56,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.05,"ls":-1.5,"mw":760,"nm":"H1"},{"k":"anno","t":"Axis A endpoint. \"Any industry, we own the software.\" is the locked line. One identity/scale visual — the vertical filmstrip below — not 11 floating tiles. This page captures the end state: no pinning, no grow morph.","lc":"#000000"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120},{"k":"frame","c":[{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Hospitality","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Weddings & Events","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Wine","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Retail","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Storage & Marina","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Health & Wellness","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Field Services","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Transportation","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Automotive","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Association Mgmt","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"ERP","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"g":8,"nm":"Figure"}],"g":12,"nm":"filmstrip"}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: axis-a"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Then we build what makes it grow.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"anno","t":"Axis B endpoint. The growth model — never merged with the Axis A claim. Reached by scroll; the grow morph itself is not drawn in this wireframe.","lc":"#000000"},{"k":"pill","t":"Explore vertical solutions","fs":16,"pad":[14,28,14,28]}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: axis-b"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"At a glance","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Fullsteam at a glance","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"70,000 +","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"scale__num"},{"k":"text","t":"customers run our software every day","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"scale__cap"}],"g":8,"nm":"Item"},{"k":"frame","c":[{"k":"text","t":"11","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"scale__num"},{"k":"text","t":"verticals, each a system of record","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"scale__cap"}],"g":8,"nm":"Item"},{"k":"frame","c":[{"k":"text","t":"$75B +","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"scale__num"},{"k":"text","t":"processed on Fullsteam Pay","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"scale__cap"}],"g":8,"nm":"Item"},{"k":"frame","c":[{"k":"text","t":"2,000 +","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"scale__num"},{"k":"text","t":"people across the portfolio","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"scale__cap"}],"g":8,"nm":"Item"}],"g":8,"nm":"UL"},{"k":"text","t":"Every one of these numbers is a business with a name, a team, and customers who depend on it. That's what we're protecting.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"anno","t":"Inferable KPIs only — no revenue, run-rate, or profitability. Figures are pending publishability sign-off.","lc":"#000000"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Keep the businesses growing.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"anno","t":"Five revenue-ordered verticals, expandable. First row is drawn open to show the end state of an expanded panel. All eleven live on the Vertical Software page.","lc":"#000000"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Vertical ERP","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"What it runs","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"[placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"enterprise resource planning — the system of record","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Learn more","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"vrow__link"}],"g":12,"nm":"div"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"}],"g":12,"nm":"vrow__media"}],"g":12,"nm":"vrow__grid"}],"g":12,"nm":"vrow__panel"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Vertical Wine","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"What it runs","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"[placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"bottles of wine shipped","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Learn more","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"vrow__link"}],"g":12,"nm":"div"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"}],"g":12,"nm":"vrow__media"}],"g":12,"nm":"vrow__grid"}],"g":12,"nm":"vrow__panel"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Vertical Transportation","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"What it runs","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"[placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"black-car rides completed","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Learn more","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"vrow__link"}],"g":12,"nm":"div"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"}],"g":12,"nm":"vrow__media"}],"g":12,"nm":"vrow__grid"}],"g":12,"nm":"vrow__panel"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Vertical Hospitality","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"What it runs","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"[placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"covers served","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Learn more","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"vrow__link"}],"g":12,"nm":"div"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"}],"g":12,"nm":"vrow__media"}],"g":12,"nm":"vrow__grid"}],"g":12,"nm":"vrow__panel"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Vertical Automotive","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"What it runs","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"[placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"oil changes booked","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Learn more","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"vrow__link"}],"g":12,"nm":"div"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"}],"g":12,"nm":"vrow__media"}],"g":12,"nm":"vrow__grid"}],"g":12,"nm":"vrow__panel"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"}],"g":12,"nm":"vrows"},{"k":"frame","c":[{"k":"pill","t":"Explore all verticals →","fs":13,"pad":[9,18,9,18]},{"k":"text","t":"Growth needs more than ownership — it needs intelligence.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"verts__foot"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block tan"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"AI that already knows the business.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"text","t":"Use cases first — built on proprietary vertical data, not generic models.","fs":18,"fw":"Regular","ff":"sans","lc":"#000000","mw":560,"nm":"Lede"},{"k":"text","t":"See AI at Fullsteam","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"01","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"b"},{"k":"text","t":"Modernize in place","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Smarter search, forecasting, and workflows inside the product customers already run.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"02","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"b"},{"k":"text","t":"Customer-facing features","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Ship AI your end customers feel — grounded in vertical data.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"03","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"b"},{"k":"text","t":"Automate busywork","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Back-office workflows that run themselves — people stay on judgment calls.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":12,"nm":"ucases"},{"k":"anno","t":"Never a headcount story. AI is framed as capability, not replacement.","lc":"#000000"},{"k":"text","t":"Intelligence is people.","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"ph","mh":180,"nm":"Image placeholder"}],"g":12,"nm":"ai-strip"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#111111","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block dark"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"\"We stopped asking what to build next and started asking where everything we had built could go.\" Placeholder — founder voice, genericized, unpublishable as written","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"frame","c":[{"k":"text","t":"For founders","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"A home for the business you built.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"We don't buy your business and shelve it. The product keeps its name, the team keeps its people, and it keeps growing — with a much larger company behind it.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"text","t":"Explore Acquisitions","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"anno","t":"Never frame the sale as an exit. No named case studies until publishability is confirmed.","lc":"#000000"}],"g":12,"nm":"div"}],"g":12,"nm":"founders"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"A great place to work.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"Real people building software for real industries — mostly remote, small teams, room to grow.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"text","t":"See Careers","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"anno","t":"Mostly remote · Small teams","lc":"#000000"}],"g":12,"nm":"div"},{"k":"ph","mh":180,"nm":"Image placeholder"}],"g":12,"nm":"careers-grid"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"01","fs":12,"fw":"Bold","ff":"mono","lc":"#000000","nm":"Number"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Trusted to learn the vertical","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Solve problems for an industry you can actually learn — not a generic queue.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"g":6,"nm":"Body"}],"d":"row","p":[16,0,0,0],"g":14,"bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Step"},{"k":"frame","c":[{"k":"text","t":"02","fs":12,"fw":"Bold","ff":"mono","lc":"#000000","nm":"Number"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Small teams, clear goals","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Talk to customers and ship — ownership without chaos.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"g":6,"nm":"Body"}],"d":"row","p":[16,0,0,0],"g":14,"bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Step"},{"k":"frame","c":[{"k":"text","t":"03","fs":12,"fw":"Bold","ff":"mono","lc":"#000000","nm":"Number"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Mostly remote, real people","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Distributed work with room to grow without losing the human side.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"g":6,"nm":"Body"}],"d":"row","p":[16,0,0,0],"g":14,"bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Step"}],"g":16,"nm":"Points"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block tan"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"From the company page","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Straight from the Fullsteam page on LinkedIn","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"Hiring, people, and product news.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"in Fullsteam · Oct 2026 · Public","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Supporting our customers starts with our people and the expertise they bring. We're hiring a Senior Information Security & Compliance Business Partner.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"See the post on LinkedIn →","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"post__link"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"in Fullsteam · Oct 2026 · Public","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Career growth can take many forms. For Xavier Codrington, it has meant taking on new challenges and growing into a leadership role.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"See the post on LinkedIn →","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"post__link"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"in Fullsteam · Jul 2026 · Public","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"We're proud to celebrate our Vice President and CISO, Emily Traylor, on receiving Auburn's prestigious award.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"See the post on LinkedIn →","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"post__link"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"d":"row","g":16,"nm":"Row"}],"g":16,"nm":"Posts"},{"k":"text","t":"Follow on LinkedIn","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"anno","t":"Static cards, not a live embed. No sliders or animation in the wireframe.","lc":"#000000"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Ready to see where your business can go next?","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"text","t":"70,000+ customers · 11 vertical businesses · 2,000+ people","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Portfolio","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Explore the portfolio →","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Eleven vertical software businesses, each a category leader in its market.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Explore vertical solutions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"For founders","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"A home for your business →","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Values fit, certainty of close, and a bigger org that scales the founder.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Explore Acquisitions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":12,"nm":"close__cards"},{"k":"text","t":"Any industry. One home.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"}],"nm":"Main"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Company","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Our Story","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Leadership","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Careers","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Open roles","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Explore","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Vertical Software","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Our Advantage","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"AI at Fullsteam","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Acquisitions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Connect","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Contact","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Partner inquiries","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Legal","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Privacy","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Terms","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Complaints","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"}],"d":"row","g":48,"nm":"Footer row","jc":"space-between"}],"p":[40,160,56,160],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Footer"}]};
const OPTS = {"pageId": "3:55487"};
return await buildPage(SPEC, OPTS);
