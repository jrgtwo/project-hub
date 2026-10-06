/* Shared markup + beat-arc geometry for the palette mockups. Each palette file
   sets window.PALETTE_NAME and links _layout.css + its own :root tokens. Beat
   colors are read from the palette's --beat / --beat-accent vars. */
(function () {
  document.body.innerHTML = `
    <div class="app">
      <header>
        <span class="brand">
          <svg class="mascot-mark" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="hsl(var(--primary))"/>
            <path d="M20 20 38 11a18 18 0 0 1 0 18L20 20Z" fill="hsl(var(--foreground))"/>
            <circle cx="13" cy="14" r="2.3" fill="hsl(var(--foreground))"/>
          </svg>
          <span class="wordmark">metro<span class="nom">nomnom</span></span>
        </span>
        <span class="head-right">
          <button class="icon-btn" title="theme"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>
          <button class="calibrate"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>Calibrate</button>
        </span>
      </header>
      <main>
        <div class="arc" id="arc">
          <div class="readout" id="readout">
            <div class="bpm">120</div>
            <div class="bpm-label">BPM · 4/4</div>
          </div>
          <svg class="hero" id="hero" viewBox="0 0 120 120">
            <ellipse cx="60" cy="112" rx="32" ry="5" fill="hsl(var(--foreground))" opacity="0.08"/>
            <circle cx="60" cy="64" r="46" fill="hsl(var(--primary))"/>
            <path d="M60 64 100 40 A46 46 0 0 1 100 88 Z" fill="hsl(var(--foreground))"/>
            <circle cx="44" cy="42" r="8" fill="hsl(var(--card))"/><circle cx="46" cy="43" r="4" fill="hsl(var(--foreground))"/>
            <circle cx="68" cy="40" r="8" fill="hsl(var(--card))"/><circle cx="70" cy="41" r="4" fill="hsl(var(--foreground))"/>
            <circle cx="33" cy="74" r="6" fill="hsl(var(--accent2))" opacity="0.55"/>
          </svg>
        </div>
        <div class="bpmctl">
          <button class="round-sm">−</button>
          <div class="slider"><div class="fill fill-amber" style="width:46%"></div><div class="knob knob-amber" style="left:46%"></div></div>
          <button class="round-sm">+</button>
        </div>
        <button class="transport"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
      </main>
      <footer>
        <div class="seg"><button>2/4</button><button>3/4</button><button class="on">4/4</button><button>6/8</button></div>
        <div class="row">
          <span class="label">Feel</span>
          <div class="seg"><button class="on">♩</button><button>♪♪</button><button>3</button><button>16</button></div>
        </div>
        <div class="row">
          <span class="label">Vol</span>
          <div class="vol-wrap"><div class="slider"><div class="fill fill-mint" style="width:70%"></div><div class="knob knob-mint" style="left:70%"></div></div></div>
        </div>
        <div class="ad">HOUSE AD · removed with “remove ads”</div>
      </footer>
    </div>
    <div class="tag">${window.PALETTE_NAME || ''}</div>
  `;

  var MAIN_LEN = 40, MAIN_LEN_ACCENT = 56, MAIN_W = 16, SUB_LEN = 18, SUB_W = 6;
  var MARGIN = 8, SPACING = 22, MAX_SPAN = (265 * Math.PI) / 180, R_MIN = 64, R_MAX = 150;
  var beats = 4, accents = [0], subsPerBeat = 2, currentBeat = 0, currentSub = 0, running = true;
  var arc = document.getElementById('arc');
  var width = Math.min(380, arc.clientWidth || 380);
  var cs = getComputedStyle(document.documentElement);
  var BEAT = 'hsl(' + cs.getPropertyValue('--beat').trim() + ')';
  var ACC = 'hsl(' + cs.getPropertyValue('--beat-accent').trim() + ')';
  var beatHsl = cs.getPropertyValue('--beat').trim();
  var accHsl = cs.getPropertyValue('--beat-accent').trim();

  var items = [];
  for (var b = 0; b < beats; b++) {
    items.push({ sub: false, accent: accents.indexOf(b) >= 0, on: running && currentBeat === b });
    for (var s = 1; s < subsPerBeat; s++) items.push({ sub: true, accent: false, on: running && currentBeat === b && currentSub === s });
  }
  var n = items.length;
  var R = Math.max(R_MIN, Math.min(R_MAX, width / 2 - MAIN_LEN_ACCENT - MARGIN));
  var cx = width / 2, cy = MARGIN + R + MAIN_LEN_ACCENT;
  var step = n > 1 ? SPACING / R : 0;
  if ((n - 1) * step > MAX_SPAN) step = MAX_SPAN / (n - 1);
  var k = n > 1 ? Math.max(0.4, Math.min(1, (step * R) / SPACING)) : 1;
  var span = (n - 1) * step, start = -Math.PI / 2 - span / 2;
  arc.style.height = (cy + 130) + 'px';

  items.forEach(function (it, i) {
    var a = start + i * step;
    var len = (it.sub ? SUB_LEN : it.accent ? MAIN_LEN_ACCENT : MAIN_LEN) * k;
    var w = (it.sub ? SUB_W : MAIN_W) * k;
    var rad = R + len / 2;
    var el = document.createElement('div');
    el.className = 'pill';
    el.style.width = w + 'px'; el.style.height = len + 'px';
    el.style.left = (cx + rad * Math.cos(a)) + 'px';
    el.style.top = (cy + rad * Math.sin(a)) + 'px';
    el.style.transform = 'translate(-50%,-50%) rotate(' + ((a * 180) / Math.PI + 90) + 'deg)';
    if (it.sub) { el.style.background = it.on ? BEAT : 'hsl(' + beatHsl + ' / 0.18)'; }
    else if (it.on) {
      if (it.accent) { el.style.background = ACC; el.style.boxShadow = '0 0 22px -2px ' + ACC; }
      else { el.style.background = BEAT; el.style.boxShadow = '0 0 18px -4px ' + BEAT; }
    } else { el.style.background = it.accent ? 'hsl(' + accHsl + ' / 0.32)' : 'hsl(' + beatHsl + ' / 0.18)'; }
    arc.appendChild(el);
  });

  var ro = document.getElementById('readout');
  ro.style.left = cx + 'px'; ro.style.top = cy + 'px'; ro.style.transform = 'translate(-50%,-50%)';
  var hero = document.getElementById('hero');
  hero.style.left = cx + 'px'; hero.style.top = (cy + 46) + 'px';
})();
