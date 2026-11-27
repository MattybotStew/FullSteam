/* ============================================================================
   Design-notes cursor — local review layer
   ----------------------------------------------------------------------------
   Toggle the pointer, click anywhere, write a comment. The pin is anchored to
   the element under the click by selector + a relative x/y inside that element,
   so it follows the layout on scroll and resize.

   Storage: localStorage ("fullsteam:comments:v1"), scoped by page path.
   Output:  "Copy" puts markdown on the clipboard for the agent; "Export" saves
            a .md file. Nothing is sent to a server.

   Active only on localhost / 127.0.0.1, or with ?comments=1.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'fullsteam:comments:v1';
  var SESSION = 'fullsteam:comment-mode';
  var PAGE = location.pathname.replace(/\/index\.html$/, '/');
  var LOCAL = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(location.hostname);
  var FILE = location.protocol === 'file:';
  var FORCED = false;
  try {
    FORCED = new URLSearchParams(location.search).has('comments');
  } catch (err) {
    FORCED = /[?&]comments(=|&|$)/.test(location.search);
  }

  if (!LOCAL && !FILE && !FORCED) return;

  var notes = [];
  var allNotes = [];
  var mode = false;
  var draft = null;
  var editingId = null;
  var activeId = null;
  var pinEls = {};
  var pendingPin = null;
  var toastTimer = 0;
  var raf = 0;
  var hoverRaf = 0;
  var serverOnline = false;
  var syncInFlight = false;
  var syncAgain = false;
  var hydrating = false;

  var root, pill, bar, pins, hover, hoverLabel, cursorBadge, pop, ctx, view, viewText,
    editWrap, input, saveBtn, countEl, syncEl, toastEl;

  /* ------------------------------------------------------------------ utils */

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function uid() {
    return 'c_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function esc(s) {
    if (window.CSS && CSS.escape) return CSS.escape(String(s));
    return String(s).replace(/[^a-zA-Z0-9_-]/g, function (c) {
      return '\\' + c;
    });
  }

  function textOf(el) {
    if (!el) return '';
    var t = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!t && el.getAttribute) {
      t = el.getAttribute('alt') || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '';
    }
    return t.slice(0, 160);
  }

  function pct(n) {
    return Math.round((Number(n) || 0) * 100) + '%';
  }

  function describe(el) {
    if (!el) return 'page';
    var sec = el.closest ? el.closest('section[id], article[id], header[id], footer[id], main[id]') : null;
    var label = sec && sec.id ? '#' + sec.id : el.id ? '#' + el.id : el.tagName.toLowerCase();
    if (sec) {
      var h = sec.querySelector('h1, h2, h3');
      var t = h ? textOf(h).slice(0, 52) : '';
      if (t) label += ' · ' + t;
    }
    return label;
  }

  function selectorFor(el) {
    if (!el || el.nodeType !== 1) return 'body';
    if (el === document.documentElement) return 'html';
    if (el.id) return '#' + esc(el.id);
    var path = [];
    var node = el;
    while (node && node.nodeType === 1 && node !== document.documentElement) {
      if (node.id) {
        path.unshift('#' + esc(node.id));
        break;
      }
      var i = 1;
      var sib = node;
      while ((sib = sib.previousElementSibling)) {
        if (sib.tagName === node.tagName) i++;
      }
      path.unshift(node.tagName.toLowerCase() + ':nth-of-type(' + i + ')');
      node = node.parentElement;
    }
    return path.join(' > ') || 'body';
  }

  function findAnchor(note) {
    var el = null;
    if (note.selector) {
      try {
        el = document.querySelector(note.selector);
      } catch (err) {
        el = null;
      }
    }
    if (!el && note.snippet) {
      var candidates = document.querySelectorAll(
        'section, h1, h2, h3, h4, p, li, a, button, figure, img, span'
      );
      for (var i = 0; i < candidates.length; i++) {
        if (textOf(candidates[i]).indexOf(note.snippet) !== -1) {
          el = candidates[i];
          break;
        }
      }
    }
    return el;
  }

  function notePos(note) {
    var el = findAnchor(note);
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (!r.width && !r.height) return null;
    return {
      x: r.left + (Number(note.rx) || 0) * r.width,
      y: r.top + (Number(note.ry) || 0) * r.height,
      el: el
    };
  }

  /* --------------------------------------------------------------- storage */

  function loadAll() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(function (n) {
        return n && typeof n === 'object' && typeof n.text === 'string';
      });
    } catch (err) {
      return [];
    }
  }

  function loadPage() {
    allNotes = loadAll();
    notes = allNotes.filter(function (n) {
      return n.page === PAGE;
    });
  }

  function saveLocal() {
    allNotes = loadAll().filter(function (n) {
      return n.page !== PAGE;
    });
    allNotes = allNotes.concat(notes);
    try {
      localStorage.setItem(KEY, JSON.stringify(allNotes));
    } catch (err) {
      toast('Could not save locally — storage is full');
    }
  }

  function persist() {
    saveLocal();
    updateCount();
    syncToRepo();
  }

  function setSync(text, state) {
    if (!syncEl) return;
    syncEl.textContent = text;
    syncEl.setAttribute('data-state', state || '');
    syncEl.title =
      state === 'off'
        ? 'Start python3 tools/review-server.py, then click to retry'
        : 'Notes are saved in 03_Design/client-review/homepage/design-comments.json';
  }

  function mergeNotes(remote, local) {
    var map = {};
    (remote || []).forEach(function (n) {
      if (n && n.id) map[n.id] = n;
    });
    (local || []).forEach(function (n) {
      if (!n || !n.id) return;
      if (!map[n.id] || (n.updatedAt || 0) > (map[n.id].updatedAt || 0)) map[n.id] = n;
    });
    return Object.keys(map)
      .map(function (id) {
        return map[id];
      })
      .sort(function (a, b) {
        return (a.createdAt || 0) - (b.createdAt || 0);
      });
  }

  function hydrateFromServer() {
    if (hydrating) return;
    if (!/^https?:$/.test(location.protocol)) {
      serverOnline = false;
      setSync('Local only', 'off');
      return;
    }
    hydrating = true;
    fetch('/__design-notes?page=' + encodeURIComponent(PAGE), {
      cache: 'no-store',
      headers: { Accept: 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(
        function (data) {
          serverOnline = true;
          var remote = Array.isArray(data.notes) ? data.notes : [];
          var localOnly = notes.filter(function (n) {
            return !remote.some(function (r) {
              return r.id === n.id;
            });
          });
          notes = mergeNotes(remote, notes);
          saveLocal();
          updateCount();
          renderPins();
          setSync('Saved to repo', 'ok');
          if (localOnly.length) syncToRepo();
        },
        function () {
          serverOnline = false;
          setSync('Local only', 'off');
        }
      )
      .then(
        function () {
          hydrating = false;
        },
        function () {
          hydrating = false;
        }
      );
  }

  function syncToRepo() {
    if (!/^https?:$/.test(location.protocol)) {
      serverOnline = false;
      setSync('Local only', 'off');
      return;
    }
    if (syncInFlight) {
      syncAgain = true;
      return;
    }
    syncInFlight = true;
    setSync('Saving…', 'busy');
    fetch('/__design-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ page: PAGE, notes: notes })
    })
      .then(
        function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        },
        function (err) {
          throw err;
        }
      )
      .then(
        function () {
          serverOnline = true;
          setSync('Saved to repo', 'ok');
        },
        function () {
          serverOnline = false;
          setSync('Local only', 'off');
        }
      )
      .then(
        function () {
          syncInFlight = false;
          if (syncAgain) {
            syncAgain = false;
            syncToRepo();
          }
        },
        function () {
          syncInFlight = false;
        }
      );
  }

  /* ------------------------------------------------------------------- UI */

  function buildUI() {
    root = document.createElement('div');
    root.id = 'dn-root';

    root.innerHTML =
      '<button type="button" id="dn-pill" class="dn-pill" aria-pressed="false" title="Comment on this page">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.3 9 9 0 0 1-3.6-.7L4 21l1.6-4.2a8 8 0 0 1-1-4.1A8.4 8.4 0 0 1 13 4.4a8.4 8.4 0 0 1 8 7.1z"/>' +
      '</svg><span>Comment</span></button>' +
      '<div id="dn-bar" class="dn-bar" role="toolbar" aria-label="Comment tools" hidden>' +
      '<span class="dn-bar__dot" aria-hidden="true"></span>' +
      '<span class="dn-bar__hint"><strong>Comment mode</strong><span>Click anywhere — DeepSeek answers or applies</span></span>' +
      '<span class="dn-bar__count" id="dn-count">0 notes</span>' +
      '<button type="button" class="dn-sync" id="dn-sync" data-dn="sync" title="Saving notes into the repo">Starting&hellip;</button>' +
      '<button type="button" class="dn-btn dn-btn--gold" data-dn="exit">Done</button>' +
      '</div>' +
      '<div id="dn-hover" class="dn-hover" hidden><span class="dn-hover__label" id="dn-hover-label"></span></div>' +
      '<div id="dn-cursor" class="dn-cursor" hidden aria-hidden="true">Comment</div>' +
      '<div id="dn-pins" class="dn-pins" hidden aria-label="Comments"></div>' +
      '<div id="dn-pop" class="dn-pop" role="dialog" aria-label="Comment" hidden>' +
      '<p class="dn-pop__ctx" id="dn-ctx"></p>' +
      '<div id="dn-view" hidden>' +
      '<p class="dn-pop__text" id="dn-text"></p>' +
      '<div class="dn-pop__row">' +
      '<button type="button" class="dn-btn dn-btn--danger" data-dn="delete">Delete</button>' +
      '<span class="dn-spacer"></span>' +
      '<button type="button" class="dn-btn dn-btn--quiet" data-dn="close">Close</button>' +
      '<button type="button" class="dn-btn dn-btn--primary" data-dn="edit">Edit</button>' +
      '</div></div>' +
      '<div id="dn-edit" hidden>' +
      '<textarea id="dn-input" class="dn-input" placeholder="Ask a design question or describe the change…" aria-label="Comment text"></textarea>' +
      '<div class="dn-pop__row">' +
      '<span class="dn-pop__hint">&#8984;&#8629; to save</span>' +
      '<button type="button" class="dn-btn dn-btn--quiet" data-dn="cancel">Cancel</button>' +
      '<button type="button" class="dn-btn dn-btn--primary" data-dn="save" id="dn-save">Add comment</button>' +
      '</div></div>' +
      '<p class="dn-pop__meta" id="dn-meta"></p>' +
      '</div>' +
      '<div id="dn-toast" class="dn-toast" role="status" aria-live="polite"></div>';

    document.body.appendChild(root);

    pill = document.getElementById('dn-pill');
    bar = document.getElementById('dn-bar');
    pins = document.getElementById('dn-pins');
    hover = document.getElementById('dn-hover');
    hoverLabel = document.getElementById('dn-hover-label');
    cursorBadge = document.getElementById('dn-cursor');
    pop = document.getElementById('dn-pop');
    ctx = document.getElementById('dn-ctx');
    view = document.getElementById('dn-view');
    viewText = document.getElementById('dn-text');
    editWrap = document.getElementById('dn-edit');
    input = document.getElementById('dn-input');
    saveBtn = document.getElementById('dn-save');
    countEl = document.getElementById('dn-count');
    syncEl = document.getElementById('dn-sync');
    toastEl = document.getElementById('dn-toast');

    pendingPin = document.createElement('button');
    pendingPin.type = 'button';
    pendingPin.className = 'dn-pin dn-pin--pending';
    pendingPin.hidden = true;
    pendingPin.tabIndex = -1;
    pendingPin.setAttribute('aria-hidden', 'true');
    pendingPin.style.pointerEvents = 'none';
    pins.appendChild(pendingPin);

    bind();
    loadPage();
    updateCount();
  }

  function updateCount() {
    if (!countEl) return;
    countEl.textContent = notes.length + (notes.length === 1 ? ' note' : ' notes');
  }

  /* -------------------------------------------------------------- rendering */

  function makePin(note) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'dn-pin';
    b.setAttribute('data-id', note.id);
    b.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var id = b.getAttribute('data-id');
      var found = null;
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
          found = notes[i];
          break;
        }
      }
      if (found) openExisting(found);
    });
    pins.appendChild(b);
    pinEls[note.id] = b;
    return b;
  }

  function renderPins() {
    if (!pins) return;
    if (!mode) {
      pins.hidden = true;
      if (pendingPin) pendingPin.hidden = true;
      return;
    }
    pins.hidden = false;

    var seen = {};
    for (var i = 0; i < notes.length; i++) {
      var n = notes[i];
      var pos = notePos(n);
      var b = pinEls[n.id] || makePin(n);
      seen[n.id] = true;
      if (!pos) {
        b.hidden = true;
        continue;
      }
      b.hidden = false;
      b.textContent = String(i + 1);
      b.style.left = pos.x + 'px';
      b.style.top = pos.y + 'px';
      b.setAttribute('aria-label', 'Comment ' + (i + 1) + ': ' + n.text.slice(0, 80));
      b.classList.toggle('dn-pin--active', n.id === activeId);
    }

    Object.keys(pinEls).forEach(function (id) {
      if (!seen[id]) {
        if (pinEls[id].parentNode) pinEls[id].parentNode.removeChild(pinEls[id]);
        delete pinEls[id];
      }
    });

    if (draft && draft.el) {
      var r = draft.el.getBoundingClientRect();
      pendingPin.hidden = false;
      pendingPin.style.left = r.left + draft.rx * r.width + 'px';
      pendingPin.style.top = r.top + draft.ry * r.height + 'px';
      pendingPin.textContent = String(notes.length + 1);
    } else {
      pendingPin.hidden = true;
    }
  }

  function placePopAt(x, y) {
    pop.hidden = false;
    if (window.innerWidth <= 640) {
      pop.style.left = '';
      pop.style.top = '';
      pop.style.right = '';
      pop.style.bottom = '';
      return;
    }
    var pad = 12;
    var w = 340;
    var h = pop.offsetHeight || 190;
    var left = x + 18;
    if (left + w > window.innerWidth - pad) left = x - w - 18;
    left = clamp(left, pad, Math.max(pad, window.innerWidth - w - pad));
    var top = clamp(y - 24, pad, Math.max(pad, window.innerHeight - h - pad));
    pop.style.left = left + 'px';
    pop.style.top = top + 'px';
    pop.style.right = 'auto';
    pop.style.bottom = 'auto';
  }

  function showView() {
    view.hidden = false;
    editWrap.hidden = true;
  }

  function showEdit() {
    view.hidden = true;
    editWrap.hidden = false;
    saveBtn.textContent = editingId ? 'Save' : 'Add comment';
  }

  function focusInput() {
    setTimeout(function () {
      try {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      } catch (err) {
        /* ignore */
      }
    }, 0);
  }

  function openNew(x, y) {    var el = document.elementFromPoint(x, y);
    if (!el || el === document.documentElement || (el.closest && el.closest('#dn-root'))) return;
    var r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;

    draft = {
      el: el,
      selector: selectorFor(el),
      rx: clamp((x - r.left) / r.width, 0, 1),
      ry: clamp((y - r.top) / r.height, 0, 1),
      snippet: textOf(el),
      tag: el.tagName.toLowerCase(),
      context: describe(el),
      page: PAGE
    };
    editingId = null;
    activeId = null;

    ctx.textContent = draft.context + '  ·  ' + pct(draft.rx) + ' / ' + pct(draft.ry);
    input.value = '';
    showEdit();
    pop.hidden = false;
    bar.hidden = true;
    cursorBadge.hidden = true;
    syncToastPosition();
    placePopAt(x, y);
    renderPins();
    focusInput();
  }

  function openExisting(note) {
    draft = null;
    editingId = null;
    activeId = note.id;

    ctx.textContent = (note.context || note.tag || 'page') + '  ·  ' + pct(note.rx) + ' / ' + pct(note.ry);
    viewText.textContent = note.text;
    showView();
    var pos = notePos(note) || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    pop.hidden = false;
    bar.hidden = true;
    cursorBadge.hidden = true;
    syncToastPosition();
    placePopAt(pos.x, pos.y);
    renderPins();
  }

  function closeComposer() {
    draft = null;
    editingId = null;
    activeId = null;
    if (input) input.value = '';
    if (pop) pop.hidden = true;
    if (pendingPin) pendingPin.hidden = true;
    if (mode && bar) bar.hidden = false;
    syncToastPosition();
    renderPins();
  }

  function setMode(on) {
    mode = !!on;
    document.documentElement.classList.toggle('dn-mode', mode);
    pill.hidden = mode;
    bar.hidden = !mode;
    pins.hidden = !mode;
    hover.hidden = true;
    cursorBadge.hidden = true;
    if (!mode) {
      closeComposer();
    } else {
      updateCount();
      renderPins();
    }
    try {
      if (mode) sessionStorage.setItem(SESSION, '1');
      else sessionStorage.removeItem(SESSION);
    } catch (err) {
      /* ignore */
    }
  }

  function save() {
    var text = input.value.trim();
    if (!text) {
      input.focus();
      return;
    }
    var wasEditing = !!editingId;

    if (editingId) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === editingId) {
          notes[i].text = text;
          notes[i].updatedAt = Date.now();
          break;
        }
      }
    } else if (draft) {
      notes.push({
        id: uid(),
        page: PAGE,
        selector: draft.selector,
        rx: draft.rx,
        ry: draft.ry,
        snippet: draft.snippet,
        tag: draft.tag,
        context: draft.context,
        text: text,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        viewport: window.innerWidth + 'x' + window.innerHeight
      });
    }

    persist();
    closeComposer();
    toast(wasEditing ? 'Comment updated' : 'Comment added');
  }

  function editActive() {
    if (!activeId) return;
    var n = byId(activeId);
    if (!n) return;
    editingId = activeId;
    input.value = n.text;
    showEdit();
    focusInput();
  }

  function deleteActive() {
    if (!activeId) return;
    notes = notes.filter(function (n) {
      return n.id !== activeId;
    });
    persist();
    closeComposer();
    toast('Comment deleted');
  }

  function byId(id) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === id) return notes[i];
    }
    return null;
  }

  /* ----------------------------------------------------------------- export */

  function buildMarkdown() {
    var lines = [];
    lines.push('# Homepage design comments');
    lines.push('');
    lines.push('- Page: `' + PAGE + '`');
    lines.push('- Captured: ' + new Date().toISOString());
    lines.push('- Viewport: ' + window.innerWidth + '×' + window.innerHeight);
    lines.push('');

    var ordered = notes.slice().sort(function (a, b) {
      return (a.createdAt || 0) - (b.createdAt || 0);
    });

    if (!ordered.length) {
      lines.push('_No comments yet._');
      return lines.join('\n');
    }

    ordered.forEach(function (n, i) {
      lines.push('## ' + (i + 1) + '. ' + (n.context || n.tag || 'page'));
      lines.push('');
      lines.push('`' + n.selector + '` · ' + pct(n.rx) + ' / ' + pct(n.ry));
      if (n.snippet) lines.push('Element text: “' + n.snippet + '”');
      lines.push('');
      String(n.text)
        .split('\n')
        .forEach(function (line) {
          lines.push('> ' + line);
        });
      lines.push('');
    });

    return lines.join('\n');
  }

  function syncToastPosition() {
    if (!toastEl) return;
    toastEl.classList.toggle('dn-toast--top', !!(pop && !pop.hidden));
  }

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    syncToastPosition();
    toastEl.classList.add('is-in');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.classList.remove('is-in');
    }, 2200);
  }

  /* ---------------------------------------------------------------- events */

  function positionCursor(x, y) {
    if (!mode || !pop.hidden) {
      cursorBadge.hidden = true;
      return;
    }
    cursorBadge.hidden = false;
    var bw = cursorBadge.offsetWidth || 84;
    var bh = cursorBadge.offsetHeight || 25;
    var left = x + 16;
    var top = y + 18;
    if (left + bw > window.innerWidth - 8) left = x - bw - 16;
    if (top + bh > window.innerHeight - 8) top = y - bh - 18;
    cursorBadge.style.left = Math.max(8, left) + 'px';
    cursorBadge.style.top = Math.max(8, top) + 'px';
  }

  function bind() {
    pill.addEventListener('click', function () {
      setMode(true);
    });

    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-dn]');
      if (!b) return;
      var act = b.getAttribute('data-dn');
      if (act === 'exit') setMode(false);
      else if (act === 'sync') {
        if (serverOnline) syncToRepo();
        else hydrateFromServer();
      }
    });

    pop.addEventListener('click', function (e) {
      var b = e.target.closest('[data-dn]');
      if (!b) return;
      var act = b.getAttribute('data-dn');
      if (act === 'save') save();
      else if (act === 'cancel') {
        if (editingId) {
          editingId = null;
          var n = byId(activeId);
          if (n) {
            viewText.textContent = n.text;
            showView();
          } else {
            closeComposer();
          }
        } else {
          closeComposer();
        }
      } else if (act === 'edit') editActive();
      else if (act === 'delete') deleteActive();
      else if (act === 'close') closeComposer();
    });

    input.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        save();
      }
    });

    document.addEventListener(
      'click',
      function (e) {
        if (!mode) return;
        if (e.target.closest && e.target.closest('#dn-root')) return;
        e.preventDefault();
        e.stopPropagation();
        openNew(e.clientX, e.clientY);
      },
      true
    );

    document.addEventListener(
      'pointerdown',
      function (e) {
        if (!mode) return;
        if (e.target.closest && e.target.closest('#dn-root')) return;
        e.preventDefault();
      },
      true
    );

    document.addEventListener('pointermove', function (e) {
      if (!mode) {
        hover.hidden = true;
        cursorBadge.hidden = true;
        return;
      }
      if (!pop.hidden) {
        hover.hidden = true;
        cursorBadge.hidden = true;
        return;
      }
      if (e.target.closest && e.target.closest('#dn-root')) {
        hover.hidden = true;
        cursorBadge.hidden = true;
        return;
      }
      positionCursor(e.clientX, e.clientY);
      if (hoverRaf) return;
      var x = e.clientX;
      var y = e.clientY;
      hoverRaf = requestAnimationFrame(function () {
        hoverRaf = 0;
        var el = document.elementFromPoint(x, y);
        if (!el || el === document.body || el === document.documentElement) {
          hover.hidden = true;
          return;
        }
        var r = el.getBoundingClientRect();
        if (!r.width || !r.height) {
          hover.hidden = true;
          return;
        }
        hover.hidden = false;
        hover.style.left = r.left + 'px';
        hover.style.top = r.top + 'px';
        hover.style.width = r.width + 'px';
        hover.style.height = r.height + 'px';
        var label = el.tagName.toLowerCase();
        if (el.id) label += '#' + el.id;
        else if (el.classList && el.classList.length) label += '.' + el.classList[0];
        hoverLabel.textContent = label;
      });
    });

    document.addEventListener('pointerleave', function () {
      hover.hidden = true;
      cursorBadge.hidden = true;
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!pop.hidden) {
          closeComposer();
        } else if (mode) {
          setMode(false);
        }
        return;
      }
      if (e.altKey && e.shiftKey && e.code === 'KeyC') {
        e.preventDefault();
        setMode(!mode);
      }
    });

    window.addEventListener(
      'scroll',
      function () {
        if (!mode || raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          renderPins();
          hover.hidden = true;
          cursorBadge.hidden = true;
        });
      },
      { passive: true }
    );

    window.addEventListener('resize', function () {
      if (!mode) return;
      renderPins();
      hover.hidden = true;
      cursorBadge.hidden = true;
    });

    window.addEventListener('storage', function (e) {
      if (e.key !== KEY) return;
      loadPage();
      closeComposer();
      updateCount();
    });
  }

  /* ------------------------------------------------------------------- boot */

  function init() {
    buildUI();
    try {
      if (sessionStorage.getItem(SESSION) === '1') setMode(true);
    } catch (err) {
      /* storage may be blocked; start closed */
    }
    hydrateFromServer();
  }

  window.FullsteamComments = {
    toggle: function () {
      setMode(!mode);
    },
    open: function () {
      setMode(true);
    },
    close: function () {
      setMode(false);
    },
    clear: function () {
      notes = [];
      persist();
      closeComposer();
      toast('Comments cleared');
    },
    markdown: buildMarkdown,
    refresh: hydrateFromServer,
    sync: syncToRepo,
    get notes() {
      return notes.slice();
    },
    get mode() {
      return mode;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
