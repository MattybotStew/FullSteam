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

const SPEC = {"n":"Vertical Software","w":1440,"c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"FULLSTEAM","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","ls":0.4,"nm":"Logo"},{"k":"text","t":"Explore vertical solutions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"nav-right"}],"g":12,"nm":"nav"}],"d":"row","nm":"Nav","al":"center","jc":"space-between"}],"p":[12,24,12,24],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Header","mh":84},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Intent: lead with industry-specific, mission-critical software.","fs":56,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.05,"ls":-1.5,"mw":760,"nm":"H1"},{"k":"anno","t":"Software first. Each of the 11 verticals is the system of record its industry runs on — mission-critical, unlike a general horizontal provider. The panel holds, in order: what makes Fullsteam unique here, a photo, surprising stats, business-unit logos, customer and partner logos (their own row), and product screenshots. AI and payments are not the lead. Primary lens: investors; founders secondary. Not child pages; deep link is the hash (e.g. #retail).","lc":"#000000"},{"k":"pill","t":"Read the story","fs":16,"pad":[14,28,14,28]}],"g":12,"nm":"v-hero-card"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,48,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: v-hero"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Verticals","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"frame","c":[{"k":"text","t":"Hospitality","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Weddings & Events","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Wine","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Retail","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Storage & Marina","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Health & Wellness","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Field Services","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Transportation","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Automotive","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"Association Management","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"frame","c":[{"k":"text","t":"ERP","fs":15,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Vertical"}],"p":[12,0,12,0],"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Sidebar item"},{"k":"anno","t":"Intent: the sidebar is the list; selecting one swaps the story inline. No modal. Every vertical uses the same content categories so a thin story and a flagship story share one shape. Generic names and stats until publishability is confirmed. No named case studies.","lc":"#000000"}],"g":0,"nm":"Sidebar","w":"fixed","fw":260},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Intent: say what makes {{V}} software mission-critical.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"Placeholder. What makes Fullsteam special and unique in {{V}} — critical to how this industry runs, unlike a general horizontal provider.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Second paragraph — placeholder. Software is the system of record. AI and payments are what we add later, not the lead.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Surprising stats","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Stat A figure specific to this vertical. Placeholder. Not revenue or profitability.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Stat A second figure. Placeholder.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Stat A third figure. Placeholder.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Constraint Generic until the client confirms what can be published.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"},{"k":"text","t":"Business-unit logos","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"BU logo [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"mark"},{"k":"text","t":"BU logo [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"mark"},{"k":"text","t":"BU logo [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"mark"},{"k":"text","t":"BU logo [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"mark"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Logo row"},{"k":"text","t":"Customer and partner logos","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"anno","t":"Their own band, separate from the business-unit logos above, with enough room to read on their own. Generic until publishability is confirmed.","lc":"#000000"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Customer logo [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"mark"},{"k":"text","t":"Customer logo [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"mark"},{"k":"text","t":"Partner logo [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"mark"},{"k":"text","t":"Partner logo [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"mark"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Logo row"},{"k":"text","t":"Product screenshots","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"ph","mh":180,"nm":"Image placeholder"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Screenshot row"}],"g":16,"nm":"Template"},{"k":"frame","c":[],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":16,"nm":"Content"}],"d":"row","g":40,"nm":"Vertical layout","al":"start"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Operational advantages","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Sales and Marketing","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"text","t":"The business keeps its name, its customers, and its own team. What Fullsteam adds is reach — people who already know the industry, and campaigns written for one niche audience instead of a general one.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Sales A go-to-market team that knows the buyers, the season, and how this industry buys. [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Marketing Content and campaigns written for one niche: real customer stories and concrete local examples. [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Cross-sell Payments, lending, and insurance go to customers the software already serves. [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"d":"row","g":16,"nm":"Row"}],"g":16,"nm":"Cards"},{"k":"anno","t":"An overview, not a service menu. Nothing here may be read as a claim about growth rate, revenue, or profitability of a business we own.","lc":"#000000"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Operational advantages","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Talent","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"text","t":"The team that built the software stays, and gains a much larger company behind it. Hiring, back office, and career paths come from Fullsteam; the vertical keeps its own identity.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Hiring When the team needs to grow, it hires from a much larger pipeline. [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Mobility People can move between the software businesses Fullsteam owns without leaving the company. [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Support Finance, legal, HR, and compliance handled at group level, so the business can stay focused on its vertical. [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"figcaption"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"d":"row","g":16,"nm":"Row"}],"g":16,"nm":"Cards"},{"k":"text","t":"See open roles","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"anno","t":"Never frame the story as headcount reduction, and never imply the acquired team is being absorbed or cut.","lc":"#000000"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block tan"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"FAQ","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: answer common questions about our vertical software approach.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Do you buy software or add services?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"We buy industry-specific software companies — systems of record. Payments, lending, and other capabilities come after the close as growth drivers.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Do you change the brand or team?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"Brands stay standalone. The team stays. Fullsteam provides group support so the business can scale what it built.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Is AI part of this strategy?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"Yes, but use cases come first. We focus on practical AI that helps the software do more for its industry — never framed as staff reduction.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"}],"nm":"FAQ"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"}],"nm":"Main"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Company","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Our Story","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Leadership","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Careers","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Open roles","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Explore","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Vertical Software","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Our Advantage","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"AI at Fullsteam","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Acquisitions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Connect","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Contact","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Partner inquiries","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Legal","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Privacy","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Terms","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Complaints","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"}],"d":"row","g":48,"nm":"Footer row","jc":"space-between"}],"p":[40,160,56,160],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Footer"}]};
const OPTS = {"pageId": "3:55487"};
return await buildPage(SPEC, OPTS);
