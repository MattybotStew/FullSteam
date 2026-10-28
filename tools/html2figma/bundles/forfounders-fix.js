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

const SPEC = {"n":"Acquisitions","w":1440,"c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"FULLSTEAM","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","ls":0.4,"nm":"Logo"},{"k":"text","t":"Explore vertical solutions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"nav-right"}],"g":12,"nm":"nav"}],"d":"row","nm":"Nav","al":"center","jc":"space-between"}],"p":[12,24,12,24],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Header","mh":84},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Acquisitions","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: answer why a founder would choose Fullsteam.","fs":56,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.05,"ls":-1.5,"mw":760,"nm":"H1"},{"k":"anno","t":"On-page name is Acquisitions (client-preferred, 2026-10-22, over For Founders). Interior nav and footer use that label. The sitemap lock is not re-locked yet — the file is still for-founders.html . A home for the business you built — certainty of close, brands that keep their names, and a larger team to scale what you started. Never frame the sale as an exit. Founder lens; investors secondary.","lc":"#000000"},{"k":"text","t":"We buy and grow industry-specific software companies — systems of record with AI, payments, and operational excellence built in. Software first, a close you can count on, and a bigger team to scale what you started.","fs":18,"fw":"Regular","ff":"sans","lc":"#000000","mw":560,"nm":"Lede"},{"k":"text","t":"Why Fullsteam How it works What we look for FAQ Acquisitions email","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"jumps"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,48,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: page-hero"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"01 — Why Fullsteam","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: reassure the founder about people and brand.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"anno","t":"Your name stays, your team stays. Values fit, certainty of close, a larger organization that scales what you built. Never call the sale an exit. Founder lens; investors secondary.","lc":"#000000"},{"k":"frame","c":[{"k":"text","t":"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"frame","c":[{"k":"text","t":"Founder video","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"video-ph"},{"k":"text","t":"Founder video","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"video-ph"},{"k":"text","t":"Founder video","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"video-ph"}],"g":12,"nm":"video-row"},{"k":"anno","t":"More than one founder video may sit in Why Fullsteam. Slots only — no assets yet. Do not name a founder until the client confirms the video can be published.","lc":"#000000"}],"g":12,"nm":"div"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"02 — How it works","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: make the process feel certain and low-risk.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"anno","t":"A conversation, then a close you can count on. Steps are structural placeholders — no timelines, multiples, or deal terms. Founder lens; investors secondary.","lc":"#000000"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"01","fs":12,"fw":"Bold","ff":"mono","lc":"#000000","nm":"Number"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Intent: step 1 — the first conversation.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"g":6,"nm":"Body"}],"d":"row","p":[16,0,0,0],"g":14,"bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Step"},{"k":"frame","c":[{"k":"text","t":"02","fs":12,"fw":"Bold","ff":"mono","lc":"#000000","nm":"Number"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Intent: step 2 — test the fit, both ways.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"g":6,"nm":"Body"}],"d":"row","p":[16,0,0,0],"g":14,"bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Step"},{"k":"frame","c":[{"k":"text","t":"03","fs":12,"fw":"Bold","ff":"mono","lc":"#000000","nm":"Number"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Intent: step 3 — certainty of close.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Ut enim ad minim veniam, quis nostrud exercitation.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"g":6,"nm":"Body"}],"d":"row","p":[16,0,0,0],"g":14,"bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Step"},{"k":"frame","c":[{"k":"text","t":"04","fs":12,"fw":"Bold","ff":"mono","lc":"#000000","nm":"Number"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Intent: step 4 — continuity after close.","fs":20,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"nm":"H3"},{"k":"text","t":"Duis aute irure dolor in reprehenderit in voluptate.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"g":6,"nm":"Body"}],"d":"row","p":[16,0,0,0],"g":14,"bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Step"}],"g":16,"nm":"Steps"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block tan"},{"k":"frame","c":[{"k":"frame","c":[{"k":"ph","mh":180,"nm":"Image placeholder"},{"k":"frame","c":[{"k":"text","t":"03 — What we look for","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: state what Fullsteam looks for.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"anno","t":"Lead with the industry, not an acquisition count. Software first — a system of record for one industry, with AI and payments added after the close. No named case studies until confirmed. Founder lens; investors secondary.","lc":"#000000"},{"k":"frame","c":[{"k":"text","t":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"prose"},{"k":"text","t":"Explore our vertical solutions","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"g":12,"nm":"div"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"04 — Acquisitions email","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: offer the acquisitions address, not a form.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"anno","t":"The lead form has been removed from this page. The close is a generic acquisitions@ address — confirm the exact mailbox before launch. No Talk to us form here. The homepage must not carry this form either; that CTA change is in the homepage pass. Founder lens.","lc":"#000000"},{"k":"text","t":"Write the acquisitions team directly. This page confirms who Fullsteam is; the email is the next step.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"},{"k":"text","t":"acquisitions@fullsteam.com","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block tan"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"FAQ","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.4,"nm":"Beat"},{"k":"text","t":"Intent: answer the founder's pre-meeting questions.","fs":40,"fw":"Bold","ff":"sans","lc":"#000000","fd":1,"lh":1.1,"ls":-1,"mw":720,"nm":"H2"},{"k":"anno","t":"Straight answers before the call: what we buy, how a close works, team and brand, AI. Founder lens; investors read it for clarity and constraints.","lc":"#000000"},{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Do you only care about our payments?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"Software comes first. Payments is how the business grows after that. Lorem ipsum dolor sit amet, consectetur adipiscing elit.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Is this an exit?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"No. This page should never call it an exit. Fullsteam is a home for the business. Sed do eiusmod tempor incididunt ut labore.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"What happens to our name and our team?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"The brand stays. The people stay. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"How sure is the close?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"Certainty of close is the point of this answer. Duis aute irure dolor in reprehenderit in voluptate velit esse.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Do you understand what we do?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"Answer from the vertical, not from a generic roll-up. Excepteur sint occaecat cupidatat non proident.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"When do our customers hear about this?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"Not at the close. Announcements are case by case, usually after the business has settled in. Nemo enim ipsam voluptatem.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"What does Fullsteam actually buy?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"System-of-record software built for one industry — the software a business runs on every day. Software is about three-quarters of the business; payments is the growth that comes after.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"},{"k":"frame","c":[{"k":"text","t":"Does AI replace my team?","fs":18,"fw":"Bold","ff":"sans","lc":"#000000","nm":"Question"},{"k":"text","t":"No. We use AI to make the software better and take repetitive work off small teams — use cases first, never a headcount story.","fs":16,"fw":"Regular","ff":"sans","lc":"#000000","mw":680,"nm":"P"}],"p":[14,0,14,0],"g":10,"bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Accordion item"}],"nm":"FAQ"},{"k":"anno","t":"Answers are structural placeholders for the content pass. They record the locked constraints: software before payments, never “exit,” brands stay standalone, no announcement at close, and AI is never framed as staff reduction.","lc":"#000000"}],"p":[0,24,0,24],"nm":"Wrap","w":"fixed","fw":1120}],"p":[64,0,64,0],"bg":"#FFFFFF","bd":{"c":"#000000","w":1,"dash":0,"s":"bottom"},"nm":"Section: block"}],"nm":"Main"},{"k":"frame","c":[{"k":"frame","c":[{"k":"frame","c":[{"k":"text","t":"Company","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Our Story","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Leadership","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Careers","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Open roles","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Explore","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Vertical Software","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Our Advantage","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"AI at Fullsteam","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Acquisitions","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Connect","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Contact","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Partner inquiries","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"},{"k":"frame","c":[{"k":"text","t":"Legal","fs":11,"fw":"Bold","ff":"mono","lc":"#000000","up":1,"ls":1.2,"nm":"FooterHeading"},{"k":"text","t":"Privacy","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Terms","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"},{"k":"text","t":"Complaints","fs":15,"fw":"Regular","ff":"sans","lc":"#000000","nm":"a"}],"g":4,"nm":"Footer column"}],"d":"row","g":48,"nm":"Footer row","jc":"space-between"}],"p":[40,160,56,160],"bg":"#F3E6D0","bd":{"c":"#000000","w":1,"dash":0,"s":"top"},"nm":"Footer"}]};
const OPTS = {"pageId": "3:55487"};
return await buildPage(SPEC, OPTS);
