/* Renders the projects from js/data.js and handles the page's interactions:
   project list filters, project details dialog (with ?p=<id> links),
   theme toggle, mobile menu and the mailto contact form. */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) return;
  var P = D.projects;
  var byId = {};
  P.forEach(function (p, i) { p._i = i; byId[p.id] = p; });
  // LIST = everything shown on the site (hidden: true is skipped). Planned projects are in it, labelled "Planned".
  var LIST = P.filter(function (p) { return !p.hidden; });
  var REAL = LIST.filter(function (p) { return p.status !== "planned"; });
  var PLANNED = LIST.filter(function (p) { return p.status === "planned"; });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function statusLabel(p) { return p.statusText || D.statuses[p.status] || p.status; }
  function domainLabel(id) { return (D.domains[id] || {}).label || id; }
  function shortTitle(p) {
    if (p.short) return p.short;
    var m = /^CorePilot\s+(.+)$/.exec(p.title);
    return m && m[1].length > 3 ? m[1] : p.title;
  }
  function statusHTML(p) { return '<span class="status s-' + esc(p.status) + '">' + esc(statusLabel(p)) + "</span>"; }
  function tagsHTML(list) { return '<ul class="tags">' + list.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>"; }
  // width/height let the browser reserve the image space before it loads
  function dims(im) { return im.w && im.h ? ' width="' + im.w + '" height="' + im.h + '"' : ""; }
  function scrollToEl(el) { if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }

  /* ---------------------------------------------------------------- toast */
  var toastEl = $("#toast"), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }
  window.portfolioToast = toast;

  /* ---------------------------------------------------------------- theme */
  var themeBtn = $("#theme-toggle");
  function syncThemeUI() {
    var t = document.documentElement.getAttribute("data-theme");
    themeBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "dark" ? "#0d0e10" : "#f6f5f1");
  }
  themeBtn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    syncThemeUI();
    document.dispatchEvent(new Event("themechange"));
  });
  syncThemeUI();

  /* ------------------------------------------------------------- featured */
  var featured = REAL.filter(function (p) { return p.featured; });

  function visualHTML(p) {
    if (p.images && p.images.length) {
      var phones = p.images[0].phone;
      var imgs = p.images.map(function (im) {
        return '<img src="' + esc(im.src) + '" alt="' + esc(im.alt) + '"' + dims(im) + ' loading="lazy">';
      }).join("");
      return '<button type="button" class="' + (phones ? "f-phones" : "f-image") + '" data-open="' + p.id + '" data-ctx="featured" aria-label="Open details: ' + esc(p.title) + '">' + imgs + "</button>";
    }
    if (p.metrics) {
      return '<ul class="f-specs">' + p.metrics.map(function (m) {
        return "<li><b>" + esc(m[0]) + "</b><span>" + esc(m[1]) + "</span></li>";
      }).join("") + "</ul>";
    }
    return "";
  }

  function renderFeatured() {
    $("#features").innerHTML = featured.map(function (p) {
      return '<article class="feature">' +
        '<div class="f-text">' +
          '<div class="f-meta"><span class="chip">' + esc(domainLabel(p.domain)) + "</span>" + statusHTML(p) + "</div>" +
          "<h3>" + esc(p.title) + "</h3>" +
          '<p class="f-tagline">' + esc(p.tagline) + "</p>" +
          '<ul class="f-points">' + p.highlights.slice(0, 3).map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul>" +
          tagsHTML(p.stack.slice(0, 5)) +
          '<button type="button" class="f-more" data-open="' + p.id + '" data-ctx="featured">View details <span aria-hidden="true">→</span></button>' +
        "</div>" +
        '<div class="f-visual">' + visualHTML(p) + "</div>" +
      "</article>";
    }).join("");
  }

  /* --------------------------------------------------------- all projects */
  var INDEX_LIMIT = 12;
  var state = { q: "", domain: "all", expanded: false }, visibleList = LIST.slice();
  var listEl = $("#index-list"), countEl = $("#index-count"), emptyEl = $("#index-empty"), searchEl = $("#index-search");
  var moreEl = $("#index-more"), moreBtn = $("#index-more-btn");

  function domainCounts(list) {
    var c = {};
    (list || LIST).forEach(function (p) { c[p.domain] = (c[p.domain] || 0) + 1; });
    return c;
  }
  function renderFilters() {
    var c = domainCounts();
    $("#filters").innerHTML = ["all"].concat(Object.keys(D.domains)).map(function (k) {
      return '<button type="button" class="filter" data-domain="' + k + '" aria-pressed="' + (state.domain === k) + '">' +
        (k === "all" ? "All" : esc(D.domains[k].label)) + " <small>" + (k === "all" ? LIST.length : c[k] || 0) + "</small></button>";
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
    return out.split(/(&[a-z#0-9]+;)/i).map(function (part) {
      return /^&[a-z#0-9]+;$/i.test(part) ? part : part.replace(re, "<mark>$1</mark>");
    }).join("");
  }
  function renderIndex() {
    var toks = tokens(state.q);
    visibleList = LIST.filter(function (p) {
      return (state.domain === "all" || p.domain === state.domain) && matches(p, toks);
    });
    // Unfiltered, the list starts collapsed; any filter or search shows every match.
    var collapsed = !state.expanded && state.domain === "all" && !toks.length && visibleList.length > INDEX_LIMIT;
    var shown = collapsed ? visibleList.slice(0, INDEX_LIMIT) : visibleList;
    moreEl.hidden = !collapsed;
    if (collapsed) moreBtn.textContent = "Show all " + visibleList.length + " projects";

    listEl.innerHTML = shown.map(function (p) {
      return '<li><button type="button" class="row-btn" data-open="' + p.id + '" data-ctx="index">' +
        '<span class="r-main"><span class="r-title">' + highlight(p.title, toks) + '</span><span class="r-tag">' + highlight(p.tagline, toks) + "</span>" +
        '<span class="r-mobile-status">' + statusHTML(p) + '<span class="r-domain">' + esc(domainLabel(p.domain)) + "</span></span></span>" +
        '<span class="r-domain">' + esc(domainLabel(p.domain)) + "</span>" +
        '<span class="r-stack">' + p.stack.slice(0, 3).map(esc).join(", ") + "</span>" +
        '<span class="r-status">' + statusHTML(p) + "</span>" +
        '<span class="r-arrow" aria-hidden="true">→</span></button></li>';
    }).join("");

    var msg = "Showing " + shown.length + " of " + LIST.length + " projects";
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

  function renderToolLinks() {
    var c = domainCounts();
    $$(".tool-link").forEach(function (b) {
      var n = c[b.dataset.filter] || 0;
      b.textContent = n ? "See " + n + " project" + (n === 1 ? "" : "s") + " →" : "";
      b.hidden = !n;
      b.addEventListener("click", function () {
        state.domain = b.dataset.filter; state.q = ""; searchEl.value = "";
        renderIndex();
        scrollToEl($("#all"));
      });
    });
  }

  /* ------------------------------------------------------ project details */
  var modal = $("#project-modal"), navList = P, current = null, lastFocus = null;

  function openProject(id, ctx) {
    var p = byId[id];
    if (!p || p.hidden) return;
    if (ctx === "index") navList = visibleList.slice();
    else if (ctx === "featured") navList = featured;
    else if (ctx !== "keep") navList = LIST;
    if (navList.indexOf(p) === -1) navList = LIST;
    current = p;

    $("#pm-meta").innerHTML = '<span class="chip">' + esc(domainLabel(p.domain)) + "</span>" + statusHTML(p);
    var html = '<h2 class="pm-title" id="pm-title">' + esc(p.title) + "</h2>" +
      '<p class="pm-tagline">' + esc(p.tagline) + "</p>";
    if (p.images && p.images.length) {
      html += '<div class="pm-images' + (p.images[0].phone ? " phones" : "") + '">' + p.images.map(function (im) {
        return '<img src="' + esc(im.src) + '" alt="' + esc(im.alt) + '"' + dims(im) + '>';
      }).join("") + "</div>";
    }
    if (p.metrics) {
      html += '<div class="pm-metrics">' + p.metrics.map(function (m) {
        return "<div><b>" + esc(m[0]) + "</b><span>" + esc(m[1]) + "</span></div>";
      }).join("") + "</div>";
    }
    html += '<section class="pm-section"><h3>' + (p.status === "planned" ? "The plan" : "Overview") + '</h3><p class="pm-summary">' + esc(p.summary) + "</p></section>";
    if (p.highlights && p.highlights.length) {
      html += '<section class="pm-section"><h3>Highlights</h3><ul class="pm-list">' +
        p.highlights.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("") + "</ul></section>";
    }
    html += '<section class="pm-section pm-cols"><div><h3>' + (p.status === "planned" ? "Planned stack" : "Built with") + '</h3>' + tagsHTML(p.stack) + "</div>" +
      (p.platforms ? "<div><h3>Platforms</h3>" + tagsHTML(p.platforms) + "</div>" : "") + "</section>";
    html += p.status === "planned"
      ? '<p class="pm-note">This project is on my roadmap and not built yet. If you need something like it, <a href="#contact" data-close>contact me</a>.</p>'
      : p.link
      ? '<p class="pm-note"><a href="' + esc(p.link.href) + '" target="_blank" rel="noopener">' + esc(p.link.label) + "</a></p>"
      : '<p class="pm-note">The code is in a private repository. I can show a demo on request: <a href="#contact" data-close>contact me</a>.</p>';
    $("#pm-body").innerHTML = html;
    $("#pm-body").scrollTop = 0;
    $("#pm-pos").textContent = (navList.indexOf(p) + 1) + " / " + navList.length;

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
    openProject(navList[(i + dir + navList.length) % navList.length].id, "keep");
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
      setTimeout(function () { scrollToEl($(href)); }, 30);
    } else {
      modal.close();
    }
  });
  modal.addEventListener("keydown", function (e) {
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

  /* ---------------------------------------------------------- mobile menu */
  var menuBtn = $("#menu-btn"), menu = $("#mobile-menu");
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 1100 && !menu.hidden) setMenu(false); });

  /* ------------------------------------------------- nav state on scroll */
  var nav = $("#nav"), ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { nav.classList.toggle("scrolled", window.scrollY > 8); ticking = false; });
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    var navLinks = $$(".nav-links a");
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("active", a.dataset.nav === en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main > section[id]").forEach(function (s) { obs.observe(s); });
  }

  /* ---------------------------------------------------------------- clock */
  function tickClock() {
    var s;
    try {
      s = new Intl.DateTimeFormat("en-GB", { timeZone: D.profile.timezone, hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
    } catch (e) { s = "--:--"; }
    $$("[data-clock]").forEach(function (el) { el.textContent = s; });
  }

  /* -------------------------------------------------------------- contact */
  function copyEmail() {
    var done = function () { toast("Email address copied"); };
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
    var okMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    form.elements.name.setAttribute("aria-invalid", String(!name)); if (!name) bad.push("your name");
    form.elements.email.setAttribute("aria-invalid", String(!okMail)); if (!okMail) bad.push("a valid email");
    form.elements.message.setAttribute("aria-invalid", String(!msg)); if (!msg) bad.push("a message");
    if (bad.length) {
      formErr.textContent = "Please add " + bad.join(", ") + ".";
      formErr.hidden = false;
      return;
    }
    formErr.hidden = true;
    var subject = type + ": message from " + name;
    var body = msg + "\n\n" + name + "\n" + email;
    location.href = "mailto:" + D.profile.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    toast("Opening your email app…");
  });

  /* ----------------------------------------------------------------- boot */
  renderFeatured();
  renderFilters();
  renderIndex();
  renderToolLinks();
  $$("[data-count=projects]").forEach(function (el) { el.textContent = LIST.length; });
  $$("[data-count=built]").forEach(function (el) { el.textContent = REAL.length; });
  $$("[data-count=planned]").forEach(function (el) { el.textContent = PLANNED.length; });
  tickClock();
  setInterval(tickClock, 30000);
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  try {
    var deep = new URLSearchParams(location.search).get("p");
    if (deep && byId[deep] && !byId[deep].hidden) openProject(deep);
  } catch (e) {}
})();
