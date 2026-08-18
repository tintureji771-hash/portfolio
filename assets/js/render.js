/* ==========================================================================
   Renderer — turns content.js into the page.
   You should not need to edit this file. Edit /content.js instead.
   Runs before main.js (both are `defer`, so order is guaranteed).
   ========================================================================== */
(function () {
  'use strict';

  var D = window.SITE;
  if (!D) { console.error('[render] content.js did not load — window.SITE is missing'); return; }

  /* ---------- tiny helpers ------------------------------------------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // "Take a Look at My *Recent Work*"  ->  em-wrapped highlight
  function rich(s) {
    return esc(s).split('*').map(function (part, i) {
      return i % 2 ? '<em>' + part + '</em>' : part;
    }).join('');
  }

  function get(path) {
    return path.split('.').reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, D);
  }

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function fill(sel, html) { var el = $(sel); if (el) el.innerHTML = html; }
  function list(arr) { return (arr || []).map(function (x) { return x; }).join(''); }
  function delay(i, step) { return i ? ' style="--delay:' + (i * (step || 60)) + 'ms"' : ''; }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

  function initials(name) {
    return String(name || '').trim().split(/\s+/).slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
  }

  /* ---------- icon library -------------------------------------------
     Add your own by dropping another entry in here and naming it in
     content.js (e.g. icon: 'trophy').
     ------------------------------------------------------------------- */
  var S = function (body, opts) {
    opts = opts || {};
    return '<svg width="' + (opts.w || 20) + '" height="' + (opts.h || opts.w || 20) + '" viewBox="' +
      (opts.vb || '0 0 24 24') + '" fill="' + (opts.fill || 'none') + '"' +
      (opts.fill === 'currentColor' ? '' : ' stroke="currentColor" stroke-width="' + (opts.sw || 1.8) + '"') +
      ' aria-hidden="true">' + body + '</svg>';
  };

  var ICONS = {
    /* generic */
    arrow:    function (o) { return S('<path d="M2 10 10 2M4 2h6v6"/>', Object.assign({ vb: '0 0 12 12', w: 11, sw: 2 }, o)); },
    download: function (o) { return S('<path d="M6 1v8M2.5 6 6 9.5 9.5 6M2 11h8"/>', Object.assign({ vb: '0 0 12 12', w: 11, sw: 2 }, o)); },
    star:     function (o) { return S('<path d="M6 0l1.5 3.6L11.4 4l-3 2.8.8 3.9L6 8.8 2.8 10.7l.8-3.9L.6 4l3.9-.4z"/>', Object.assign({ vb: '0 0 12 12', w: 11, fill: 'currentColor' }, o)); },
    dot:      function (o) { return S('<circle cx="6" cy="6" r="6"/>', Object.assign({ vb: '0 0 12 12', w: 10, fill: 'currentColor' }, o)); },
    square:   function (o) { return S('<rect width="12" height="12" rx="3"/>', Object.assign({ vb: '0 0 12 12', w: 10, fill: 'currentColor' }, o)); },
    play:     function (o) { return S('<path d="M2 1v10l8-5z"/>', Object.assign({ vb: '0 0 12 12', w: 10, fill: 'currentColor' }, o)); },

    /* section / service / award icons */
    layers:   function (o) { return S('<path d="M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>', o); },
    stack:    function (o) { return S('<path d="M12 2 2 7l10 5 10-5zM2 17l10 5 10-5"/>', o); },
    type:     function (o) { return S('<path d="M4 6V4h16v2M12 4v16M9 20h6"/>', o); },
    frame:    function (o) { return S('<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M7 4v5M17 4v5"/>', o); },
    phone:    function (o) { return S('<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>', o); },
    screen:   function (o) { return S('<path d="M4 4h16v12H4zM8 20h8M12 16v4"/>', o); },
    trophy:   function (o) { return S('<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-2.5L17 22l-1.5-8"/>', o); },
    camera:   function (o) { return S('<rect x="2" y="6" width="20" height="14" rx="3"/><circle cx="12" cy="13" r="4"/><path d="M8 6l2-3h4l2 3"/>', o); },
    code:     function (o) { return S('<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>', o); },
    pen:      function (o) { return S('<path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16z"/>', o); },
    sparkle:  function (o) { return S('<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>', o); },
    globe:    function (o) { return S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/>', o); },
    palette:  function (o) { return S('<path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-1.5-1.2-1.7-1.2-2.7 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7-9-7z"/><circle cx="7.5" cy="11.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="10" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1.1" fill="currentColor" stroke="none"/>', o); },
    grid:     function (o) { return S('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><circle cx="17.5" cy="17.5" r="3.5"/>', o); },
    book:     function (o) { return S('<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/>', o); },
    tag:      function (o) { return S('<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>', o); },
    compass:  function (o) { return S('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>', o); },

    /* social icons (filled) */
    vimeo:     function (o) { return S('<path d="M22 7.4c-.1 2.2-1.6 5.1-4.5 8.9-3 3.9-5.6 5.9-7.7 5.9-1.3 0-2.4-1.2-3.3-3.6L4.7 12c-.7-2.4-1.4-3.6-2.2-3.6-.2 0-.7.3-1.6.9L0 8.1c1-.9 2-1.8 3-2.7 1.3-1.2 2.3-1.8 3-1.8 1.6-.2 2.6.9 3 3.3.4 2.6.7 4.2.9 4.8.5 2.2 1 3.3 1.6 3.3.5 0 1.2-.7 2.1-2.2.9-1.5 1.4-2.6 1.5-3.4.1-1.3-.4-2-1.5-2-.5 0-1.1.1-1.6.4C13 4 15 1.6 17.9 1.7c2.2.1 3.3 1.6 3.1 4.4z"/>', Object.assign({ w: 15, fill: 'currentColor' }, o)); },
    instagram: function (o) { return S('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>', Object.assign({ w: 15, sw: 2 }, o)); },
    behance:   function (o) { return S('<path d="M2 5h6a3 3 0 0 1 0 6H2zM2 11h6.5a3.5 3.5 0 0 1 0 7H2zM14 13h8a4 4 0 0 0-8 0v1a4 4 0 0 0 7 2.5M15 6h6"/>', Object.assign({ w: 15, sw: 2 }, o)); },
    linkedin:  function (o) { return S('<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11.1 22 14.3V21h-4v-6c0-1.5-.03-3.4-2.07-3.4-2.07 0-2.39 1.6-2.39 3.3V21h-4z"/>', Object.assign({ w: 15, fill: 'currentColor' }, o)); },
    github:    function (o) { return S('<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/>', Object.assign({ w: 15, fill: 'currentColor' }, o)); },
    dribbble:  function (o) { return S('<circle cx="12" cy="12" r="10"/><path d="M5 7c4 4 10 4.5 14 3M3.5 14c5-1.5 9 .5 11 5M9 2.5c4 5 5.5 11 5 19"/>', Object.assign({ w: 15, sw: 2 }, o)); },
    youtube:   function (o) { return S('<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none"/>', Object.assign({ w: 15, sw: 2 }, o)); },
    x:         function (o) { return S('<path d="M3 3h4.5l4.2 5.7L16.8 3H21l-6.8 8L21 21h-4.5l-4.6-6.2L6.6 21H2.4l7.2-8.4z"/>', Object.assign({ w: 15, fill: 'currentColor' }, o)); },
    twitter:   function (o) { return ICONS.x(o); },
    mail:      function (o) { return S('<rect x="2" y="5" width="20" height="14" rx="3"/><path d="m3 7 9 6 9-6"/>', Object.assign({ w: 15, sw: 2 }, o)); },
    link:      function (o) { return S('<path d="M10 14a4 4 0 0 0 6 .5l3-3a4 4 0 0 0-6-6l-1.5 1.5M14 10a4 4 0 0 0-6-.5l-3 3a4 4 0 0 0 6 6L12.5 17"/>', Object.assign({ w: 15, sw: 2 }, o)); }
  };

  function icon(name, opts) {
    var fn = ICONS[name] || ICONS.link;
    return fn(opts || {});
  }

  /* ---------- project artwork ----------------------------------------
     Used when a project has no `image`. Pick one with `art: 'orbit'`.
     ------------------------------------------------------------------- */
  var ART = {
    bars: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 1200 525" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b2118"/><stop offset="1" stop-color="#141210"/></linearGradient></defs>' +
        '<rect width="1200" height="525" fill="url(#' + id + ')"/>' +
        '<g fill="#f0a32c"><rect class="anim a-rise" x="180" y="230" width="52" height="130" rx="10"/>' +
        '<rect class="anim a-rise d1" x="262" y="200" width="52" height="160" rx="10"/>' +
        '<rect class="anim a-rise d2" x="344" y="250" width="52" height="110" rx="10"/></g>' +
        '<g fill="none" stroke="#f7f2e9" stroke-width="2" opacity=".5">' +
        '<rect class="anim a-rise d3" x="426" y="215" width="52" height="145" rx="10"/>' +
        '<rect class="anim a-rise d4" x="508" y="245" width="52" height="115" rx="10"/></g>' +
        '<g class="anim a-slide d2"><rect x="700" y="240" width="300" height="12" rx="6" fill="#f7f2e9" opacity=".5"/>' +
        '<rect x="700" y="272" width="190" height="12" rx="6" fill="#f7f2e9" opacity=".25"/></g>' +
        '<rect x="180" y="392" width="820" height="2" rx="1" fill="#f7f2e9" opacity=".18"/></svg>';
    },
    orbit: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><radialGradient id="' + id + '" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#33271a"/><stop offset="1" stop-color="#121110"/></radialGradient></defs>' +
        '<rect width="800" height="600" fill="url(#' + id + ')"/>' +
        '<g class="anim anim--vb a-orbit" style="transform-origin:400px 300px">' +
        '<ellipse cx="400" cy="300" rx="230" ry="82" fill="none" stroke="#f7f2e9" stroke-width="1.5" opacity=".4"/>' +
        '<circle cx="630" cy="300" r="11" fill="#f0a32c"/></g>' +
        '<g class="anim anim--vb a-orbit d3" style="transform-origin:400px 300px">' +
        '<ellipse cx="400" cy="300" rx="230" ry="82" fill="none" stroke="#f7f2e9" stroke-width="1.5" opacity=".28" transform="rotate(62 400 300)"/></g>' +
        '<circle class="anim a-pulse" cx="400" cy="300" r="62" fill="#f0a32c" opacity=".9"/>' +
        '<circle cx="400" cy="300" r="30" fill="#121110" opacity=".5"/></svg>';
    },
    titles: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#221d18"/><stop offset="1" stop-color="#101010"/></linearGradient>' +
        '<linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a32c" stop-opacity="0"/>' +
        '<stop offset=".5" stop-color="#f0a32c" stop-opacity=".7"/><stop offset="1" stop-color="#f0a32c" stop-opacity="0"/></linearGradient></defs>' +
        '<rect width="800" height="600" fill="url(#' + id + ')"/>' +
        '<g fill="#f7f2e9"><rect class="anim a-blink" x="140" y="240" width="150" height="26" rx="6" opacity=".8"/>' +
        '<rect class="anim a-blink d1" x="310" y="240" width="90" height="26" rx="6" opacity=".5"/>' +
        '<rect class="anim a-blink d2" x="140" y="290" width="240" height="26" rx="6" opacity=".65"/>' +
        '<rect class="anim a-blink d3" x="140" y="340" width="120" height="26" rx="6" opacity=".35"/></g>' +
        '<rect class="anim a-scan" x="0" y="0" width="800" height="70" fill="url(#' + id + 's)"/>' +
        '<g stroke="#f7f2e9" stroke-width="1" opacity=".2"><path d="M100 180 h600M100 420 h600"/></g></svg>';
    },
    fluid: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#1f2620"/><stop offset="1" stop-color="#101210"/></linearGradient></defs>' +
        '<rect width="800" height="600" fill="url(#' + id + ')"/>' +
        '<g fill="none" stroke="#f0a32c" stroke-width="2">' +
        '<path class="anim a-morph" d="M400 170c70 0 130 58 130 130s-60 130-130 130-130-58-130-130 60-130 130-130z" opacity=".9"/>' +
        '<path class="anim a-morph d2" d="M400 210c50 0 92 40 92 90s-42 90-92 90-92-40-92-90 42-90 92-90z" opacity=".55"/>' +
        '<path class="anim a-morph d4" d="M400 250c30 0 55 22 55 50s-25 50-55 50-55-22-55-50 25-50 55-50z" opacity=".3"/></g>' +
        '<circle class="anim a-pulse d1" cx="400" cy="300" r="16" fill="#f7f2e9" opacity=".8"/></svg>';
    },
    ui: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26221c"/><stop offset="1" stop-color="#111010"/></linearGradient></defs>' +
        '<rect width="800" height="600" fill="url(#' + id + ')"/>' +
        '<rect x="290" y="90" width="220" height="420" rx="34" fill="none" stroke="#f7f2e9" stroke-width="2" opacity=".4"/>' +
        '<rect x="365" y="112" width="70" height="8" rx="4" fill="#f7f2e9" opacity=".3"/>' +
        '<g><rect class="anim a-slide" x="315" y="165" width="170" height="52" rx="14" fill="#f0a32c" opacity=".95"/>' +
        '<rect class="anim a-slide d1" x="315" y="235" width="170" height="52" rx="14" fill="#f7f2e9" opacity=".25"/>' +
        '<rect class="anim a-slide d2" x="315" y="305" width="170" height="52" rx="14" fill="#f7f2e9" opacity=".16"/>' +
        '<rect class="anim a-slide d3" x="315" y="375" width="170" height="52" rx="14" fill="#f7f2e9" opacity=".1"/></g>' +
        '<circle class="anim a-pulse d2" cx="400" cy="470" r="16" fill="#f0a32c"/></svg>';
    },
    ident: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 1200 525" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#131211"/>' +
        '<stop offset=".5" stop-color="#2e2419"/><stop offset="1" stop-color="#131211"/></linearGradient></defs>' +
        '<rect width="1200" height="525" fill="url(#' + id + ')"/>' +
        '<g class="anim anim--vb a-orbit" style="transform-origin:600px 262px">' +
        '<circle cx="600" cy="92" r="14" fill="#f0a32c"/><circle cx="600" cy="432" r="14" fill="#f7f2e9" opacity=".55"/></g>' +
        '<g class="anim anim--vb a-orbit d3" style="transform-origin:600px 262px">' +
        '<circle cx="430" cy="262" r="9" fill="#f7f2e9" opacity=".4"/><circle cx="770" cy="262" r="9" fill="#f7f2e9" opacity=".4"/></g>' +
        '<circle cx="600" cy="262" r="170" fill="none" stroke="#f7f2e9" stroke-width="1" opacity=".18"/>' +
        '<circle cx="600" cy="262" r="110" fill="none" stroke="#f7f2e9" stroke-width="1" opacity=".12"/>' +
        '<rect class="anim a-morph" x="565" y="227" width="70" height="70" rx="18" fill="#f0a32c"/></svg>';
    },

    /* --- identity / branding artwork ------------------------------------ */
    mark: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#241f19"/><stop offset="1" stop-color="#111010"/></linearGradient></defs>' +
        '<rect width="800" height="600" fill="url(#' + id + ')"/>' +
        // construction grid — the circles a mark gets drawn on
        '<g fill="none" stroke="#f7f2e9" stroke-width="1" opacity=".16">' +
        '<circle cx="400" cy="300" r="180"/><circle cx="400" cy="300" r="120"/><circle cx="400" cy="300" r="60"/>' +
        '<path d="M400 60v480M160 300h480M232 132 568 468M568 132 232 468"/></g>' +
        '<g class="anim a-morph" style="transform-origin:400px 300px">' +
        '<path d="M400 180a120 120 0 0 1 120 120H400z" fill="#f0a32c"/>' +
        '<path d="M400 300v120a120 120 0 0 1-120-120z" fill="#f7f2e9" opacity=".65"/></g>' +
        '<circle class="anim a-pulse d2" cx="400" cy="300" r="14" fill="#f0a32c"/></svg>';
    },
    palette: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#221e19"/><stop offset="1" stop-color="#101010"/></linearGradient></defs>' +
        '<rect width="800" height="600" fill="url(#' + id + ')"/>' +
        '<g><rect class="anim a-rise" x="150" y="180" width="90" height="240" rx="16" fill="#f0a32c"/>' +
        '<rect class="anim a-rise d1" x="260" y="180" width="90" height="240" rx="16" fill="#ffd28a"/>' +
        '<rect class="anim a-rise d2" x="370" y="180" width="90" height="240" rx="16" fill="#f7f2e9" opacity=".85"/>' +
        '<rect class="anim a-rise d3" x="480" y="180" width="90" height="240" rx="16" fill="#f7f2e9" opacity=".4"/>' +
        '<rect class="anim a-rise d4" x="590" y="180" width="90" height="240" rx="16" fill="none" stroke="#f7f2e9" stroke-width="2" opacity=".5"/></g>' +
        '<rect x="150" y="452" width="530" height="2" rx="1" fill="#f7f2e9" opacity=".18"/></svg>';
    },
    wordmark: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 1200 525" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#131211"/><stop offset=".5" stop-color="#2b2419"/><stop offset="1" stop-color="#131211"/></linearGradient></defs>' +
        '<rect width="1200" height="525" fill="url(#' + id + ')"/>' +
        // baseline / x-height / cap-height guides
        '<g stroke="#f7f2e9" stroke-width="1" opacity=".22"><path d="M180 170h840M180 262h840M180 355h840"/></g>' +
        '<g fill="#f7f2e9"><rect class="anim a-slide" x="300" y="200" width="120" height="155" rx="8" opacity=".9"/>' +
        '<rect class="anim a-slide d1" x="440" y="170" width="120" height="185" rx="8" opacity=".6"/>' +
        '<rect class="anim a-slide d2" x="580" y="200" width="120" height="155" rx="8" opacity=".45"/></g>' +
        '<rect class="anim a-morph d3" x="720" y="200" width="155" height="155" rx="34" fill="#f0a32c"/>' +
        '<circle class="anim a-pulse d1" cx="240" cy="355" r="10" fill="#f0a32c"/></svg>';
    },
    stationery: function (id) {
      return '<svg class="project__canvas" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
        '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26221c"/><stop offset="1" stop-color="#111010"/></linearGradient></defs>' +
        '<rect width="800" height="600" fill="url(#' + id + ')"/>' +
        '<g class="anim a-slide"><rect x="150" y="150" width="360" height="230" rx="18" fill="#f7f2e9" opacity=".9"/>' +
        '<rect x="185" y="195" width="120" height="14" rx="7" fill="#1b1815" opacity=".6"/>' +
        '<rect x="185" y="225" width="200" height="10" rx="5" fill="#1b1815" opacity=".3"/></g>' +
        '<g class="anim a-slide d2"><rect x="300" y="250" width="360" height="230" rx="18" fill="#f0a32c"/>' +
        '<rect x="335" y="295" width="150" height="16" rx="8" fill="#1b1815" opacity=".75"/>' +
        '<rect x="335" y="329" width="230" height="10" rx="5" fill="#1b1815" opacity=".35"/></g>' +
        '<circle class="anim a-pulse d3" cx="620" cy="170" r="34" fill="none" stroke="#f7f2e9" stroke-width="2" opacity=".5"/></svg>';
    }
  };

  var ART_ORDER = ['bars', 'orbit', 'titles', 'fluid', 'ui', 'ident'];

  function artFor(project, i) {
    var name = project.art && ART[project.art] ? project.art : ART_ORDER[i % ART_ORDER.length];
    return ART[name]('art' + i + '-' + name);
  }

  function personSvg(id, w, h, opts) {
    opts = opts || {};
    var hr = opts.headR || Math.round(w * 0.187);
    var hy = opts.headY || Math.round(h * 0.4);
    var bt = opts.bodyTop || Math.round(h * 0.72);
    var br = (h - bt);
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="Portrait placeholder">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="' + (opts.x2 || 0) + '" y2="1">' +
      '<stop offset="0" stop-color="#ffd28a"/><stop offset="1" stop-color="#f0a32c"/></linearGradient></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#' + id + ')"/>' +
      '<circle cx="' + (w / 2) + '" cy="' + hy + '" r="' + hr + '" fill="#1b1815" opacity=".9"/>' +
      '<path d="M' + (w / 2 - br) + ' ' + h + 'c0-' + Math.round(br * 0.55) + ' ' + Math.round(br * 0.45) + '-' + br + ' ' + br + '-' + br +
      's' + br + ' ' + Math.round(br * 0.45) + ' ' + br + ' ' + br + 'z" fill="#1b1815" opacity=".9"/>' +
      '<circle cx="' + (w / 2) + '" cy="' + hy + '" r="' + hr + '" fill="none" stroke="#fff" stroke-width="2" opacity=".25"/></svg>';
  }

  // The built-in artwork is always drawn; a photo, when you set one, sits on
  // top of it. If the file is missing the <img> removes itself and the
  // artwork shows through — so you can point at a filename before it exists.
  function media(image, alt, fallback) {
    if (!image) return fallback;
    return fallback +
      '<img class="media-photo" src="' + esc(image) + '" alt="' + esc(alt) + '"' +
      ' loading="lazy" decoding="async" onerror="this.remove()">';
  }

  var P = D.profile || {};
  var MARK = P.initials || initials(P.name);
  var MAILTO = 'mailto:' + (P.email || '');

  /* ================================================================== *
   * <head> + document chrome
   * ================================================================== */
  function renderHead() {
    var m = D.meta || {};
    var title = m.title || (P.name + ' — ' + P.role);
    document.title = title;

    function meta(sel, val) {
      var el = $(sel);
      if (el && val) el.setAttribute('content', val);
    }
    meta('meta[name="description"]', m.description);
    meta('meta[property="og:title"]', m.ogTitle || title);
    meta('meta[property="og:description"]', m.ogDescription || m.description);
    meta('meta[property="og:image"]', m.ogImage);
    if (m.url) meta('meta[property="og:url"]', m.url);
    if (m.favicon) { var f = $('link[rel="icon"]'); if (f) f.setAttribute('href', m.favicon); }
    if (m.lang) document.documentElement.setAttribute('lang', m.lang);
  }

  function renderChrome() {
    fill('#preloader .preloader__inner',
      '<span>' + esc(P.name) + '</span><span class="preloader__count" id="preloaderCount">000</span>');

    var brand = '<span class="brand__mark" aria-hidden="true">' + esc(MARK) + '</span>' + esc(P.name);
    $$('[data-brand]').forEach(function (el) {
      el.innerHTML = brand;
      el.setAttribute('aria-label', P.name + ' — home');
    });

    var nav = (D.nav || []);
    fill('#navDesktop', nav.map(function (n) {
      return '<a href="' + esc(n.href) + '">' + esc(n.label) + '</a>';
    }).join(''));

    fill('#menuList', nav.map(function (n) {
      return '<li><a href="' + esc(n.href) + '">' + esc(n.label) + ' <span aria-hidden="true">→</span></a></li>';
    }).join(''));

    fill('#menuFoot', '<span>' + esc(P.email) + '</span><span>' + esc(P.location) + '</span>');

    var cta = (D.header && D.header.cta) || { label: "Let's Talk", href: '#contact' };
    fill('#headerCta', esc(cta.label) + '<span class="btn__ico" aria-hidden="true">' + icon('arrow') + '</span>');
    var ctaEl = $('#headerCta');
    if (ctaEl) ctaEl.setAttribute('href', cta.href);
  }

  /* ================================================================== *
   * Hero
   * ================================================================== */
  function renderHero() {
    var h = D.hero || {};

    fill('#heroChip', '<span class="chip__ico" aria-hidden="true">' + icon(h.chipIcon || 'star') + '</span>' + esc(h.chip));
    fill('#heroName', rich(h.heading || ("I'm *" + P.name + '*')));
    fill('#heroRole', esc(h.intro || ''));

    // The floats and the seal are absolutely positioned inside .hero__stage,
    // so they must be direct children of it — no wrapper element.
    var stage = (h.floats || []).slice(0, 4).map(function (f, i) {
      return '<span class="float float--' + 'abcd'.charAt(i) + '" aria-hidden="true">' +
        '<span class="float__dot"></span>' + esc(f) + '</span>';
    }).join('');

    if (h.seal) {
      stage += '<span class="seal" aria-hidden="true">' +
        '<svg class="seal__ring" viewBox="0 0 120 120"><defs>' +
        '<path id="sealPath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/></defs>' +
        '<text><textPath href="#sealPath">' + esc(h.seal) + ' · </textPath></text></svg>' +
        '<span class="seal__core">' + icon(h.sealIcon || 'star', { w: 18 }) + '</span></span>';
    }

    stage += '<div class="portrait">' + media(h.image, P.name, personSvg('pg', 460, 480)) + '</div>';
    fill('#heroStage', stage);

    fill('#heroActions', (h.buttons || []).map(function (b) {
      return '<a class="btn' + (b.dark ? ' btn--dark' : '') + '" href="' + esc(b.href) + '"' +
        (b.download ? ' download' : '') + '>' + esc(b.label) +
        '<span class="btn__ico" aria-hidden="true">' + icon(b.icon || 'arrow') + '</span></a>';
    }).join(''));

    var socials = D.socials || [];
    fill('#heroSocials',
      '<span>' + esc(h.socialsLabel || 'Follow me on') + '</span>' +
      socials.map(function (s) {
        return '<a class="icon-btn" href="' + esc(s.href) + '" aria-label="' + esc(s.label) + '"' +
          (/^https?:/.test(s.href) ? ' target="_blank" rel="noopener"' : '') + '>' +
          icon(s.icon || slug(s.label)) + '</a>';
      }).join(''));

    var r = h.reviews;
    var reviewsEl = $('#heroReviews');
    if (reviewsEl) {
      if (r) {
        var faces = (r.faces && r.faces.length ? r.faces
          : (D.testimonials && D.testimonials.items || []).slice(0, 3).map(function (t) {
            return t.initials || initials(t.name);
          }));
        fill('#heroReviews',
          '<span class="reviews__faces" aria-hidden="true">' +
          faces.map(function (f) { return '<span class="reviews__face">' + esc(f) + '</span>'; }).join('') +
          '</span><span class="reviews__meta"><b>' + esc(r.count) + '</b>' +
          // Stars only appear if you actually quote a rating.
          (r.rating ? '<span class="stars" aria-hidden="true">★★★★★</span>' : '') +
          '<span>' + esc(r.rating ? r.rating + ' — ' + r.note : r.note) + '</span></span>');
      } else {
        reviewsEl.remove();
      }
    }
  }

  /* ================================================================== *
   * Section heading helper
   * ================================================================== */
  function head(sec, opts) {
    opts = opts || {};
    var out = '<div>';
    if (sec.chip) {
      out += '<p class="chip" data-reveal><span class="chip__ico" aria-hidden="true">' +
        icon(sec.chipIcon || 'dot') + '</span>' + esc(sec.chip) + '</p>';
    }
    out += '<h2 class="sec-title" data-reveal style="--delay:60ms">' + rich(sec.title) + '</h2></div>';
    if (sec.intro && !opts.noIntro) {
      out += '<p data-reveal style="--delay:120ms">' + esc(sec.intro) + '</p>';
    }
    return out;
  }

  /* ================================================================== *
   * Sections
   * ================================================================== */
  function renderReel() {
    var r = D.reel;
    var sec = $('#reel');
    if (!sec) return;
    if (!r) { sec.remove(); return; }

    fill('#reelHead', head(r));

    var btn = $('#reelBtn');
    if (btn) {
      btn.setAttribute('aria-label', 'Play ' + (r.chip || 'showreel'));
      if (r.embed) btn.setAttribute('data-embed', r.embed);
      
      // Extract video ID from YouTube embed URL and generate thumbnail
      if (r.embed) {
        var videoIdMatch = r.embed.match(/\/embed\/([^?]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
          var videoId = videoIdMatch[1];
          var thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
          
          var svg = btn.querySelector('.reel__bg');
          if (svg) svg.remove();
          var img = document.createElement('img');
          img.src = thumbnailUrl;
          img.style.cssText = 'width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;z-index:1;';
          img.setAttribute('alt', '');
          img.setAttribute('aria-hidden', 'true');
          btn.insertBefore(img, btn.firstChild);
        }
      }
    }
    fill('#reelMeta', (r.meta || []).map(function (m) { return '<span>' + esc(m) + '</span>'; }).join(''));

    var modal = $('#reelModal');
    if (modal) modal.setAttribute('aria-label', r.chip || 'Showreel');
    if (!r.embed) {
      fill('#reelFrame', '<p style="font-size:var(--t-sm);font-weight:600">Add your reel URL in content.js → reel.embed</p>');
    }
  }

  function renderMarquee() {
    var items = D.marquee || [];
    var el = $('.marquee');
    if (!el) return;
    if (!items.length) { el.remove(); return; }
    fill('#marqueeTrack', items.map(function (m) {
      return '<span class="marquee__item">' + esc(m) + '</span>';
    }).join(''));
  }

  function renderWork() {
    var w = D.work;
    var sec = $('#work');
    if (!sec) return;
    if (!w || !(w.projects || []).length) { sec.remove(); return; }

    fill('#workHead', head(w, { noIntro: true }) +
      '<div class="filters" role="group" aria-label="Filter projects" id="filters">' +
      filtersHtml(w) + '</div>');

    fill('#workGrid', (w.projects || []).map(function (p, i) {
      var cat = slug(p.category || 'work');
      var label = (p.name || '') + (p.meta ? ', ' + p.meta : '') + ' — view project';
      return '<article class="project' + (p.wide ? ' project--wide' : '') + '" data-cat="' + esc(cat) + '" data-reveal' +
        (i % 3 === 2 ? ' style="--delay:80ms"' : '') + '>' +
        '<a class="project__media" href="' + esc(p.href || '#work') + '" aria-label="' + esc(label) + '"' +
        (/^https?:/.test(p.href || '') ? ' target="_blank" rel="noopener"' : '') + '>' +
        media(p.image, p.name, artFor(p, i)) +
        '<span class="project__cta" aria-hidden="true">' + esc(p.cta || 'Watch') + icon('arrow', { w: 10 }) + '</span></a>' +
        '<div class="project__info"><h3 class="project__name">' + esc(p.name) + '</h3>' +
        '<span class="project__cat">' + esc(p.meta || p.category) + '</span></div></article>';
    }).join(''));
  }

  // Filters come from the projects' own categories — no second list to maintain.
  function filtersHtml(w) {
    var seen = [];
    (w.projects || []).forEach(function (p) {
      var c = p.category || 'Work';
      if (seen.indexOf(c) === -1) seen.push(c);
    });
    var all = '<button class="filter" type="button" data-filter="all" aria-pressed="true">' +
      esc(w.allLabel || 'All') + '</button>';
    return all + seen.map(function (c) {
      return '<button class="filter" type="button" data-filter="' + esc(slug(c)) + '" aria-pressed="false">' +
        esc(c) + '</button>';
    }).join('');
  }

  /* Brand identity systems — mark, palette and type pairing per client. */
  function renderIdentity() {
    var b = D.identity;
    var sec = $('#identity');
    if (!sec) return;
    if (!b || !(b.items || []).length) { sec.remove(); return; }

    fill('#identityHead', head(b));

    fill('#identityGrid', b.items.map(function (it, i) {
      var palette = (it.palette || []).map(function (hex) {
        return '<span class="swatch" style="background:' + esc(hex) + '" data-hex="' + esc(hex) + '"></span>';
      }).join('');

      var mono = media(it.image, it.name + ' identity',
        '<span class="brand-card__grid" aria-hidden="true"></span>' +
        '<span class="brand-card__mono">' + esc(it.monogram || initials(it.name)) + '</span>');

      return '<article class="card card--hover brand-card" data-reveal' + delay(i, 60) + '>' +
        '<div class="brand-card__mark" style="--mark-bg:' + esc(it.color || '#1b1815') +
        ';--mark-fg:' + esc(it.markColor || '#f7f2e9') + '">' + mono + '</div>' +
        '<div class="brand-card__body">' +
        '<div class="brand-card__head"><h3 class="brand-card__name">' + esc(it.name) + '</h3>' +
        '<span class="brand-card__year">' + esc(it.year || '') + '</span></div>' +
        (it.scope ? '<p class="brand-card__scope">' + esc(it.scope) + '</p>' : '') +
        (palette ? '<div class="swatches" role="img" aria-label="Palette: ' +
          esc((it.palette || []).join(', ')) + '">' + palette + '</div>' : '') +
        (it.note ? '<p class="brand-card__note">' + esc(it.note) + '</p>' : '') +
        (it.type ? '<p class="brand-card__type"><b>' + esc(it.type) + '</b>' +
          (it.typeNote ? '<span>' + esc(it.typeNote) + '</span>' : '') + '</p>' : '') +
        // `href` is optional — add one and the card gets a link out to the case study.
        (it.href ? '<p class="brand-card__link"><a class="link-u" href="' + esc(it.href) + '"' +
          (/^https?:/.test(it.href) ? ' target="_blank" rel="noopener"' : '') + '>' +
          esc(it.linkLabel || 'View project') +
          '<span aria-hidden="true">' + icon('arrow', { w: 10 }) + '</span></a></p>' : '') +
        '</div></article>';
    }).join(''));

    fill('#identityDeliverables', (b.deliverables || []).map(function (d) {
      return '<span class="tag">' + esc(d) + '</span>';
    }).join(''));
  }

  function renderAbout() {
    var a = D.about;
    var sec = $('#about');
    if (!sec) return;
    if (!a) { sec.remove(); return; }

    fill('#aboutMedia', media(a.image, P.name, personSvg('ag', 400, 440, { x2: 1 })) +
      (a.badge ? '<span class="about__badge"><span class="ico-sq ico-sq--accent" style="width:38px;height:38px" aria-hidden="true">' +
        icon(a.badge.icon || 'star', { w: 16 }) + '</span><span><b>' + esc(a.badge.title) + '</b><br>' +
        esc(a.badge.note) + '</span></span>' : ''));

    var body = '<p class="chip" data-reveal><span class="chip__ico" aria-hidden="true">' +
      icon(a.chipIcon || 'dot') + '</span>' + esc(a.chip) + '</p>' +
      '<h2 class="sec-title" data-reveal style="--delay:60ms">' + rich(a.title) + '</h2>';

    body += (a.paragraphs || []).map(function (p, i) {
      return '<p data-reveal style="--delay:' + (120 + i * 40) + 'ms' + (i === 0 ? ';color:var(--fg-2)' : '') + '">' +
        esc(p) + '</p>';
    }).join('');

    if (a.signature) body += '<p class="about__sign" data-reveal style="--delay:200ms">' + esc(a.signature) + '</p>';

    if ((a.stats || []).length) {
      body += '<dl class="stats">' + a.stats.map(function (s, i) {
        return '<div class="stat" data-reveal' + delay(i, 80) + '>' +
          '<dd class="stat__num" data-count="' + esc(s.value) + '"' +
          (s.suffix ? ' data-suffix="' + esc(s.suffix) + '"' : '') + '>0</dd>' +
          '<dt class="stat__label">' + esc(s.label) + '</dt></div>';
      }).join('') + '</dl>';
    }

    if (a.button) {
      body += '<p data-reveal style="--delay:220ms;margin-top:1.75rem">' +
        '<a class="btn btn--dark" href="' + esc(a.button.href) + '"' + (a.button.download ? ' download' : '') + '>' +
        esc(a.button.label) + '<span class="btn__ico" aria-hidden="true">' +
        icon(a.button.icon || 'download') + '</span></a></p>';
    }

    fill('#aboutBody', body);
  }

  function renderTools() {
    var t = D.tools;
    var sec = $('#tools');
    if (!sec) return;
    if (!t || !(t.items || []).length) { sec.remove(); return; }

    fill('#toolsHead', head(t));
    fill('#toolsGrid', t.items.map(function (item, i) {
      return '<div class="tool" data-reveal' + delay(i, 60) + '>' +
        '<span class="tool__ico" style="background:' + esc(item.color || '#1a1a1a') + '" aria-hidden="true">' +
        esc(item.abbr || initials(item.name)) + '</span>' +
        '<span><span class="tool__name">' + esc(item.name) + '</span><br>' +
        '<span class="tool__note">' + esc(item.note || '') + '</span></span></div>';
    }).join(''));
  }

  function renderServices() {
    var s = D.services;
    var sec = $('#services');
    if (!sec) return;
    if (!s || !(s.items || []).length) { sec.remove(); return; }

    fill('#servicesHead', head(s));
    fill('#servicesList', s.items.map(function (item, i) {
      var id = 'svc-' + (i + 1);
      return '<div class="service">' +
        '<button class="service__btn" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        '<span class="service__idx">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="ico-sq" aria-hidden="true">' + icon(item.icon || 'layers', { w: 20 }) + '</span>' +
        '<span class="service__name">' + esc(item.name) + '</span>' +
        '<span class="service__toggle" aria-hidden="true">' +
        '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">' +
        '<path d="M6 1v10M1 6h10"/></svg></span></button>' +
        '<div class="service__panel" id="' + id + '"><div><div class="service__content">' +
        '<p>' + esc(item.text) + '</p>' +
        ((item.tags || []).length ? '<div class="tags">' + item.tags.map(function (tg) {
          return '<span class="tag">' + esc(tg) + '</span>';
        }).join('') + '</div>' : '') +
        '</div></div></div></div>';
    }).join(''));
  }

  function renderJourney() {
    var j = D.journey;
    var sec = $('#journey');
    if (!sec) return;
    if (!j || !(j.items || []).length) { sec.remove(); return; }

    fill('#journeyHead', head(j));
    fill('#journeyGrid', j.items.map(function (item, i) {
      return '<article class="card card--hover" data-reveal' + delay(i, 60) + '>' +
        '<span class="jrn__when">' + esc(item.when) + '</span>' +
        '<h3 class="jrn__role">' + esc(item.role) + '</h3>' +
        '<p class="jrn__where">' + esc(item.where) + '</p>' +
        '<p class="jrn__desc">' + esc(item.text) + '</p></article>';
    }).join(''));
  }

  function renderAwards() {
    var a = D.awards;
    var sec = $('#awards');
    if (!sec) return;
    if (!a || !(a.items || []).length) { sec.remove(); return; }

    fill('#awardsHead', head(a));
    fill('#awardsGrid', a.items.map(function (item, i) {
      return '<article class="card card--hover award" data-reveal' + delay(i, 60) + '>' +
        '<div class="award__top"><span class="ico-sq ico-sq--accent" aria-hidden="true">' +
        icon(item.icon || 'trophy', { w: 20 }) + '</span><div>' +
        '<span class="award__year">' + esc(item.year) + '</span>' +
        '<h3 class="award__name">' + esc(item.name) + '</h3></div></div>' +
        '<p>' + rich(item.text) + '</p></article>';
    }).join(''));
  }

  function renderProcess() {
    var p = D.process;
    var sec = $('#process');
    if (!sec) return;
    if (!p || !(p.steps || []).length) { sec.remove(); return; }

    fill('#processHead', head(p));
    fill('#processGrid', p.steps.map(function (s, i) {
      return '<article class="card card--hover" data-reveal' + delay(i, 60) + '>' +
        '<span class="step__num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<h3 class="step__title">' + esc(s.title) + '</h3><p class="step__text">' + esc(s.text) + '</p></article>';
    }).join(''));
  }

  function renderTestimonials() {
    var t = D.testimonials;
    var sec = $('#words');
    if (!sec) return;
    if (!t || !(t.items || []).length) { sec.remove(); return; }

    fill('#wordsHead',
      '<p class="chip" data-reveal><span class="chip__ico" aria-hidden="true">' +
      icon(t.chipIcon || 'star') + '</span>' + esc(t.chip) + '</p>' +
      '<h2 class="sec-title" data-reveal style="--delay:60ms">' + rich(t.title) + '</h2>' +
      (t.intro ? '<p data-reveal style="--delay:120ms;margin-top:1rem;color:var(--fg-2)">' + esc(t.intro) + '</p>' : ''));

    fill('#quotes', t.items.map(function (q, i) {
      return '<blockquote class="quote' + (i === 0 ? ' is-active' : '') + '" data-quote>' +
        '<span class="quote__mark" aria-hidden="true">"</span>' +
        '<p class="quote__text">' + esc(q.text) + '</p>' +
        '<div class="quote__who"><span class="quote__avatar" aria-hidden="true">' +
        esc(q.initials || initials(q.name)) + '</span><div>' +
        '<div class="quote__name">' + esc(q.name) + '</div>' +
        '<div class="quote__role">' + esc(q.role) + '</div></div></div></blockquote>';
    }).join('') +
      '<div class="quotes__nav" role="tablist" aria-label="Testimonials">' +
      t.items.map(function (q, i) {
        return '<button class="quotes__dot" type="button" role="tab" aria-selected="' + (i === 0) +
          '" aria-label="Testimonial ' + (i + 1) + '"></button>';
      }).join('') + '</div>');
  }

  function renderCta() {
    var c = D.cta;
    var sec = $('#contact');
    if (!sec) return;
    if (!c) { sec.remove(); return; }

    fill('#ctaBody',
      (c.chip ? '<p class="chip" data-reveal style="border-color:rgba(247,242,233,.22);background:transparent;color:#f7f2e9">' +
        '<span class="chip__ico" aria-hidden="true">' + icon(c.chipIcon || 'dot') + '</span>' + esc(c.chip) + '</p>' : '') +
      '<h2 class="cta__title" data-reveal style="--delay:60ms">' + rich(c.title) + '</h2>' +
      '<p data-reveal style="--delay:100ms;margin-top:0">' + esc(c.text) + '</p>' +
      '<p data-reveal style="--delay:140ms;margin-top:2rem">' +
      '<a class="btn" href="' + esc(c.buttonHref || MAILTO) + '">' + esc(c.buttonLabel || P.email) +
      '<span class="btn__ico" aria-hidden="true">' + icon('arrow') + '</span></a></p>');
  }

  function renderFooter() {
    var f = D.footer || {};

    fill('#footerBlurb', esc(f.blurb || ''));

    var grid = $('.footer__grid');
    var cols = f.columns || [];
    if (grid) grid.insertAdjacentHTML('beforeend', cols.map(function (col) {
      // `from: 'nav' | 'socials' | 'contact'` reuses what you wrote further up,
      // so an email or a link is never typed twice.
      var items = col.items;
      if (col.from === 'nav') items = D.nav || [];
      if (col.from === 'socials') items = D.socials || [];
      if (col.from === 'contact') {
        items = [{ label: P.email, href: MAILTO }, P.location].concat(col.items || []);
      }
      return '<div><h2 class="footer__title">' + esc(col.title) + '</h2><ul class="footer__list">' +
        (items || []).map(function (it) {
          if (typeof it === 'string') return '<li>' + esc(it) + '</li>';
          return '<li><a class="link-u" href="' + esc(it.href) + '"' +
            (/^https?:/.test(it.href) ? ' target="_blank" rel="noopener"' : '') + '>' +
            esc(it.label) + '</a></li>';
        }).join('') + '</ul></div>';
    }).join(''));

    fill('#footerNote', '&copy; <span id="year">' + new Date().getFullYear() + '</span> ' +
      esc(P.name) + (f.note ? ' — ' + esc(f.note) : ''));
  }

  /* ================================================================== *
   * Boot — every renderer fails soft so one typo can't blank the page.
   * ================================================================== */
  [renderHead, renderChrome, renderHero, renderReel, renderMarquee, renderWork,
   renderIdentity, renderAbout, renderTools, renderServices, renderJourney,
   renderAwards, renderProcess, renderTestimonials, renderCta,
   renderFooter].forEach(function (fn) {
    try { fn(); } catch (err) {
      if (window.console) console.error('[render]', fn.name, err);
    }
  });
})();
