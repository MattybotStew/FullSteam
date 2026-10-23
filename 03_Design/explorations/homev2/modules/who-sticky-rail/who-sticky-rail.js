/**
 * Sticky image rail for Section 02 (Acquire / Grow / Lead).
 * Extracted from homev2 index.html — 2026-10-23.
 *
 * Usage:
 *   var rail = WhoStickyRail.bind(document.getElementById('who-we-are'));
 *   // inside requestAnimationFrame scroll handler:
 *   rail.renderRail();
 *   rail.renderWho(reduceMotionMatches);
 */
/* global window */
var WhoStickyRail = (function () {
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  function bind(root) {
    if (!root) return { renderRail: noop, renderWho: noop, measureWho: noop, onResize: noop };
    var railShots = root.querySelectorAll('.who__shot');
    var railCap = root.querySelector('.who__cap');
    var railSteps = root.querySelectorAll('.who__step');
    var whoFrame = root.querySelector('.who__frame');
    var whoRise = [].slice.call(root.querySelectorAll('.who__rise'));
    var whoCap = root.querySelector('.who__cap');
    var railActive = -1;
    var whoSettled = false;
    var whoStart = null;
    var whoP = -1;

    function measureWho() {
      if (!whoFrame) return;
      var frameTop = whoFrame.getBoundingClientRect().top + window.scrollY;
      whoStart = frameTop - window.innerHeight;
      whoP = -1;
      whoSettled = false;
    }

    function renderRail() {
      if (!railSteps.length) return;
      var line = window.innerHeight * 0.55;
      var idx = 0;
      for (var i = 0; i < railSteps.length; i++) {
        if (railSteps[i].getBoundingClientRect().top <= line) idx = i;
      }
      if (idx === railActive) return;
      railActive = idx;
      for (var s = 0; s < railShots.length; s++) {
        railShots[s].classList.toggle('is-on', s === idx);
      }
      if (railCap) {
        railCap.innerHTML = '<b>' + String(idx + 1 < 10 ? '0' + (idx + 1) : idx + 1) +
          '</b> &nbsp;' + (railSteps[idx].dataset.cap || '');
      }
    }

    function renderWho(reduce) {
      if (!whoFrame || reduce) return;
      if (whoStart === null) measureWho();
      var vh = window.innerHeight;
      var p = clamp01((window.scrollY - whoStart) / (vh * 0.6));
      if (p >= 1) {
        if (whoSettled) return;
        whoSettled = true;
        whoP = 1;
        whoFrame.style.opacity = '';
        whoFrame.style.transform = '';
        for (var k = 0; k < whoRise.length; k++) {
          whoRise[k].style.opacity = '';
          whoRise[k].style.transform = '';
        }
        if (whoCap) whoCap.style.opacity = '';
        return;
      }
      whoSettled = false;
      if (Math.abs(p - whoP) < 0.004) return;
      whoP = p;
      var e = p * p * (3 - 2 * p);
      whoFrame.style.opacity = e.toFixed(3);
      whoFrame.style.transform = 'scale(' + (0.7 + 0.3 * e).toFixed(4) + ')';
      for (var j = 0; j < whoRise.length; j++) {
        var d = j * 0.12;
        var q = clamp01((p - d) / Math.max(0.001, 1 - d));
        var eq = q * q * (3 - 2 * q);
        whoRise[j].style.opacity = eq.toFixed(3);
        whoRise[j].style.transform =
          'translate3d(' + ((-40 * (1 - eq)).toFixed(1)) + 'px,' +
          ((1 - eq) * 22).toFixed(1) + 'px,0)';
      }
      if (whoCap) {
        var cq = clamp01((p - 0.86) / 0.14);
        whoCap.style.opacity = (cq * cq * (3 - 2 * cq)).toFixed(3);
      }
    }

    function noop() {}

    return {
      renderRail: renderRail,
      renderWho: renderWho,
      measureWho: measureWho,
      onResize: measureWho
    };
  }

  return { bind: bind };
})();
