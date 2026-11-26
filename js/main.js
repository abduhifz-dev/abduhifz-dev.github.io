/* Portfolio behaviour: renders projects from js/data.js, index filtering,
   case-study dialog with deep links (?p=<id>), command palette (Ctrl/⌘ K),
   theme, scroll effects and the mailto contact form. No dependencies. */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) return;
  var P = D.projects;
  var byId = {};
  P.forEach(function (p, i) { p._i = i; byId[p.id] = p; });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function two(n) { return n < 10 ? "0" + n : String(n); }
  function statusLabel(p) { return p.statusText || D.statuses[p.status] || p.status; }
  function domainLabel(id) { return (D.domains[id] || {}).label || id; }
  function shortTitle(p) {
    if (p.short) return p.short;
    var m = /^CorePilot\s+(.+)$/.exec(p.title);
    return m && m[1].length > 3 ? m[1] : p.title;
  }
  function statusHTML(p) { return '<span class="status s-' + esc(p.status) + '">' + esc(statusLabel(p)) + "</span>"; }
  function tagsHTML(list) { return '<ul class="tags">' + list.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; }

  /* ================================================================ toast */
  var toastEl = $("#toast"), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ================================================================ theme */
  var themeBtn = $("#theme-toggle");
  function syncThemeUI() {
    var t = document.documentElement.getAttribute("data-theme");
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0b0c0e" : "#f3f1ea");
  }
  function toggleTheme() {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeUI();
    document.dispatchEvent(new Event("themechange"));
  }
  themeBtn.addEventListener("click", toggleTheme);
  syncThemeUI();

  /* =============================================================== motifs */
  var MOTIFS = {
    code:
      '<svg viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">' +
      '<rect x="20" y="8" width="200" height="134" rx="10"/><path d="M20 28h200"/>' +
      '<circle cx="33" cy="18" r="2.6"/><circle cx="43" cy="18" r="2.6"/><circle cx="53" cy="18" r="2.6"/>' +
      '<path d="M36 44h26M70 44h58M136 44h22"/>' +
      '<rect x="28" y="53" width="184" height="13" rx="3" fill="currentColor" opacity=".1" stroke="none"/><path d="M35 59.5h6M50 59.5h44M102 59.5h50"/>' +
      '<rect class="af" x="28" y="70" width="184" height="13" rx="3" opacity=".16" stroke="none"/><path class="a" d="M35 76.5h6M38 73.5v6M50 76.5h30M88 76.5h64M160 76.5h20"/>' +
      '<rect class="af" x="28" y="87" width="184" height="13" rx="3" opacity=".16" stroke="none"/><path class="a" d="M35 93.5h6M38 90.5v6M50 93.5h52"/><path class="a m-blink" d="M108 88.5v10"/>' +
      '<path d="M36 110h40M84 110h30"/>' +
      '<rect class="a" x="150" y="118" width="58" height="16" rx="8"/><path class="a" d="M164 126l3.5 3.5 6.5-7"/><path class="a" d="M180 126h18"/>' +
      '</svg>',
    neural: (function () {
      var L = [[40, [30, 60, 90, 120]], [120, [20, 47.5, 75, 102.5, 130]], [200, [45, 75, 105]]];
      var s = '<svg viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">';
      var hot = { "0-1": 1, "1-2": 1, "3-3": 1, "2-1": 1 };
      for (var a = 0; a < 2; a++) {
        L[a][1].forEach(function (y1, i) {
          L[a + 1][1].forEach(function (y2, j) {
            var isHot = (a === 0 && hot[i + "-" + j]) || (a === 1 && (i === 1 || i === 3) && j === 1);
            s += '<path d="M' + L[a][0] + " " + y1 + "L" + L[a + 1][0] + " " + y2 + '"' +
              (isHot ? ' class="a m-blink' + (j % 2 ? " d2" : "") + '" stroke-width="1.4"' : ' opacity=".35"') + "/>";
          });
        });
      }
      L.forEach(function (col, c) {
        col[1].forEach(function (y, i) {
          var on = (c === 1 && (i === 1 || i === 3)) || (c === 2 && i === 1) || (c === 0 && (i === 0 || i === 2));
          s += '<circle cx="' + col[0] + '" cy="' + y + '" r="6" class="nf' + (on ? " a" : "") + '" stroke-width="1.4"/>';
          if (on) s += '<circle cx="' + col[0] + '" cy="' + y + '" r="2.4" class="af" stroke="none"/>';
        });
      });
      return s + "</svg>";
    })(),
    pcb:
      '<svg viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="96" y="45" width="48" height="60" rx="4"/><rect x="104" y="53" width="32" height="44" rx="2" opacity=".4"/>' +
      '<path d="M96 55H72L58 41H22M96 68H62L48 82H22M96 92H78L64 106V138M144 55H168L182 41H218M144 75H218M144 95H164L178 109V138M110 105V128L96 142M130 105V138"/>' +
      '<path class="a m-dash" stroke-width="1.6" d="M120 45V24L134 10H218"/>' +
      '<circle cx="22" cy="41" r="3.5" class="nf"/><circle cx="22" cy="82" r="3.5" class="nf"/><circle cx="218" cy="41" r="3.5" class="nf"/><circle cx="218" cy="75" r="3.5" class="nf"/>' +
      '<circle cx="64" cy="138" r="3.5" class="nf"/><circle cx="178" cy="138" r="3.5" class="nf"/><circle cx="130" cy="138" r="3.5" class="nf"/>' +
      '<circle cx="218" cy="10" r="4" class="nf a" stroke-width="1.6"/><circle cx="218" cy="10" r="1.6" class="af" stroke="none"/>' +
      '<path d="M100 45v-5M108 45v-5M132 45v-5M140 45v-5M100 105v5M120 105v5M140 105v5" opacity=".6"/>' +
      '</svg>',
    radar:
      '<svg viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">' +
      '<circle cx="120" cy="75" r="24" opacity=".6"/><circle cx="120" cy="75" r="48" opacity=".45"/><circle cx="120" cy="75" r="70" opacity=".35"/>' +
      '<path d="M120 0v150M40 75h160" opacity=".25"/>' +
      '<g class="m-sweep"><path class="af" d="M120 75L120 5A70 70 0 0 1 169.5 25.5Z" opacity=".16" stroke="none"/><path class="a" d="M120 75V5" stroke-width="1.4"/></g>' +
      '<circle class="af m-blink" cx="152" cy="48" r="3" stroke="none"/><circle class="af m-blink d2" cx="88" cy="104" r="2.5" stroke="none"/><circle class="af m-blink d3" cx="146" cy="112" r="2.5" stroke="none"/>' +
      '<path class="a" stroke-width="1.4" d="M144 40h-4v4M160 40h4v4M144 56h-4v-4M160 56h4v-4"/>' +
      '<path d="M200 22h22M200 30h14M18 128h26M18 120h16" opacity=".5"/>' +
      '</svg>',
    browser:
      '<svg viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="18" y="10" width="204" height="130" rx="10"/>' +
      '<path d="M18 32h12a4 4 0 0 0 4-4v-6a4 4 0 0 1 4-4h56a4 4 0 0 1 4 4v6a4 4 0 0 0 4 4h120"/>' +
      '<path d="M108 22h44M48 25h30" opacity=".5"/>' +
      '<rect x="30" y="40" width="180" height="16" rx="8"/><path class="a" d="M40 48.5v-2a3 3 0 0 1 6 0v2M38.5 48.5h9v5h-9z"/><path d="M56 48h80" opacity=".5"/>' +
      '<path class="a" stroke-width="1.5" d="M120 70l20 8v14c0 12-8.5 21-20 25-11.5-4-20-13-20-25V78z"/><path class="a" stroke-width="1.6" d="M111 93l6 6 12-13"/>' +
      '<path d="M34 72h40M34 82h30M34 92h36M166 72h40M176 82h30M170 92h36M34 122h172" opacity=".4"/>' +
      '<circle class="af" cx="196" cy="48" r="5" stroke="none" opacity=".9"/>' +
      '</svg>',
    geo: (function () {
      function star(cx, cy, r, cls) {
        var d = "M" + (cx - r) + " " + (cy - r) + "h" + 2 * r + "v" + 2 * r + "h" + -2 * r + "z";
        var k = r * Math.SQRT2;
        var d2 = "M" + cx + " " + (cy - k) + "L" + (cx + k) + " " + cy + "L" + cx + " " + (cy + k) + "L" + (cx - k) + " " + cy + "z";
        return '<path d="' + d + '"' + (cls || "") + '/><path d="' + d2 + '"' + (cls || "") + "/>";
      }
      return '<svg viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round">' +
        star(120, 75, 34, ' class="a" stroke-width="1.4"') + '<circle cx="120" cy="75" r="24"/><circle cx="120" cy="75" r="14" opacity=".5"/>' +
        star(40, 75, 18, ' opacity=".45"') + star(200, 75, 18, ' opacity=".45"') +
        '<path d="M58 75h14M168 75h14" opacity=".4"/>' +
        '<path class="af" stroke="none" d="M210 14a14 14 0 1 0 12 21 11 11 0 1 1-12-21z" opacity=".9"/>' +
        "</svg>";
    })()
  };

  /* ======================================================== selected work */
  var featured = P.filter(function (p) { return p.featured; });
  function renderCases() {
    var host = $("#cases");
    host.innerHTML = featured.map(function (p, i) {
      var metrics = p.metrics ? '<ul class="case-metrics">' + p.metrics.map(function (m) {
        return "<li><b>" + esc(m[0]) + "</b><span>" + esc(m[1]) + "</span></li>";
      }).join("") + "</ul>" : "";
      return '<article class="case reveal" style="--d:' + (i % 2) * 0.08 + 's">' +
        '<div class="case-top"><span class="case-no">' + two(i + 1) + '</span><span class="chip">' + esc(domainLabel(p.domain)) + "</span>" + statusHTML(p) + "</div>" +
        '<div class="case-art" aria-hidden="true">' + (MOTIFS[p.motif] || "") + "</div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        '<p class="case-tag">' + esc(p.tagline) + "</p>" + metrics +
        '<div class="case-foot">' + tagsHTML(p.stack.slice(0, 3)) +
        '<button class="case-open" type="button" data-open="' + p.id + '" data-ctx="featured" aria-label="Open case study: ' + esc(p.title) + '">Case study <i aria-hidden="true">→</i></button></div>' +
        "</article>";
    }).join("");
    $$(".case", host).forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ============================================================ stack map */
  function renderStack() {
    var host = $("#stack-map");
    host.innerHTML = D.layers.map(function (L, i) {
      var items = P.filter(function (p) { return (p.layers || []).indexOf(L.id) !== -1; });
      return '<li class="layer reveal" style="--d:' + i * 0.05 + 's"><span class="layer-no">L' + (i + 1) + "</span>" +
        '<div class="layer-name"><b>' + esc(L.name) + "</b><span>" + esc(L.desc) + "</span></div>" +
        '<div class="layer-items">' + items.map(function (p) {
          return '<button type="button" class="node s-' + esc(p.status) + '" data-open="' + p.id + '" title="' + esc(p.title + " · " + statusLabel(p)) + '">' + esc(shortTitle(p)) + "</button>";
        }).join("") + "</div></li>";
    }).join("");
    host.insertAdjacentHTML("afterend", '<div class="stack-legend reveal" aria-label="Status legend">' +
      Object.keys(D.statuses).map(function (k) { return '<span class="status s-' + k + '">' + esc(D.statuses[k]) + "</span>"; }).join("") + "</div>");
  }

  /* ================================================================ index */
  var INDEX_LIMIT = 12;
  var state = { q: "", domain: "all", expanded: false }, visibleList = P.slice();
  var listEl = $("#index-list"), countEl = $("#index-count"), emptyEl = $("#index-empty"), searchEl = $("#index-search");
  var moreEl = $("#index-more"), moreBtn = $("#index-more-btn");

  function domainCounts() {
    var c = {};
    P.forEach(function (p) { c[p.domain] = (c[p.domain] || 0) + 1; });
    return c;
  }
  function renderFilters() {
    var c = domainCounts();
    var keys = ["all"].concat(Object.keys(D.domains));
    $("#filters").innerHTML = keys.map(function (k) {
      return '<button type="button" class="filter" data-domain="' + k + '" aria-pressed="' + (state.domain === k) + '">' +
        (k === "all" ? "All" : esc(D.domains[k].label)) + " <sup>" + (k === "all" ? P.length : c[k] || 0) + "</sup></button>";
    }).join("");
  }
  function haystack(p) {
    if (!p._hay) {
      p._hay = [p.title, p.tagline, p.summary, domainLabel(p.domain), statusLabel(p)]
        .concat(p.stack || [], p.platforms || [], p.highlights || []).join(" ").toLowerCase();
    }
    return p._hay;
  }
  function tokens(q) { return q.toLowerCase().split(/\s+/).filter(Boolean); }
  function matches(p, toks) {
    var h = haystack(p);
    return toks.every(function (t) { return h.indexOf(t) !== -1; });
  }
  function highlight(text, toks) {
    var out = esc(text);
    if (!toks.length) return out;
    var re = new RegExp("(" + toks.map(function (t) { return esc(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "gi");
    // only replace in text, never inside entities
    return out.split(/(&[a-z#0-9]+;)/i).map(function (part) {
      return /^&[a-z#0-9]+;$/i.test(part) ? part : part.replace(re, "<mark>$1</mark>");
    }).join("");
  }
  function renderIndex() {
    var toks = tokens(state.q);
    visibleList = P.filter(function (p) {
      return (state.domain === "all" || p.domain === state.domain) && matches(p, toks);
    });
    // Unfiltered, the list starts collapsed; any filter or search shows every match.
    var collapsed = !state.expanded && state.domain === "all" && !toks.length && visibleList.length > INDEX_LIMIT;
    var shown = collapsed ? visibleList.slice(0, INDEX_LIMIT) : visibleList;
    moreEl.hidden = !collapsed;
    if (collapsed) moreBtn.firstChild.nodeValue = "Show all " + visibleList.length + " projects ";

    listEl.innerHTML = shown.map(function (p) {
      return '<li><button type="button" class="row-btn" data-open="' + p.id + '" data-ctx="index">' +
        '<span class="r-no">' + two(p._i + 1) + "</span>" +
        '<span class="r-main"><span class="r-title">' + highlight(p.title, toks) + '</span><span class="r-tag">' + highlight(p.tagline, toks) + "</span>" +
        '<span class="r-mobile-status">' + statusHTML(p) + '<span class="r-domain">' + esc(domainLabel(p.domain)) + "</span></span></span>" +
        '<span class="r-domain">' + esc(domainLabel(p.domain)) + "</span>" +
        '<span class="r-stack">' + p.stack.slice(0, 3).map(esc).join(" · ") + "</span>" +
        '<span class="r-status">' + statusHTML(p) + "</span>" +
        '<span class="r-arrow" aria-hidden="true">→</span></button></li>';
    }).join("");

    var msg = "Showing " + shown.length + " of " + P.length + " projects";
    if (state.domain !== "all") msg += " in " + domainLabel(state.domain);
    if (toks.length) msg += " matching “" + state.q.trim() + "”";
    countEl.textContent = msg;
    emptyEl.hidden = visibleList.length > 0;
    $$("#filters .filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.domain === state.domain)); });
  }

  var searchTimer;
  searchEl.addEventListener("input", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () { state.q = searchEl.value; renderIndex(); }, 90);
  });
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest(".filter");
    if (!b) return;
    state.domain = b.dataset.domain;
    renderIndex();
  });
  moreBtn.addEventListener("click", function () {
    state.expanded = true;
    renderIndex();
    var next = $$(".row-btn", listEl)[INDEX_LIMIT];
    if (next) next.focus({ preventScroll: true });
  });
  $("#index-reset").addEventListener("click", function () {
    state.q = ""; state.domain = "all"; searchEl.value = ""; renderIndex(); searchEl.focus();
  });

  function filterTo(domain) {
    state.domain = domain; state.q = ""; searchEl.value = "";
    renderIndex();
    $("#index").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  /* ============================================================== toolbox */
  function renderToolLinks() {
    var c = domainCounts();
    $$(".tool-link").forEach(function (b) {
      var n = c[b.dataset.filter] || 0;
      b.textContent = n ? "See " + n + " project" + (n === 1 ? "" : "s") + " →" : "";
      b.hidden = !n;
      b.addEventListener("click", function () { filterTo(b.dataset.filter); });
    });
  }

  /* ================================================== project case study */
  var modal = $("#project-modal"), navList = P, current = null, lastFocus = null;

  function openProject(id, ctx) {
    var p = byId[id];
    if (!p) return;
    if (ctx === "index") navList = visibleList.slice();
    else if (ctx === "featured") navList = featured;
    else if (ctx !== "keep") navList = P;
    if (navList.indexOf(p) === -1) navList = P;
    current = p;

    $("#pm-meta").innerHTML = '<span class="chip">' + esc(domainLabel(p.domain)) + "</span>" + statusHTML(p);
    var html = '<h2 class="pm-title" id="pm-title">' + esc(p.title) + "</h2>" +
      '<p class="pm-tagline">' + esc(p.tagline) + "</p>";
    if (p.metrics) {
      html += '<div class="pm-metrics">' + p.metrics.map(function (m) {
        return "<div><b>" + esc(m[0]) + "</b><span>" + esc(m[1]) + "</span></div>";
      }).join("") + "</div>";
    }
    html += '<section class="pm-section"><h3>Overview</h3><p class="pm-summary">' + esc(p.summary) + "</p></section>";
    if (p.highlights && p.highlights.length) {
      html += '<section class="pm-section"><h3>Highlights</h3><ul class="pm-list">' +
        p.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul></section>";
    }
    html += '<section class="pm-section pm-cols"><div><h3>Stack</h3>' + tagsHTML(p.stack) + "</div>" +
      (p.platforms ? "<div><h3>Platforms</h3>" + tagsHTML(p.platforms) + "</div>" : "") + "</section>";
    html += p.link
      ? '<p class="pm-note"><a href="' + esc(p.link.href) + '" target="_blank" rel="noopener">' + esc(p.link.label) + " ↗</a></p>"
      : '<p class="pm-note">Private repository. A walkthrough or demo is available on request: <a href="#contact" data-close>get in touch</a>.</p>';
    $("#pm-body").innerHTML = html;
    $("#pm-body").scrollTop = 0;
    $("#pm-pos").textContent = two(navList.indexOf(p) + 1) + " / " + two(navList.length);

    if (!modal.open) {
      lastFocus = document.activeElement;
      modal.showModal();
    }
    try {
      var u = new URL(location.href);
      u.searchParams.set("p", p.id);
      history.replaceState(null, "", u);
    } catch (e) {}
  }
  function step(dir) {
    if (!current) return;
    var i = navList.indexOf(current);
    var next = navList[(i + dir + navList.length) % navList.length];
    openProject(next.id, "keep");
  }

  modal.addEventListener("close", function () {
    current = null;
    try {
      var u = new URL(location.href);
      u.searchParams.delete("p");
      history.replaceState(null, "", u);
    } catch (e) {}
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  });
  modal.addEventListener("click", function (e) {
    if (e.target === modal) { modal.close(); return; }
    var c = e.target.closest("[data-close]");
    if (!c) return;
    var href = c.getAttribute("href");
    if (href && href.charAt(0) === "#") {
      e.preventDefault();
      lastFocus = null;
      modal.close();
      var target = $(href);
      if (target) setTimeout(function () { target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }, 30);
    } else {
      modal.close();
    }
  });
  modal.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea")) return;
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });
  $("#pm-prev").addEventListener("click", function () { step(-1); });
  $("#pm-next").addEventListener("click", function () { step(1); });

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-open]");
    if (!t) return;
    e.preventDefault();
    openProject(t.dataset.open, t.dataset.ctx);
  });

  /* ============================================================== palette */
  var palette = $("#palette"), pInput = $("#palette-input"), pList = $("#palette-list");
  var pItems = [], pSel = 0;
  var SECTIONS = [
    ["Selected work", "#work", "Six flagship case studies"],
    ["Systems", "#systems", "The drone stack, layer by layer"],
    ["Project index", "#index", "Every project, filterable"],
    ["Toolbox", "#toolbox", "Languages, frameworks and tools"],
    ["About", "#about", "Background and journey"],
    ["Contact", "#contact", "Start a project"]
  ];
  var ACTIONS = [
    ["Switch theme", "Toggle light and dark", function () { toggleTheme(); }],
    ["Copy email address", D.profile.email, function () { copyEmail(); }],
    ["Open GitHub", "github.com/abduhifz-dev", function () { window.open(D.profile.github, "_blank", "noopener"); }],
    ["Open LinkedIn", "Connect on LinkedIn", function () { window.open(D.profile.linkedin, "_blank", "noopener"); }]
  ];

  function buildPalette(q) {
    var toks = tokens(q);
    var hit = function (s) { s = s.toLowerCase(); return toks.every(function (t) { return s.indexOf(t) !== -1; }); };
    var groups = [];
    var sec = SECTIONS.filter(function (s) { return hit(s[0] + " " + s[2]); }).map(function (s) {
      return { ic: "#", title: s[0], sub: s[2], run: function () { var el = $(s[1]); if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); } };
    });
    var proj = P.filter(function (p) { return !toks.length || matches(p, toks); })
      .sort(function (a, b) {
        if (!toks.length) return 0;
        var as = a.title.toLowerCase().indexOf(toks[0]) === 0 ? 0 : 1, bs = b.title.toLowerCase().indexOf(toks[0]) === 0 ? 0 : 1;
        return as - bs;
      })
      .map(function (p) {
        return { ic: two(p._i + 1), title: p.title, sub: domainLabel(p.domain) + " · " + p.tagline, run: function () { openProject(p.id); } };
      });
    var act = ACTIONS.filter(function (a) { return hit(a[0] + " " + a[1]); }).map(function (a) {
      return { ic: "↗", title: a[0], sub: a[1], run: a[2] };
    });
    if (sec.length) groups.push(["Sections", sec]);
    if (proj.length) groups.push(["Projects", toks.length ? proj : proj.slice(0, 8)]);
    if (act.length) groups.push(["Actions", act]);

    pItems = [];
    var html = "";
    groups.forEach(function (g) {
      html += '<li class="palette-group" role="presentation">' + g[0] + "</li>";
      g[1].forEach(function (it) {
        var idx = pItems.length;
        pItems.push(it);
        html += '<li class="palette-item" role="option" id="pi-' + idx + '" data-idx="' + idx + '" aria-selected="false">' +
          '<span class="pi-ic" aria-hidden="true">' + esc(it.ic) + '</span><span class="pi-text"><b>' + esc(it.title) + "</b><small>" + esc(it.sub) + "</small></span></li>";
      });
    });
    pList.innerHTML = html || '<li class="palette-empty" role="presentation">Nothing found. Try “drone”, “Qt” or “Flutter”.</li>';
    select(0);
  }
  function select(i) {
    if (!pItems.length) { pInput.removeAttribute("aria-activedescendant"); return; }
    pSel = (i + pItems.length) % pItems.length;
    $$(".palette-item", pList).forEach(function (el) { el.setAttribute("aria-selected", String(+el.dataset.idx === pSel)); });
    var el = $("#pi-" + pSel);
    if (el) { el.scrollIntoView({ block: "nearest" }); pInput.setAttribute("aria-activedescendant", el.id); }
  }
  function runSelected(i) {
    var it = pItems[i];
    if (!it) return;
    palette.close();
    setTimeout(it.run, 10);
  }
  function openPalette() {
    if (modal.open) modal.close();
    pInput.value = "";
    buildPalette("");
    palette.showModal();
    pInput.focus();
  }
  pInput.addEventListener("input", function () { buildPalette(pInput.value); });
  pInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); select(pSel + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); select(pSel - 1); }
    else if (e.key === "Enter") { e.preventDefault(); runSelected(pSel); }
  });
  pList.addEventListener("mousemove", function (e) {
    var it = e.target.closest(".palette-item");
    if (it && +it.dataset.idx !== pSel) select(+it.dataset.idx);
  });
  pList.addEventListener("click", function (e) {
    var it = e.target.closest(".palette-item");
    if (it) runSelected(+it.dataset.idx);
  });
  palette.addEventListener("click", function (e) { if (e.target === palette) palette.close(); });
  $$("[data-open-palette]").forEach(function (b) { b.addEventListener("click", openPalette); });

  document.addEventListener("keydown", function (e) {
    var typing = e.target.matches && e.target.matches("input, textarea, select, [contenteditable]");
    if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      palette.open ? palette.close() : openPalette();
    } else if (e.key === "/" && !typing && !palette.open && !modal.open) {
      e.preventDefault();
      openPalette();
    }
  });
  if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    $$(".search-btn kbd").forEach(function (k) { k.textContent = "⌘K"; });
  }

  /* ========================================================== mobile menu */
  var menuBtn = $("#menu-btn"), menu = $("#mobile-menu");
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

  /* ======================================================= scroll effects */
  var nav = $("#nav"), bar = $("#progress-bar"), fdr = $("#fdr");
  var fdrAlt = $("#fdr-alt"), fdrHdg = $("#fdr-hdg"), fdrWpt = $("#fdr-wpt"), fdrName = $("#fdr-name");
  var sections = $$("[data-wpt]");
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      nav.classList.toggle("scrolled", y > 8);
      fdr.classList.toggle("show", y > window.innerHeight * 0.6);
      fdrAlt.textContent = String(Math.round(120 + y * 0.18)).padStart(4, "0");
      fdrHdg.textContent = String(Math.round(((312 + y * 0.06) % 360 + 360) % 360)).padStart(3, "0");
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var navLinks = $$(".nav-links a");
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id, i = sections.indexOf(en.target);
        navLinks.forEach(function (a) { a.classList.toggle("active", a.dataset.nav === id); });
        fdrWpt.textContent = two(i + 1) + "/" + two(sections.length);
        fdrName.textContent = en.target.dataset.wpt.toUpperCase();
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { secObs.observe(s); });
  }

  /* =============================================================== reveal */
  function setupReveal() {
    var els = $$(".reveal:not(.in)");
    if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    // stagger siblings that don't set their own delay
    els.forEach(function (el) {
      if (el.style.getPropertyValue("--d")) return;
      var sibs = $$(":scope > .reveal", el.parentElement), i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty("--d", Math.min(i, 6) * 0.06 + "s");
    });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ================================================================ stats */
  function setupCounts() {
    var dyn = { projects: P.length, domains: Object.keys(D.domains).length };
    $$("[data-count]").forEach(function (el) {
      var v = dyn[el.dataset.count];
      if (v != null) { el.textContent = v; el.dataset.countTo = v; }
    });
    var els = $$(".stats [data-count-to]");
    function run(el) {
      var to = parseFloat(el.dataset.countTo), dec = parseInt(el.dataset.decimals || "0", 10), t0 = null, dur = 1400;
      function f(now) {
        if (!t0) t0 = now;
        var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = (to * e).toFixed(dec);
        if (k < 1) requestAnimationFrame(f);
      }
      requestAnimationFrame(f);
    }
    if (reduce || !("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); obs.unobserve(en.target); } });
    }, { threshold: 0.6 });
    els.forEach(function (el) { el.textContent = (0).toFixed(parseInt(el.dataset.decimals || "0", 10)); obs.observe(el); });
  }

  /* ================================================================ clock */
  function tickClock() {
    var s;
    try {
      s = new Intl.DateTimeFormat("en-GB", { timeZone: D.profile.timezone, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
    } catch (e) { s = "--:--"; }
    $$("[data-clock]").forEach(function (el) { el.textContent = s; });
  }

  /* ============================================================== contact */
  function copyEmail() {
    var done = function () { toast("Email copied: " + D.profile.email); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(D.profile.email).then(done, function () { location.href = "mailto:" + D.profile.email; });
    } else {
      var ta = document.createElement("textarea");
      ta.value = D.profile.email; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { location.href = "mailto:" + D.profile.email; }
      ta.remove();
    }
  }
  $("#copy-email").addEventListener("click", copyEmail);

  var form = $("#contact-form"), formErr = $("#form-error");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var name = String(fd.get("name") || "").trim();
    var email = String(fd.get("email") || "").trim();
    var msg = String(fd.get("message") || "").trim();
    var type = String(fd.get("type") || "");
    var bad = [];
    form.elements.name.setAttribute("aria-invalid", String(!name)); if (!name) bad.push("your name");
    var okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    form.elements.email.setAttribute("aria-invalid", String(!okMail)); if (!okMail) bad.push("a valid email");
    form.elements.message.setAttribute("aria-invalid", String(!msg)); if (!msg) bad.push("a few words about the project");
    if (bad.length) {
      formErr.textContent = "Please add " + bad.join(", ") + ".";
      formErr.hidden = false;
      return;
    }
    formErr.hidden = true;
    var subject = "Project enquiry: " + type + " (" + name + ")";
    var body = msg + "\n\n" + name + "\n" + email;
    location.href = "mailto:" + D.profile.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    toast("Opening your email app…");
  });

  /* ================================================================= boot */
  renderCases();
  renderStack();
  renderFilters();
  renderIndex();
  renderToolLinks();
  setupCounts();
  setupReveal();
  tickClock();
  setInterval(tickClock, 30000);
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try {
    var deep = new URLSearchParams(location.search).get("p");
    if (deep && byId[deep]) openProject(deep);
  } catch (e) {}
})();
