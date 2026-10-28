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

const SPEC = {"n":"Our Advantage","w":1440,"c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"FULLSTEAM","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","ls":0.4,"nm":"Logo"},{"k":"text","t":"Explore vertical solutions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"nav-right"}],"g":12,"nm":"nav"}],"d":"row","nm":"Nav","al":"center","jc":"space-between"}],"p":[12,24,12,24],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Header","mh":84},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Our Advantage","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: show how Fullsteam grows the software it owns.","fs":56,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.05,"ls":-1.5,"mw":760,"nm":"H1"},{"k":"anno","t":"On-page name is Our Advantage (client request, 2026-10-22; replaces Embedded Offerings). The sitemap lock is not re-locked yet. The page has two parts: Offerings — a sticky sidebar over embedded fintech (Payments, Lending, Insurance) and AI at Fullsteam (its own panel — the nav item wayfinds here; no separate AI page), swapping inline — and Operational advantages — Sales & Marketing, Talent, and Vertical Expertise as full-width sections below the Offerings block, not sidebar tabs (client, 2026-10-22). Software first. Hardware folds into Payments. Deep link is the hash (e.g. #payments , #ai , #talent ). Primary lens: investors; founders secondary.","lc":"#000000"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,48,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: page-hero"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Intent: show why embedded payments are better.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"Payments should feel invisible — the value is how deeply they are embedded in the software each business already runs, compared with a processor bolted on beside it. One team owns it when something breaks.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"text","t":"Key stats — unreconciled","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Client-supplied $75B sales processed. Not a settled KPI.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Client-supplied Top 20 largest payment processor. Not in the earlier figure set.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Earlier figure $75B+ processed on Fullsteam Pay* (cumulative). Still a placeholder.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"},{"k":"anno","t":"2026-10-22 feedback offered “$75B sales processed” and “top 20 largest payment processor.” KB §22.5 records a different claim: $75B+ processed on Fullsteam Pay* (cumulative), with 70,000+ customers and 480M+ transactions. Those earlier figures are still publishability-gated (OI-5). “Sales processed” is not the same wording as “processed on Fullsteam Pay,” and “top 20” does not appear in §22.5. Do not treat the client lines as locked proof.","lc":"#000000"},{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"frame","c":[{"k":"text","t":"Intent: show the hardware in the same story.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Photo and text on the devices. Hardware stays inside Payments — not its own page.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"d":"row","g":32,"nm":"Split","al":"start"},{"k":"text","t":"Testimonial [placeholder]. Optional — include only if the client confirms a quote that can be published. Attribution [placeholder]","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"quote"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Intent: present lending as an embedded offering, not a product sheet.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"Capital that sits inside the software — an offering, not a product sheet. No rates, terms, or eligibility rules in this wireframe.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Capital Borrow against future transactions. Placeholder.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Pays back Structural label only. Detail unpublished.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Who it is for The software businesses already here.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Constraint No rates, terms, or eligibility claims.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Intent: show insurance embedded in the software.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"Coverage that sits inside the software the business already runs, not in a separate storefront.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"What it covers Coverage detail unpublished. Placeholder.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"How it sits Embedded, not a separate storefront.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Proof Generic until the client confirms a story.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Audience Both lenses — capability, not a product pitch.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Intent: show three AI use cases, then one video.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"Use cases first. Proprietary vertical data is the differentiator: the AI starts from the system of record, not a generic model. Never a story about reducing staff. The homepage AI band is a wayfinder; the video lives here.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"01","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: modernize existing software.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Example [placeholder]. One concrete use of AI inside software the business already runs.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"02","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: build new customer-facing features.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Example [placeholder]. A feature the customer sees, grounded in vertical data.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"03","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: automate business workflows.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Example [placeholder]. Work that gets faster. Never framed as staff reduction.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":12,"nm":"use-grid"},{"k":"text","t":"Video — brings the three use cases together","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"video-ph"},{"k":"anno","t":"One video for the whole AI story, not a video per use case. Asset not supplied yet.","lc":"#000000"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Marketing","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show marketing that reaches the right audience.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Content and campaigns written for one niche: real customer stories and concrete local examples. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Cross-sell","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show what the parent can sell into the base.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Payments, lending, and insurance go to customers the software already serves. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":12,"nm":"use-grid"},{"k":"frame","c":[{"k":"text","t":"Intent: show the people who do the work.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Real Fullsteam people, not stock photography. No asset supplied yet.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Reach One sales and marketing organization across every business Fullsteam owns.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Scale [placeholder] — “100+ businesses” is a publishability candidate, not a cleared figure (OI-5).","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Proof [placeholder] — no pipeline, conversion, or growth-rate figures are published.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Constraint Never imply the business needed a new sales team to keep running.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"}],"g":12,"nm":"hw"},{"k":"anno","t":"An overview, not a service menu — no CRM, no lead source, no campaign names, no tooling. Nothing here may be read as a claim about the growth rate, revenue, or profitability of a business we own (KB §20.4; publishability gate OI-5). Voice: plain, conversational, first person (KB §22.3) — no “roll-up,” no “recurring growth.”","lc":"#000000"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Mobility","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show a career that can move.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"People can move between the software businesses Fullsteam owns without leaving the company. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Support","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show the back office that comes with the parent.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Finance, legal, HR, and compliance handled at group level, so the business can stay focused on its vertical. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":12,"nm":"use-grid"},{"k":"frame","c":[{"k":"text","t":"Intent: show real people, not stock.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"A photograph of the team inside the business. No asset supplied yet — do not substitute stock photography.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Scale [placeholder] — “2,000+ colleagues” is a publishability candidate, not a cleared figure (OI-5).","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Culture “A big company that doesn’t operate like one” — mostly remote, small-team autonomy.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Proof [placeholder] — no attrition, hiring, or retention figures are published.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Constraint Never a story about replacing the team that came with the business.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"}],"g":12,"nm":"hw"},{"k":"text","t":"See open roles","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"anno","t":"Optional CTA to open roles (Workday, new tab) — the employee lens, secondary on this page. Never frame the story as headcount reduction, and never imply the acquired team is being absorbed or cut (KB §20.4). The founder promise — team, culture, and brand stay — is the point of this block; nothing in the copy may contradict it (KB §22.2). The employee lens must stay authentic rather than marketing-shaped (KB §20.4).","lc":"#000000"}],"g":12,"nm":"oe-content"}],"g":12,"nm":"oe-layout"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Operational advantages","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: show sales and marketing as an operational advantage.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"The business keeps its name, its customers, and its own team. What Fullsteam adds is reach — people who already know the industry, and campaigns written for one niche audience instead of a general one.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Sales","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show sales that already speaks the vertical.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"A go-to-market team that knows the buyers, the season, and how this industry buys. [placeholder] — which verticals are covered, and by how many people, is not confirmed.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Marketing","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show marketing that reaches the right audience.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Content and campaigns written for one niche: real customer stories and concrete local examples. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Cross-sell","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show what the parent can sell into the base.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Payments, lending, and insurance go to customers the software already serves. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":12,"nm":"use-grid"},{"k":"frame","c":[{"k":"text","t":"Intent: show the people who do the work.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Real Fullsteam people, not stock photography. No asset supplied yet.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Reach One sales and marketing organization across every business Fullsteam owns.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Scale [placeholder] — “100+ businesses” is a publishability candidate, not a cleared figure (OI-5).","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Proof [placeholder] — no pipeline, conversion, or growth-rate figures are published.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Constraint Never imply the business needed a new sales team to keep running.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"}],"g":12,"nm":"hw"},{"k":"anno","t":"An overview, not a service menu — no CRM, no lead source, no campaign names, no tooling. Nothing here may be read as a claim about the growth rate, revenue, or profitability of a business we own (KB §20.4; publishability gate OI-5). Voice: plain, conversational, first person (KB §22.3) — no “roll-up,” no “recurring growth.”","lc":"#000000"}],"g":12,"nm":"op-section"},{"k":"frame","c":[{"k":"text","t":"Operational advantages","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: show talent as an operational advantage.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"The team that built the software stays, and gains a much larger company behind it. Hiring, back office, and career paths come from Fullsteam; the vertical keeps its own identity.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Hiring","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show a deeper hiring bench.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"When the team needs to grow, it hires from a much larger pipeline. [placeholder] — no headcount, role, or location detail is confirmed.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Mobility","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show a career that can move.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"People can move between the software businesses Fullsteam owns without leaving the company. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Support","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show the back office that comes with the parent.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Finance, legal, HR, and compliance handled at group level, so the business can stay focused on its vertical. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":12,"nm":"use-grid"},{"k":"frame","c":[{"k":"text","t":"Intent: show real people, not stock.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"A photograph of the team inside the business. No asset supplied yet — do not substitute stock photography.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Scale [placeholder] — “2,000+ colleagues” is a publishability candidate, not a cleared figure (OI-5).","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Culture “A big company that doesn’t operate like one” — mostly remote, small-team autonomy.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Proof [placeholder] — no attrition, hiring, or retention figures are published.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Constraint Never a story about replacing the team that came with the business.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"}],"g":12,"nm":"hw"},{"k":"text","t":"See open roles","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"anno","t":"Optional CTA to open roles (Workday, new tab) — the employee lens, secondary on this page. Never frame the story as headcount reduction, and never imply the acquired team is being absorbed or cut (KB §20.4). The founder promise — team, culture, and brand stay — is the point of this block; nothing in the copy may contradict it (KB §22.2). The employee lens must stay authentic rather than marketing-shaped (KB §20.4).","lc":"#000000"}],"g":12,"nm":"op-section"},{"k":"frame","c":[{"k":"text","t":"Operational advantages","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: show vertical expertise as an operational advantage.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"text","t":"Fullsteam doesn't buy software to change what makes it unique — it buys software where deep industry knowledge is the product. The parent brings patterns from across its portfolio without forcing a different playbook on every business.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Industry knowledge","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show expertise that stays with the software.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Knowledge of the workflows, regulations, and buyers in each niche stays inside the business. [placeholder] — examples are not yet specified.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Shared learnings","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show learnings without homogenizing brands.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"When a problem comes up in one vertical, Fullsteam can share what worked elsewhere without changing the brand or culture. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"},{"k":"frame","c":[{"k":"text","t":"Product fit","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"span"},{"k":"text","t":"Intent: show why a horizontal provider isn't the same thing.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Decisions stay grounded in how that industry actually works — an advantage a generalist can't easily replicate. [placeholder]","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"all"},"nm":"Card"}],"g":12,"nm":"use-grid"},{"k":"frame","c":[{"k":"text","t":"Intent: show the reason niche expertise matters.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"text","t":"Real examples from the portfolio, not generic stock. No asset supplied yet.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Focus Software first — industry-specific, mission-critical.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Scale [placeholder] — “11 verticals” is settled; “100+ businesses” is a publishability candidate (OI-5).","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"},{"k":"frame","c":[{"k":"text","t":"Proof [placeholder] — no cross-vertical metrics are published.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"},{"k":"text","t":"Constraint Never a one-size-fits-all playbook. Each business keeps its identity.","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"div"}],"d":"row","g":12,"nm":"Row"}],"g":12,"nm":"Facts"}],"g":12,"nm":"hw"},{"k":"anno","t":"An overview, not a product sheet. No tooling, no frameworks named, no case studies or named customers until publishability is confirmed (KB §20.4; OI-5). Keep the distinction between Vertical Software (the portfolio) and Operational advantages (how we grow them) clear.","lc":"#000000"}],"g":12,"nm":"op-section"}],"g":12,"nm":"oe-content"}],"g":12,"nm":"oe-layout"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"FAQ","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: answer common questions about Our Advantage.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Are Payments, Lending, and Insurance separate acquisitions?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"No. They are embedded capabilities added to the software businesses we own, helping them grow without changing their core focus.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"What about AI?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"AI at Fullsteam focuses on practical use cases that leverage proprietary vertical data — applied where it helps the business, not as a standalone replacement story.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Do these replace what a vertical does?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"No. They extend the system of record the industry already depends on.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"}],"nm":"FAQ"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"}],"nm":"Main"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Company","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Our Story","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Leadership","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Careers","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Open roles","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Explore","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Vertical Software","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Our Advantage","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"AI at Fullsteam","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Acquisitions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Connect","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Contact","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Partner inquiries","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Legal","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Privacy","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Terms","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Complaints","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"}],"d":"row","g":48,"nm":"Footer row","jc":"space-between"}],"p":[40,160,56,160],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Footer"}]};
const OPTS = {"pageId": "3:55487"};
return await buildPage(SPEC, OPTS);
