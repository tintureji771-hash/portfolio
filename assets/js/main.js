/* ==========================================================================
   Unfold — interaction layer
   Vanilla ES2020. No dependencies. Every module fails soft.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ *
   * Preloader — counts to 100, then reveals the page.
   * ------------------------------------------------------------------ */
  function initPreloader() {
    var el = $('#preloader');
    if (!el) return;

    var countEl = $('#preloaderCount');
    var barEl = $('#preloaderBar');

    function finish() {
      el.classList.add('is-done');
      document.body.classList.remove('is-locked');
      window.setTimeout(function () { el.remove(); }, 700);
    }

    if (reduceMotion) { finish(); return; }

    document.body.classList.add('is-locked');
    var n = 0;
    var timer = window.setInterval(function () {
      n = Math.min(100, n + Math.ceil(Math.random() * 7));
      if (countEl) countEl.textContent = String(n).padStart(3, '0');
      if (barEl) barEl.style.width = n + '%';
      if (n >= 100) {
        window.clearInterval(timer);
        window.setTimeout(finish, 300);
      }
    }, 45);

    // Safety net: never trap the page behind the loader.
    window.setTimeout(function () {
      window.clearInterval(timer);
      finish();
    }, 4000);
  }

  /* ------------------------------------------------------------------ *
   * Theme toggle — persists to localStorage, honours OS preference.
   * ------------------------------------------------------------------ */
  var SUN = 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7 1.4-1.4M4.9 19.1l1.4-1.4m11.4 0 1.4 1.4M4.9 4.9l1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z';
  var MOON = 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z';

  function initTheme() {
    var root = document.documentElement;
    var btn = $('#themeToggle');
    var icon = $('#themeIcon');

    var stored = null;
    try { stored = localStorage.getItem('unfold-theme'); } catch (e) { /* private mode */ }

    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    apply(stored || (prefersLight ? 'light' : 'dark'));

    function apply(theme) {
      root.setAttribute('data-theme', theme);
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', theme === 'light' ? '#f2efe9' : '#0b0b0c');
      if (icon) icon.querySelector('path').setAttribute('d', theme === 'light' ? SUN : MOON);
      if (btn) {
        btn.setAttribute('aria-label',
          'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme');
      }
    }

    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      try { localStorage.setItem('unfold-theme', next); } catch (e) { /* ignore */ }
    });
  }

  /* ------------------------------------------------------------------ *
   * Header — hide on scroll down, show on scroll up, solidify past hero.
   * ------------------------------------------------------------------ */
  function initHeader() {
    var header = $('#header');
    if (!header) return;

    var last = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      header.classList.toggle('is-stuck', y > 40);
      // Only hide once well past the fold, and never while the menu is open.
      var menuOpen = document.body.classList.contains('is-locked');
      header.classList.toggle('is-hidden', !menuOpen && y > 400 && y > last);
      last = y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------ *
   * Scroll progress bar
   * ------------------------------------------------------------------ */
  function initProgress() {
    var bar = $('#progress');
    if (!bar) return;
    var ticking = false;

    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------ *
   * Mobile menu
   * ------------------------------------------------------------------ */
  function initMenu() {
    var burger = $('#burger');
    var menu = $('#menu');
    if (!burger || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('is-locked', open);
    }

    burger.addEventListener('click', function () {
      setOpen(!menu.classList.contains('is-open'));
    });

    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        burger.focus();
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Scroll reveal
   * ------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('[data-reveal]');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ *
   * Animated stat counters
   * ------------------------------------------------------------------ */
  function initCounters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;

    function render(el, value) {
      var suffix = el.getAttribute('data-suffix');
      el.textContent = String(value);
      if (suffix) {
        var sup = document.createElement('sup');
        sup.textContent = suffix;
        el.appendChild(sup);
      }
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      nums.forEach(function (el) { render(el, parseInt(el.getAttribute('data-count'), 10) || 0); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);

        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        var start = performance.now();
        var dur = 1400;

        (function tick(now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          render(el, Math.round(target * eased));
          if (t < 1) window.requestAnimationFrame(tick);
        })(start);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------------ *
   * Marquee — duplicate the track so the CSS -100% loop is seamless.
   * ------------------------------------------------------------------ */
  function initMarquee() {
    $$('[data-marquee]').forEach(function (track) {
      var parent = track.parentNode;

      function fill() {
        // Drop previous clones so a resize recomputes from the original.
        $$('[data-marquee-clone]', parent).forEach(function (c) { c.remove(); });

        var unit = track.getBoundingClientRect().width;
        if (!unit) return;

        // The CSS loop translates one track width, so we need at least one
        // clone — and enough total width to cover the viewport at all times.
        var copies = Math.max(1, Math.ceil(window.innerWidth / unit) + 1);
        for (var i = 0; i < copies; i++) {
          var clone = track.cloneNode(true);
          clone.removeAttribute('data-marquee');
          clone.setAttribute('data-marquee-clone', '');
          clone.setAttribute('aria-hidden', 'true');
          parent.appendChild(clone);
        }
      }

      fill();

      var t = null;
      window.addEventListener('resize', function () {
        window.clearTimeout(t);
        t = window.setTimeout(fill, 200);
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Services accordion — one panel open at a time.
   * ------------------------------------------------------------------ */
  function initServices() {
    var buttons = $$('.service__btn');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.service');
        var isOpen = item.classList.contains('is-open');

        buttons.forEach(function (other) {
          other.closest('.service').classList.remove('is-open');
          other.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Open the first one so the section doesn't read as inert.
    buttons[0].click();
  }

  /* ------------------------------------------------------------------ *
   * Work filter
   * ------------------------------------------------------------------ */
  function initFilters() {
    var filters = $$('.filter');
    var projects = $$('#workGrid .project');
    if (!filters.length || !projects.length) return;

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter');

        filters.forEach(function (f) {
          f.setAttribute('aria-pressed', String(f === btn));
        });

        projects.forEach(function (p) {
          var match = cat === 'all' || p.getAttribute('data-cat') === cat;
          p.classList.toggle('is-filtered', !match);
        });
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Testimonial rotator — autoplay, pauses on hover/focus.
   * ------------------------------------------------------------------ */
  function initQuotes() {
    var wrap = $('#quotes');
    if (!wrap) return;

    var quotes = $$('[data-quote]', wrap);
    var dots = $$('.quotes__dot', wrap);
    if (quotes.length < 2) return;

    var index = 0;
    var timer = null;

    function show(i) {
      index = (i + quotes.length) % quotes.length;
      quotes.forEach(function (q, n) { q.classList.toggle('is-active', n === index); });
      dots.forEach(function (d, n) { d.setAttribute('aria-selected', String(n === index)); });
    }

    function play() {
      if (reduceMotion) return;
      stop();
      timer = window.setInterval(function () { show(index + 1); }, 6000);
    }
    function stop() { if (timer) { window.clearInterval(timer); timer = null; } }

    dots.forEach(function (dot, n) {
      dot.addEventListener('click', function () { show(n); play(); });
    });

    wrap.addEventListener('mouseenter', stop);
    wrap.addEventListener('mouseleave', play);
    wrap.addEventListener('focusin', stop);
    wrap.addEventListener('focusout', play);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else play();
    });

    show(0);
    play();
  }

  /* ------------------------------------------------------------------ *
   * Toolkit bars — fill on first scroll into view.
   * ------------------------------------------------------------------ */
  function initToolkit() {
    var fills = $$('[data-fill]');
    if (!fills.length) return;

    function set(el) { el.style.width = (parseInt(el.getAttribute('data-fill'), 10) || 0) + '%'; }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      fills.forEach(set);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        set(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    fills.forEach(function (el, i) {
      el.style.setProperty('--delay', (i * 70) + 'ms');
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------ *
   * Showreel modal — focus-trapped, Escape to close, embed injected on
   * open and torn down on close so the video can't keep playing.
   * ------------------------------------------------------------------ */
  function initReel() {
    var trigger = $('#reelBtn');
    var modal = $('#reelModal');
    var frame = $('#reelFrame');
    var closeBtn = $('#reelClose');
    if (!trigger || !modal || !frame) return;

    var placeholder = frame.innerHTML;
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;

      // Set data-embed on #reelBtn to a video URL and it gets embedded here.
      var src = trigger.getAttribute('data-embed');
      if (src) {
        frame.innerHTML = '';
        var node;
        if (/\.(mp4|webm|mov)(\?|$)/i.test(src)) {
          node = document.createElement('video');
          node.src = src;
          node.controls = true;
          node.autoplay = true;
          node.playsInline = true;
        } else {
          node = document.createElement('iframe');
          node.src = src;
          node.allow = 'autoplay; fullscreen; picture-in-picture';
          node.setAttribute('allowfullscreen', '');
          node.title = 'Showreel 2026';
        }
        frame.appendChild(node);
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-locked');
      // Restore the placeholder — this also stops playback.
      window.setTimeout(function () { frame.innerHTML = placeholder; }, 400);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    trigger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    // Click the backdrop (but not the video) to dismiss.
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('is-open')) return;

      if (e.key === 'Escape') { close(); return; }

      // Keep focus inside the dialog while it's open.
      if (e.key === 'Tab') {
        var focusable = $$('button, a[href], iframe, video, [tabindex]:not([tabindex="-1"])', modal);
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * Custom cursor — pointer devices only, lerped for weight.
   * ------------------------------------------------------------------ */
  function initCursor() {
    var dot = $('#cursor');
    if (!dot) return;
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var tx = 0, ty = 0, cx = 0, cy = 0;
    var shown = false;

    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { cx = tx; cy = ty; shown = true; dot.classList.add('is-active'); }
    }, { passive: true });

    (function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      // translate(-50%,-50%) keeps it centred without reading layout each frame.
      dot.style.transform =
        'translate3d(' + cx + 'px,' + cy + 'px,0) translate(-50%,-50%)';
      window.requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      var interactive = t && t.closest && t.closest('a, button, [role="tab"], .project__media');
      dot.classList.toggle('is-hover', !!interactive);
    });
  }

  /* ------------------------------------------------------------------ *
   * Active nav link based on section in view
   * ------------------------------------------------------------------ */
  function initScrollSpy() {
    var links = $$('.nav--desktop a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);
    if (!sections.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ------------------------------------------------------------------ *
   * Boot
   * ------------------------------------------------------------------ */
  function boot() {
    var yearEl = $('#year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    [initPreloader, initTheme, initHeader, initProgress, initMenu, initReveal,
     initCounters, initMarquee, initServices, initFilters, initQuotes,
     initToolkit, initReel, initCursor, initScrollSpy].forEach(function (fn) {
      try { fn(); } catch (err) {
        // One broken module must never take the page down.
        if (window.console) console.error('[unfold]', fn.name, err);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
