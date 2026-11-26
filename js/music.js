/* Background music for the portfolio.

   By default a soft ambient track is generated live with the Web Audio API:
   slow chords (Am – Fmaj7 – Cmaj7 – G6), a sine bass and a few bell notes,
   with reverb and echo. No audio file or licence needed.

   Settings (js/data.js → profile.music):
     file       path to your own track, e.g. "assets/music/track.mp3" (looped); if it
                can't be played, the generated music is used instead
     volume     0..1 (default 0.5)
     autoStart  true = try to play as soon as the page opens; if the browser blocks
                sound (most do until the visitor interacts), start on the first
                click, tap or key press
   The track is preloaded after the page loads so it starts without delay. Music
   keeps playing in background tabs; only the music button stops it. Pausing lasts
   for the current visit; the next visit starts the music again. */
(function () {
  "use strict";

  var btn = document.getElementById("music-btn");
  if (!btn) return;

  var cfg = (window.PORTFOLIO && window.PORTFOLIO.profile && window.PORTFOLIO.profile.music) || {};
  var fileEl = null;
  if (cfg.file) {
    fileEl = new Audio();
    fileEl.loop = true;
    fileEl.preload = "none";
    fileEl.src = cfg.file;
  }
  var VOLUME = typeof cfg.volume === "number" ? Math.max(0, Math.min(1, cfg.volume)) : 0.5;
  var AC = window.AudioContext || window.webkitAudioContext;

  var mode = null;          // "file" | "synth" once decided
  var playing = false;

  /* -------------------------------------------------------- preferences */
  // The visitor's on/off choice lasts for this visit only (sessionStorage), so every new visit
  // starts the music again. Clear any old permanent choice from earlier versions of the site.
  try { localStorage.removeItem("music"); } catch (e) {}
  function getPref() { try { return sessionStorage.getItem("music"); } catch (e) { return null; } }
  function setPref(v) { try { sessionStorage.setItem("music", v); } catch (e) {} }

  function setUI(on) {
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Pause background music" : "Play background music");
  }

  /* ------------------------------------------------------ generated music */
  var ctx, master, dry, verbSend, echoIn, timer, nextChord = 0, chordIdx = 0, nextBell = 0;
  var CHORDS = [
    { bass: 45, notes: [57, 60, 64, 67, 71] },  // Am9
    { bass: 41, notes: [57, 60, 64, 65, 69] },  // Fmaj7
    { bass: 48, notes: [55, 59, 64, 67, 71] },  // Cmaj7
    { bass: 43, notes: [55, 59, 62, 64, 67] }   // G6
  ];
  var BELLS = [69, 72, 74, 76, 79, 81, 84];     // A minor pentatonic
  var CHORD_LEN = 9;                            // seconds per chord

  function hz(m) { return 440 * Math.pow(2, (m - 69) / 12); }

  function impulse(seconds) {
    var len = Math.floor(ctx.sampleRate * seconds), buf = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
      var d = buf.getChannelData(ch);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    return buf;
  }

  function buildGraph() {
    ctx = new AC();
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.ratio.value = 3;
    master = ctx.createGain(); master.gain.value = 0;
    master.connect(comp); comp.connect(ctx.destination);

    dry = ctx.createGain(); dry.gain.value = 0.8; dry.connect(master);

    var verb = ctx.createConvolver(); verb.buffer = impulse(3.4);
    verbSend = ctx.createGain(); verbSend.gain.value = 0.55;
    verbSend.connect(verb); verb.connect(master);

    // echo for the bell notes
    echoIn = ctx.createGain();
    var delay = ctx.createDelay(2); delay.delayTime.value = 0.42;
    var fb = ctx.createGain(); fb.gain.value = 0.38;
    var tone = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 2400;
    echoIn.connect(delay); delay.connect(tone); tone.connect(fb); fb.connect(delay);
    tone.connect(verbSend); tone.connect(dry);
  }

  function padNote(t, midi, len) {
    var f = ctx.createBiquadFilter(); f.type = "lowpass"; f.Q.value = 0.4;
    f.frequency.setValueAtTime(450, t);
    f.frequency.linearRampToValueAtTime(1150, t + len * 0.5);
    f.frequency.linearRampToValueAtTime(600, t + len + 3);
    var env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.024, t + 3);
    env.gain.setValueAtTime(0.024, t + len);
    env.gain.setTargetAtTime(0, t + len, 1.4);
    f.connect(env); env.connect(dry); env.connect(verbSend);
    [-8, 8].forEach(function (det) {
      var o = ctx.createOscillator(); o.type = "sawtooth";
      o.frequency.value = hz(midi); o.detune.value = det;
      o.connect(f); o.start(t); o.stop(t + len + 7);
    });
  }

  function bassNote(t, midi, len) {
    var o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = hz(midi);
    var env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.11, t + 2);
    env.gain.setValueAtTime(0.11, t + len);
    env.gain.setTargetAtTime(0, t + len, 1.2);
    o.connect(env); env.connect(dry);
    o.start(t); o.stop(t + len + 6);
  }

  function bell(t, midi) {
    var o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = hz(midi);
    var o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = hz(midi) * 2.01;
    var env = ctx.createGain();
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.045, t + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
    var env2 = ctx.createGain(); env2.gain.value = 0.25;
    o.connect(env); o2.connect(env2); env2.connect(env);
    env.connect(dry); env.connect(echoIn); env.connect(verbSend);
    o.start(t); o2.start(t); o.stop(t + 2.8); o2.stop(t + 2.8);
  }

  function schedule() {
    var now = ctx.currentTime;
    if (nextChord < now) nextChord = now + 0.05;
    if (nextBell < now) nextBell = now + 0.5;
    while (nextChord < now + 1.2) {
      var c = CHORDS[chordIdx % CHORDS.length];
      c.notes.forEach(function (n) { padNote(nextChord, n, CHORD_LEN); });
      bassNote(nextChord, c.bass, CHORD_LEN);
      nextChord += CHORD_LEN; chordIdx++;
    }
    while (nextBell < now + 1.2) {
      if (Math.random() < 0.6) bell(nextBell, BELLS[Math.floor(Math.random() * BELLS.length)]);
      nextBell += 1.1 + Math.random() * 2.2;
    }
  }

  function fadeMaster(to, secs) {
    var g = master.gain, now = ctx.currentTime;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(to, now + secs);
  }

  function startSynth() {
    if (!AC) return false;
    if (!ctx) buildGraph();
    ctx.resume();
    if (!nextChord) { nextChord = ctx.currentTime + 0.1; nextBell = ctx.currentTime + 4; }
    schedule();
    clearInterval(timer);
    timer = setInterval(schedule, 250);
    fadeMaster(VOLUME * 2.4, 2.5);
    return true;
  }
  function stopSynth() {
    if (!ctx) return;
    clearInterval(timer);
    fadeMaster(0, 0.8);
    setTimeout(function () { if (!playing && ctx.state === "running") ctx.suspend(); }, 900);
  }

  /* ---------------------------------------------------------- controls */
  var soundOn = false;   // audio is really playing (the button shows this, nothing else)
  var attempt = 0;       // ignores results of older play() calls

  // Download the track in the background once the page has loaded, so it starts instantly later.
  function preloadFile() {
    if (!fileEl || fileEl.preload === "auto") return;
    fileEl.preload = "auto";
    fileEl.load();
  }
  if (fileEl) {
    if (document.readyState === "complete") preloadFile();
    else window.addEventListener("load", preloadFile);

    // Keep the button in sync with what the audio element is really doing.
    fileEl.addEventListener("playing", function () {
      if (mode !== "file") return;
      soundOn = true; setUI(true); disarm();
    });
    fileEl.addEventListener("pause", function () {
      if (mode !== "file") return;
      soundOn = false; setUI(false);
      if (playing) arm();   // paused by the browser, not by the visitor: resume on the next tap or click
    });
  }

  // Starts the music. If the browser blocks sound, the next click, tap or key press tries again.
  function play() {
    var my = ++attempt;
    playing = true;

    if (fileEl && mode !== "synth") {
      preloadFile();
      fileEl.volume = VOLUME;
      var p;
      try { p = fileEl.play(); } catch (e) { p = Promise.reject(e); }
      return Promise.resolve(p).then(function () {
        if (my !== attempt) return true;
        mode = "file";
        if (!playing) { fileEl.pause(); return false; }
        soundOn = true; setUI(true); disarm();
        return true;
      }, function (err) {
        if (my !== attempt) return false;
        if (err && (err.name === "NotAllowedError" || err.name === "AbortError")) { waitForTap(); return false; }
        mode = "synth";                      // file missing or unsupported: use generated music
        return playing ? playSynth(my) : false;
      });
    }
    mode = "synth";
    return playSynth(my);
  }

  function playSynth(my) {
    if (!AC) { fail(); return Promise.resolve(false); }
    if (!ctx) buildGraph();
    ctx.resume();
    // a context the browser hasn't allowed yet stays "suspended"
    return new Promise(function (res) {
      setTimeout(function () {
        if (my !== attempt) return res(false);
        if (ctx.state === "running" && playing) { startSynth(); soundOn = true; setUI(true); disarm(); res(true); }
        else { waitForTap(); res(false); }
      }, 150);
    });
  }

  function waitForTap() { soundOn = false; setUI(false); arm(); }

  function pause() {
    attempt++;
    playing = false; soundOn = false; setUI(false); disarm();
    if (mode === "synth") stopSynth();
    else if (fileEl) fileEl.pause();
  }

  function fail() {
    playing = false; soundOn = false; setUI(false); disarm();
    if (window.portfolioToast) window.portfolioToast("Music is not supported in this browser");
  }

  btn.addEventListener("click", function () {
    if (soundOn) { pause(); setPref("off"); }
    else { play(); setPref("on"); }
  });

  // Retry on the next real interaction. Only these events let a page start sound in every
  // browser (a touch "pointerdown" does not), so music starts on the first tap or click.
  var EVENTS = ["click", "touchend", "keydown"], armed = false;
  function onInteract(e) {
    if (e.target && e.target.closest && e.target.closest("#music-btn, #intro")) return; // their own handlers decide
    if (playing && !soundOn) play();
  }
  function arm() {
    if (armed) return;
    armed = true;
    EVENTS.forEach(function (t) { window.addEventListener(t, onInteract, true); });
  }
  function disarm() {
    if (!armed) return;
    armed = false;
    EVENTS.forEach(function (t) { window.removeEventListener(t, onInteract, true); });
  }

  // Music keeps playing when the visitor switches tabs or windows; only the button stops it.

  /* --------------------------------------------------------- welcome page */
  // Shown once per visit (the class is set in <head> before the page paints). Entering is the
  // interaction browsers require, so the music starts right away for every visitor.
  var intro = document.getElementById("intro");
  var root = document.documentElement;
  var behind = [".skip", "#nav", "main", ".footer"].map(function (s) { return document.querySelector(s); }).filter(Boolean);
  var introOpen = false;

  function closeIntro() {
    if (!introOpen) return;
    introOpen = false;
    try { sessionStorage.setItem("entered", "1"); } catch (e) {}
    behind.forEach(function (el) { el.inert = false; });
    var quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    intro.classList.add("leaving");
    setTimeout(function () { root.classList.remove("show-intro"); intro.classList.remove("leaving"); }, quick ? 0 : 550);
  }
  function enter() {
    if (!introOpen) return;
    play(); setPref("on");                   // inside the visitor's click, so the browser allows the sound
    closeIntro();
  }

  if (intro && root.classList.contains("show-intro")) {
    introOpen = true;
    if (!cfg.autoStart) {
      closeIntro();                          // music isn't set to start by itself: no need for the page
    } else {
      // greeting in the visitor's own time of day
      var hr = new Date().getHours();
      var hello = document.getElementById("intro-hello");
      if (hello) hello.textContent = (hr < 5 ? "Good evening" : hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening") + ", welcome to my portfolio";

      behind.forEach(function (el) { el.inert = true; });
      intro.addEventListener("click", enter);          // the button, or anywhere on the page
      document.addEventListener("keydown", function (e) {
        if (introOpen && (e.key === "Enter" || e.key === " " || e.key === "Escape")) { e.preventDefault(); enter(); }
      });
      setTimeout(function () { document.getElementById("intro-enter").focus({ preventScroll: true }); }, 0);
    }
  }

  // Auto start: try right away (works when the browser allows sound for this site);
  // if it's blocked, the welcome screen's Enter or the first click, tap or key press starts it.
  var pref = getPref();
  if (pref === "on" || (cfg.autoStart && pref !== "off")) play();
})();
