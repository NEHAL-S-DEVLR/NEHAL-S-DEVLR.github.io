/* ══════════════════════════════════════════════════════════════
   NEHAL S — PORTFOLIO
   Shared behaviour for every page.
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* ── icon sprite ────────────────────────────────────────────────
     Injected once here instead of repeated in every page's markup.
     Icons are decorative — every control also carries a text label
     or aria-label, so they degrade cleanly if this never runs. */
  (function () {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute';
    svg.innerHTML =
'<defs>' +
'<symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18-.06-.11-.23-.17-.48-.29z"/></symbol>' +
'<symbol id="i-gh" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49l-.01-1.72c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></symbol>' +
'<symbol id="i-li" viewBox="0 0 24 24"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></symbol>' +
'<symbol id="i-be" viewBox="0 0 24 24"><path fill="currentColor" d="M7.6 5.2c.9 0 1.7.08 2.4.24.7.15 1.3.4 1.8.75.5.35.88.8 1.14 1.38.27.57.4 1.28.4 2.1 0 .9-.2 1.65-.62 2.25-.4.6-1 1.1-1.8 1.48 1.1.32 1.9.87 2.44 1.67.53.8.8 1.75.8 2.88 0 .9-.18 1.68-.53 2.34a4.4 4.4 0 0 1-1.44 1.6c-.6.42-1.3.72-2.1.92-.78.2-1.6.3-2.42.3H0V5.2h7.6zM7.15 12c.74 0 1.35-.18 1.83-.53.48-.35.72-.92.72-1.71 0-.44-.08-.8-.24-1.08a1.7 1.7 0 0 0-.63-.65 2.6 2.6 0 0 0-.92-.32c-.35-.06-.7-.09-1.08-.09H3.4V12h3.75zm.2 7.2c.4 0 .8-.04 1.17-.12.37-.08.7-.21.98-.4.28-.19.5-.44.67-.77.16-.32.25-.74.25-1.24 0-.98-.28-1.68-.83-2.1-.55-.42-1.28-.63-2.19-.63H3.4v5.26h3.95zM17.9 19.1c.46.45 1.13.68 2 .68.62 0 1.16-.16 1.6-.47.46-.31.74-.64.84-.99h2.5c-.4 1.24-1.01 2.13-1.84 2.66-.83.54-1.83.8-3 .8-.82 0-1.55-.13-2.21-.39a4.6 4.6 0 0 1-1.67-1.12 5 5 0 0 1-1.05-1.74 6.6 6.6 0 0 1-.37-2.24c0-.8.13-1.53.38-2.21a5.1 5.1 0 0 1 2.76-2.92 5.5 5.5 0 0 1 2.16-.42c.9 0 1.68.17 2.35.52a4.8 4.8 0 0 1 1.65 1.4c.43.58.74 1.25.93 2 .19.75.26 1.53.2 2.36h-7.6c0 .87.3 1.66.75 2.1zM21.4 14.1c-.37-.4-1-.62-1.78-.62-.51 0-.94.09-1.28.26-.34.18-.61.4-.82.65-.2.26-.34.53-.42.82-.08.28-.13.54-.14.76h4.7c-.14-.75-.4-1.28-.76-1.68zM16.4 7.4h5.9v1.62h-5.9V7.4z"/></symbol>' +
'<symbol id="i-fg" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 24a3.75 3.75 0 0 1-3.75-3.75A3.75 3.75 0 0 1 8.5 16.5h3.75v3.75A3.75 3.75 0 0 1 8.5 24zM4.75 12A3.75 3.75 0 0 1 8.5 8.25h3.75v7.5H8.5A3.75 3.75 0 0 1 4.75 12zM8.5 0h3.75v7.5H8.5a3.75 3.75 0 0 1 0-7.5zM13.5 0h2.25a3.75 3.75 0 0 1 0 7.5H13.5V0zM19.25 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z"/></symbol>' +
'<symbol id="i-cp" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2.5 22 9v6l-10 6.5L2 15V9z"/><path d="M12 8.2 22 15M12 8.2 2 15M12 8.2V2.5M12 15.8 2 9M12 15.8 22 9M12 15.8v5.7"/></g></symbol>' +
'<symbol id="i-dr" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="10"/><path d="M5.2 5.6c3.6 4 6 8.9 7 14.2M2.4 14.3c5.4-.9 10.6.3 14.7 3M4.5 18.9C7.6 14 12.9 10.6 19 10.1M8.6 2.5c3.3 2.7 5.9 6.3 7.5 10.4"/></g></symbol>' +
'<symbol id="i-md" viewBox="0 0 24 24"><g fill="currentColor"><ellipse cx="6.8" cy="12" rx="6.8" ry="7"/><ellipse cx="17" cy="12" rx="2.9" ry="6.4"/><ellipse cx="22.6" cy="12" rx="1.1" ry="5.7"/></g></symbol>' +
'<symbol id="i-x" viewBox="0 0 24 24"><path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.11z"/></symbol>' +
'<symbol id="i-fb" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></symbol>' +
'<symbol id="i-ur" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M7 17 17 7M8 7h9v9"/></symbol>' +
'<symbol id="i-dn" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 5v14M5 12l7 7 7-7"/></symbol>' +
'<symbol id="i-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6.5 9 6 9-6"/></g></symbol>' +
'<symbol id="i-menu" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
'<symbol id="i-star" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M8.2 13.8 7 22l5-2.6L17 22l-1.2-8.2"/></symbol>' +
'<symbol id="i-cube" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M12 22V12M3 7l9 5 9-5"/></g></symbol>' +
'<symbol id="i-send" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" d="M3 11l18-8-8 18-2-8z"/></symbol>' +
'<symbol id="i-ig" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.2"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none"/></g></symbol>' +
'</defs>';
    document.body.insertBefore(svg, document.body.firstChild);
  })();

  /* ── current year ───────────────────────────────────────────── */
  $$('#yr').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ── hero line reveal ───────────────────────────────────────── */
  requestAnimationFrame(function () { document.body.classList.add('ready'); });

  /* ── letter scramble ────────────────────────────────────────── */
  (function () {
    var el = $('[data-scramble]');
    if (!el || reduce) return;
    var final = el.textContent, pool = '▚▞█▓▒░/\\|<>*+=-_·';
    var queue = final.split('').map(function (c, i) {
      return { c: c, start: 10 + Math.floor(Math.random() * 12), end: 26 + i * 2.5 + Math.floor(Math.random() * 14) };
    });
    var frame = 0;
    function tick() {
      var out = '', done = 0;
      for (var i = 0; i < queue.length; i++) {
        var q = queue[i];
        if (frame >= q.end) { out += q.c; done++; }
        else if (frame >= q.start) {
          if (!q.r || Math.random() < 0.3) q.r = pool[Math.floor(Math.random() * pool.length)];
          out += q.r;
        } else out += q.c;
      }
      el.textContent = out; frame++;
      if (done < queue.length) requestAnimationFrame(tick); else el.textContent = final;
    }
    setTimeout(function () { requestAnimationFrame(tick); }, 620);
  })();

  /* ── scroll progress + header state ─────────────────────────── */
  var prog = $('#prog'), hdr = $('#hdr');
  function onProg() {
    var d = document.documentElement, max = d.scrollHeight - d.clientHeight;
    if (prog) prog.style.width = (max > 0 ? (d.scrollTop / max) * 100 : 0) + '%';
    if (hdr) hdr.classList.toggle('solid', d.scrollTop > 20);
  }
  onProg();
  addEventListener('scroll', onProg, { passive: true });
  addEventListener('resize', onProg, { passive: true });

  /* ── mobile menu ────────────────────────────────────────────── */
  (function () {
    var burger = $('#burger'), sheet = $('#sheet');
    if (!burger || !sheet) return;
    function setOpen(open) {
      sheet.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () { setOpen(!sheet.classList.contains('open')); });
    sheet.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.classList.contains('sheet-bg')) setOpen(false);
    });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  })();

  /* ── reveal on scroll ───────────────────────────────────────────
     Fail-safe: anything still hidden after 2.5s is shown regardless,
     so a missed scroll event can never leave the page looking blank. */
  var pending = $$('.rv');
  function sweep() {
    var h = innerHeight || document.documentElement.clientHeight;
    for (var i = pending.length - 1; i >= 0; i--) {
      if (pending[i].getBoundingClientRect().top < h - 50) {
        pending[i].classList.add('in');
        pending.splice(i, 1);
      }
    }
  }
  function revealAll() {
    pending.forEach(function (el) { el.style.transitionDelay = '0ms'; el.classList.add('in'); });
    pending.length = 0;
  }
  var busy = false;
  function onRv() {
    if (busy) return;
    busy = true;
    requestAnimationFrame(function () { sweep(); busy = false; });
  }
  addEventListener('scroll', onRv, { passive: true });
  addEventListener('resize', onRv, { passive: true });
  addEventListener('load', onRv);

  pending.forEach(function (el, i) {
    if (el.getBoundingClientRect().top < (innerHeight || 800)) {
      el.style.transitionDelay = Math.min(i * 80, 460) + 'ms';
    }
  });
  requestAnimationFrame(function () {
    sweep();
    setTimeout(function () { $$('.rv').forEach(function (el) { el.style.transitionDelay = ''; }); }, 1200);
  });
  setTimeout(revealAll, 2500);

  /* ── pointer-follow glow on cards ───────────────────────────── */
  $$('.hcard').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ── GitHub contribution heatmap ────────────────────────────────
     Real data pulled from the contribution graph: 366 days,
     10 Aug 2025 → 10 Aug 2026, one level digit (0-4) per day. */
  (function () {
    var heat = $('#heat'), months = $('#months');
    if (!heat) return;

    var LEVELS =
      "0000000000000000000000000000000000000000000000000000000000000" +
      "0000000000000001000000000000000010000000000000000000002000000" +
      "0020001112131000000000002230000100000000000000000000110000000" +
      "0000000000000000000000000000000000000000000000000000000000000" +
      "0000000000000000000000000010000421001000000000000000000000000" +
      "0000000000000000000000000000010000000000000000000000000000000";

    var start = new Date(2025, 7, 10);           // 10 Aug 2025, a Sunday
    var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var fh = document.createDocumentFragment(), fm = document.createDocumentFragment(), lastMon = -1;

    for (var i = 0; i < LEVELS.length; i++) {
      var d = new Date(start.getTime() + i * 86400000);
      var cell = document.createElement('i');
      cell.setAttribute('data-l', LEVELS[i]);
      cell.title = d.getDate() + ' ' + MON[d.getMonth()] + ' ' + d.getFullYear() +
        (LEVELS[i] === '0' ? ' — no contributions' : ' — contributions');
      fh.appendChild(cell);

      if (i % 7 === 0) {                          // one label slot per week column
        var lab = document.createElement('span');
        if (d.getMonth() !== lastMon && d.getDate() <= 7) {
          lab.textContent = MON[d.getMonth()];
          lastMon = d.getMonth();
        }
        fm.appendChild(lab);
      }
    }
    heat.appendChild(fh);
    if (months) months.appendChild(fm);
  })();
})();
