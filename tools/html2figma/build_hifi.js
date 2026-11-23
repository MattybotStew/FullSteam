/* Figma-side builder for the hi-fi (client-review) pages.
 *
 * Pairs with extract_hifi.js. Replays measured geometry as an absolutely
 * positioned frame; images are created as placeholders named IMG::<url> so the
 * image fills can be attached separately with figma_set_image_fill.
 *
 *   const SPEC = {...}; const OPTS = {...};
 *   return await hifiBuild(SPEC, OPTS);
 */

const HF_SOLID = (c) => ({
  type: 'SOLID',
  color: { r: c.r / 255, g: c.g / 255, b: c.b / 255 },
  opacity: c.a === undefined ? 1 : c.a,
});

const HF_STOPS = (stops) =>
  stops.map((s) => ({
    position: Math.max(0, Math.min(1, s.pos)),
    color: { r: s.color.r / 255, g: s.color.g / 255, b: s.color.b / 255, a: s.color.a === undefined ? 1 : s.color.a },
  }));

const HF_GRAD = (n) => {
  let gradientTransform;
  let type;
  if (n.type === 'linear') {
    const rad = (n.angle * Math.PI) / 180;
    const dx = Math.sin(rad);
    const dy = -Math.cos(rad);
    const L = Math.abs(dx) + Math.abs(dy) || 1;
    gradientTransform = [
      [dx / L, dy / L, 0.5 - (dx + dy) / (2 * L)],
      [-dy / L, dx / L, 0.5 + (dy - dx) / (2 * L)],
    ];
    type = 'GRADIENT_LINEAR';
  } else {
    const cx = (n.shape.at[0] || 0) / 100;
    const cy = (n.shape.at[1] || 0) / 100;
    const rx = (n.shape.rx || 50) / 100;
    const ry = (n.shape.ry || 50) / 100;
    gradientTransform = [
      [1 / (rx || 0.5), 0, -cx / (rx || 0.5)],
      [0, 1 / (ry || 0.5), -cy / (ry || 0.5)],
    ];
    type = 'GRADIENT_RADIAL';
  }
  return { type, gradientTransform, gradientStops: HF_STOPS(n.stops) };
};

async function hifiBuild(SPEC, OPTS) {
  const page = await figma.getNodeByIdAsync(OPTS.pageId || figma.currentPage.id);
  let root = null;
  if (OPTS.frameId) root = await figma.getNodeByIdAsync(OPTS.frameId);
  if (!root) {
    root = figma.createFrame();
    root.name = OPTS.name || 'Page';
    root.resize(SPEC.w || 1440, SPEC.h || 1000);
    root.fills = [HF_SOLID({ r: 255, g: 255, b: 255, a: 1 })];
    root.clipsContent = true;
    page.appendChild(root);
    if (OPTS.x !== undefined) root.x = OPTS.x;
    if (OPTS.y !== undefined) root.y = OPTS.y;
  }

  const fonts = [
    { family: 'Instrument Sans', style: 'Regular' },
    { family: 'Instrument Sans', style: 'Medium' },
    { family: 'Instrument Sans', style: 'SemiBold' },
    { family: 'Instrument Sans', style: 'Bold' },
    { family: 'Instrument Serif', style: 'Italic' },
    { family: 'Instrument Serif', style: 'Regular' },
    { family: 'Fragment Mono', style: 'Regular' },
  ];
  const loaded = {};
  for (const f of fonts) {
    const key = f.family + '|' + f.style;
    try {
      await figma.loadFontAsync(f);
      loaded[key] = f;
    } catch (e) {
      loaded[key] = { family: 'Inter', style: f.style === 'Italic' ? 'Italic' : 'Regular' };
      try {
        await figma.loadFontAsync(loaded[key]);
      } catch (e2) {
        loaded[key] = { family: 'Inter', style: 'Regular' };
      }
    }
  }
  const fontFor = (n) => loaded[n.family + '|' + n.style] || loaded['Instrument Sans|Regular'];

  const nodes = SPEC.nodes.slice(OPTS.from || 0, OPTS.to === undefined ? undefined : OPTS.to);
  let made = 0;
  for (const n of nodes) {
    try {
      if (n.k === 'rect') {
        const r = figma.createRectangle();
        r.name = 'bg';
        r.x = n.x;
        r.y = n.y;
        r.resize(Math.max(n.w, 0.5), Math.max(n.h, 0.5));
        r.fills = [HF_SOLID(n.fill)];
        if (n.radius) r.cornerRadius = n.radius;
        if (n.dash) {
          try {
            r.dashPattern = [6, 4];
          } catch (e) {}
        }
        root.appendChild(r);
      } else if (n.k === 'grad') {
        const r = figma.createRectangle();
        r.name = 'gradient';
        r.x = n.x;
        r.y = n.y;
        r.resize(Math.max(n.w, 0.5), Math.max(n.h, 0.5));
        r.fills = [HF_GRAD(n)];
        if (n.radius) r.cornerRadius = n.radius;
        root.appendChild(r);
      } else if (n.k === 'image') {
        const r = figma.createRectangle();
        r.name = 'IMG::' + (n.src || '');
        r.x = n.x;
        r.y = n.y;
        r.resize(Math.max(n.w, 0.5), Math.max(n.h, 0.5));
        r.fills = [HF_SOLID({ r: 232, g: 232, b: 232, a: 1 })];
        if (n.radius) r.cornerRadius = n.radius;
        root.appendChild(r);
      } else if (n.k === 'svg') {
        const s = figma.createNodeFromSvg(n.markup);
        s.name = 'svg';
        root.appendChild(s);
        // scale to the measured box, then place by its top-left
        const sx = n.w / (s.width || 1);
        const sy = n.h / (s.height || 1);
        if (Math.abs(sx - 1) > 0.001 || Math.abs(sy - 1) > 0.001) {
          try {
            s.rescale(Math.min(sx, sy));
          } catch (e) {}
        }
        s.x = n.x + (n.w - s.width) / 2;
        s.y = n.y + (n.h - s.height) / 2;
      } else if (n.k === 'text') {
        const t = figma.createText();
        t.name = n.t.slice(0, 40);
        root.appendChild(t);
        const f = fontFor(n);
        t.fontName = f;
        t.characters = n.up ? n.t.toUpperCase() : n.t;
        t.fontSize = n.fs;
        if (n.lh) t.lineHeight = { value: Math.round(n.lh * 100) / 100, unit: 'PIXELS' };
        if (n.ls) t.letterSpacing = { value: n.ls, unit: 'PIXELS' };
        t.fills = [HF_SOLID(n.color)];
        if (n.underline) t.textDecoration = 'UNDERLINE';
        t.textAutoResize = 'WIDTH_AND_HEIGHT';
        t.x = n.x;
        t.y = n.y;
      }
      made++;
    } catch (e) {
      // one bad node must not abort the page
    }
  }

  return {
    id: root.id,
    name: root.name,
    w: Math.round(root.width),
    h: Math.round(root.height),
    x: Math.round(root.x),
    y: Math.round(root.y),
    nodes: made,
    total: SPEC.nodes.length,
    range: [OPTS.from || 0, OPTS.to === undefined ? SPEC.nodes.length : OPTS.to],
  };
}
