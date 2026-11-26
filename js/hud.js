(function () {
  "use strict";
  var canvas = document.getElementById("hud");
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var altEl = document.getElementById("hud-alt");
  var gsEl = document.getElementById("hud-gs");

  var W = 0, H = 0, dpr = 1, C = {};
  var roll = 0, pitch = 0, tRoll = 0, tPitch = 0;
  var visible = true, running = false, t0 = performance.now(), lastRead = 0;
  var DEG = Math.PI / 180;

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    C.text = cs.getPropertyValue("--text").trim() || "#ecebe6";
    C.dim = cs.getPropertyValue("--dim").trim() || "#6f716c";
    C.accent = cs.getPropertyValue("--accent").trim() || "#ff6b1a";
    C.bg = cs.getPropertyValue("--bg-2").trim() || "#111316";
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw(performance.now());
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function pad(n, w) { n = String(Math.round(n)); while (n.length < w) n = "0" + n; return n; }

  window.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    var r = canvas.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    tRoll = clamp((e.clientX - cx) / window.innerWidth * 80, -38, 38);
    tPitch = clamp(-(e.clientY - cy) / window.innerHeight * 34, -18, 18);
  }, { passive: true });

  function line(x1, y1, x2, y2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }

  function draw(now) {
    if (!W) return;
    var t = (now - t0) / 1000;
    var cx = W / 2, cy = H * 0.46;
    var R = Math.min(W, H) * 0.31;
    var px = R / 26;
    var heading = ((312 + window.scrollY * 0.06 + (reduce ? 0 : t * 1.5)) % 360 + 360) % 360;

    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = "round";
    ctx.font = "500 " + Math.max(9, R * 0.065) + "px 'JetBrains Mono', ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
    ctx.translate(cx, cy);
    ctx.rotate(-roll * DEG);
    ctx.translate(0, pitch * px);

    ctx.globalAlpha = 0.05; ctx.fillStyle = C.text; ctx.fillRect(-R * 2, -R * 3, R * 4, R * 3);
    ctx.globalAlpha = 0.11; ctx.fillStyle = C.accent; ctx.fillRect(-R * 2, 0, R * 4, R * 3);

    ctx.globalAlpha = 0.22; ctx.strokeStyle = C.accent; ctx.lineWidth = 1;
    for (var g = -6; g <= 6; g++) line(0, 0, g * R * 0.55, R * 2.2);
    for (var k = 1; k <= 6; k++) { var yy = R * 0.06 * k * k; line(-R * 2, yy, R * 2, yy); }

    ctx.globalAlpha = 1; ctx.strokeStyle = C.accent; ctx.lineWidth = 1.6;
    line(-R * 2, 0, R * 2, 0);

    ctx.strokeStyle = C.text; ctx.fillStyle = C.text; ctx.lineWidth = 1.2;
    for (var p = -30; p <= 30; p += 5) {
      if (p === 0) continue;
      var y = -p * px, major = p % 10 === 0, half = major ? R * 0.24 : R * 0.11;
      ctx.globalAlpha = major ? 0.75 : 0.4;
      if (p < 0) { ctx.setLineDash([4, 4]); }
      line(-half, y, half, y);
      ctx.setLineDash([]);
      if (major) {
        ctx.globalAlpha = 0.6;
        ctx.fillText(Math.abs(p), -half - R * 0.1, y);
        ctx.fillText(Math.abs(p), half + R * 0.1, y);
      }
    }
    ctx.restore();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.globalAlpha = 0.5; ctx.strokeStyle = C.text; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.stroke();
    ctx.globalAlpha = 0.18;
    ctx.beginPath(); ctx.arc(0, 0, R + 16, 0, Math.PI * 2); ctx.stroke();

    var marks = [-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60];
    ctx.globalAlpha = 0.7;
    for (var i = 0; i < marks.length; i++) {
      var a = (marks[i] - 90) * DEG, len = marks[i] % 30 === 0 ? 12 : 7;
      ctx.lineWidth = marks[i] === 0 ? 2 : 1.2;
      line(Math.cos(a) * (R + 2), Math.sin(a) * (R + 2), Math.cos(a) * (R + 2 + len), Math.sin(a) * (R + 2 + len));
    }
    ctx.rotate(-roll * DEG);
    ctx.globalAlpha = 1; ctx.fillStyle = C.accent;
    ctx.beginPath(); ctx.moveTo(0, -R + 3); ctx.lineTo(-7, -R + 15); ctx.lineTo(7, -R + 15); ctx.closePath(); ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = C.bg; ctx.lineWidth = 6; ctx.lineJoin = "round";
    aircraft();
    ctx.strokeStyle = C.accent; ctx.lineWidth = 2.6;
    aircraft();
    ctx.fillStyle = C.accent;
    ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    function aircraft() {
      ctx.beginPath();
      ctx.moveTo(-R * 0.56, 0); ctx.lineTo(-R * 0.2, 0); ctx.lineTo(-R * 0.1, R * 0.08); ctx.lineTo(0, 0);
      ctx.lineTo(R * 0.1, R * 0.08); ctx.lineTo(R * 0.2, 0); ctx.lineTo(R * 0.56, 0);
      ctx.stroke();
    }

    var tapeY = cy + R + Math.max(26, R * 0.24), tapeW = Math.min(W * 0.56, R * 2), spacing = tapeW / 60;
    ctx.save();
    ctx.beginPath(); ctx.rect(cx - tapeW / 2, tapeY - 18, tapeW, 40); ctx.clip();
    ctx.strokeStyle = C.text; ctx.fillStyle = C.text; ctx.lineWidth = 1;
    var start = Math.floor((heading - 32) / 5) * 5;
    for (var hd = start; hd <= heading + 32; hd += 5) {
      var x = cx + (hd - heading) * spacing;
      var edge = 1 - Math.min(1, Math.abs(hd - heading) / 30);
      var major = ((hd % 30) + 30) % 30 === 0;
      ctx.globalAlpha = 0.15 + edge * 0.6;
      line(x, tapeY - 10, x, tapeY - (major ? 0 : 5));
      if (major) {
        var v = ((hd % 360) + 360) % 360;
        var label = v === 0 ? "N" : v === 90 ? "E" : v === 180 ? "S" : v === 270 ? "W" : pad(v / 10, 2);
        ctx.fillText(label, x, tapeY + 11);
      }
    }
    ctx.restore();
    ctx.save();
    ctx.globalAlpha = 1; ctx.fillStyle = C.accent;
    ctx.beginPath(); ctx.moveTo(cx, tapeY - 12); ctx.lineTo(cx - 5, tapeY - 20); ctx.lineTo(cx + 5, tapeY - 20); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.text; ctx.globalAlpha = 0.95;
    ctx.fillText("HDG " + pad(heading, 3) + "°", cx, tapeY + Math.max(22, R * 0.18));
    ctx.restore();

    if (now - lastRead > 120) {
      lastRead = now;
      var alt = 120 + window.scrollY * 0.18;
      if (altEl) altEl.textContent = pad(alt, 4) + " m";
      if (gsEl) gsEl.textContent = (12.4 + (reduce ? 0 : Math.sin(t * 0.7) * 0.6 + Math.sin(t * 2.3) * 0.15)).toFixed(1) + " m/s";
    }
  }

  function frame(now) {
    if (!running) return;
    var t = (now - t0) / 1000;
    var wobR = reduce ? 0 : Math.sin(t * 0.55) * 4 + Math.sin(t * 1.3) * 1.2;
    var wobP = reduce ? 0 : Math.sin(t * 0.4) * 2;
    roll += (tRoll + wobR - roll) * 0.05;
    pitch += (tPitch + wobP - pitch) * 0.05;
    draw(now);
    requestAnimationFrame(frame);
  }

  function setRunning(on) {
    if (on && !running) { running = true; requestAnimationFrame(frame); }
    else if (!on) running = false;
  }

  function update() { setRunning(!reduce && visible && !document.hidden); }

  readColors();
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", update);
  document.addEventListener("themechange", function () { readColors(); if (!running) draw(performance.now()); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!running) draw(performance.now()); });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      update();
    }).observe(canvas);
  }

  if (reduce) {
    draw(performance.now());
    window.addEventListener("scroll", function () { draw(performance.now()); }, { passive: true });
  } else {
    update();
  }
})();
