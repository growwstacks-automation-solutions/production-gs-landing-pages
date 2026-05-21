// AI Voice Agent neon-ring orb animation for the homepage hero.
(function () {
  function initOrb() {
    const wrap = document.getElementById('gs-orb');
    if (!wrap) return;

    const ring     = document.getElementById('orbRing');
    const ringCore = document.getElementById('orbRingCore');
    const highlight= document.getElementById('orbHighlight');
    const haloOuter= document.getElementById('orbHaloOuter');
    const atmo     = document.getElementById('orbAtmo');

    const ribbons = [
      { el: document.getElementById('ribbon1'), freq: 1.1, phase: 0,    amp: 1.0, yOff: -22, bandStart: 0.00, bandEnd: 0.25 },
      { el: document.getElementById('ribbon2'), freq: 1.4, phase: 1.2,  amp: 0.85,yOff: -8,  bandStart: 0.15, bandEnd: 0.40 },
      { el: document.getElementById('ribbon3'), freq: 0.9, phase: 2.4,  amp: 0.7, yOff: 6,   bandStart: 0.30, bandEnd: 0.55 },
      { el: document.getElementById('ribbon4'), freq: 1.7, phase: 3.6,  amp: 0.55,yOff: 20,  bandStart: 0.45, bandEnd: 0.75 },
      { el: document.getElementById('ribbon5'), freq: 1.25,phase: 4.8,  amp: 0.45,yOff: -36, bandStart: 0.05, bandEnd: 0.30 },
    ];

    if (!ring || ring.getAttribute('d')) return;

    const cx = 260, cy = 260;
    const baseR = 158;
    const POINTS = 80;

    const ringOffsets = [];
    for (let i = 0; i < POINTS; i++) {
      ringOffsets.push({ a: Math.random() * Math.PI * 2, b: Math.random() * Math.PI * 2, smooth: 0 });
    }

    function buildClosedSmoothPath(radii) {
      const pts = [];
      for (let i = 0; i < POINTS; i++) {
        const ang = (i / POINTS) * Math.PI * 2 - Math.PI / 2;
        pts.push({ x: cx + Math.cos(ang) * radii[i], y: cy + Math.sin(ang) * radii[i] });
      }
      let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
      for (let i = 0; i < POINTS; i++) {
        const p0 = pts[(i - 1 + POINTS) % POINTS];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % POINTS];
        const p3 = pts[(i + 2) % POINTS];
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
      }
      return d + ' Z';
    }

    function buildRibbonPath(t, ribbon) {
      const SAMPLES = 64;
      const startX = cx - baseR - 30;
      const endX   = cx + baseR + 30;
      const centerY = cy + ribbon.yOff;

      let bandEnergy = 0;
      let bandBuckets = null;
      if (analyser && dataArray && audioLevel > 0.01) {
        const bStart = Math.floor(dataArray.length * ribbon.bandStart);
        const bEnd   = Math.floor(dataArray.length * ribbon.bandEnd);
        bandBuckets  = dataArray.slice(bStart, bEnd);
        let sum = 0;
        for (let i = 0; i < bandBuckets.length; i++) sum += bandBuckets[i];
        bandEnergy = Math.min(1, (sum / bandBuckets.length / 255) * 3.5);
        bandEnergy *= Math.min(1, audioLevel * 4);
      }

      if (bandEnergy < 0.01) {
        return `M ${startX.toFixed(2)} ${centerY.toFixed(2)} L ${endX.toFixed(2)} ${centerY.toFixed(2)}`;
      }

      const sensitivity = bandEnergy * 90;
      let d = '';
      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES;
        const x = startX + (endX - startX) * u;
        let bucketVal = 0;
        if (bandBuckets && bandBuckets.length) {
          const idx = Math.min(bandBuckets.length - 1, Math.floor(u * bandBuckets.length));
          bucketVal = (bandBuckets[idx] / 255) * 2 - 0.5;
        }
        const voice =
          bucketVal * sensitivity +
          Math.sin(u * Math.PI * 6 + t * 3 + ribbon.phase) * bandEnergy * 35 +
          Math.sin(u * Math.PI * 11 - t * 2 + ribbon.phase) * bandEnergy * 18;
        const envelope = Math.sin(u * Math.PI);
        const y = centerY + voice * envelope;
        d += (i === 0 ? 'M ' : ' L ') + x.toFixed(2) + ' ' + y.toFixed(2);
      }
      return d;
    }

    function buildHighlightArc(rotationOffset, deformation) {
      const a1 = -Math.PI * 0.95 + rotationOffset;
      const a2 = -Math.PI * 0.35 + rotationOffset;
      const STEPS = 30;
      let d = '';
      for (let i = 0; i <= STEPS; i++) {
        const u = i / STEPS;
        const ang = a1 + (a2 - a1) * u;
        const r = baseR + deformation * Math.sin(u * Math.PI * 2);
        const x = cx + Math.cos(ang) * r;
        const y = cy + Math.sin(ang) * r;
        d += (i === 0 ? 'M ' : ' L ') + x.toFixed(2) + ' ' + y.toFixed(2);
      }
      return d;
    }

    let t = 0;
    let audioLevel = 0;
    let targetLevel = 0;
    let bassLevel = 0;
    let analyser = null;
    let dataArray = null;
    let timeArray = null;
    let micAttempted = false;
    let running = true;
    let rafId = null;

    const NEAR_THRESHOLD = 0.08;
    const FAR_FLOOR      = 0.04;

    function animate() {
      t += 0.018;
      audioLevel += (targetLevel - audioLevel) * 0.32;

      if (analyser && dataArray && timeArray) {
        analyser.getByteFrequencyData(dataArray);
        analyser.getByteTimeDomainData(timeArray);

        let peak = 0;
        for (let i = 0; i < timeArray.length; i++) {
          const amp = Math.abs(timeArray[i] - 128) / 128;
          if (amp > peak) peak = amp;
        }

        let proximityGain;
        if (peak < NEAR_THRESHOLD) {
          proximityGain = 0;
        } else {
          proximityGain = (peak - NEAR_THRESHOLD) / (1 - NEAR_THRESHOLD);
          proximityGain = Math.min(1, proximityGain * 2.5);
        }

        let sum = 0, bass = 0;
        const bassEnd = Math.floor(dataArray.length * 0.2);
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
          if (i < bassEnd) bass += dataArray[i];
        }
        const rawLevel = Math.min(1, (sum / dataArray.length / 255) * 7);
        const rawBass  = Math.min(1, (bass / bassEnd / 255) * 4.5);

        targetLevel = rawLevel * proximityGain;
        bassLevel   = rawBass  * proximityGain;
        if (targetLevel < FAR_FLOOR) targetLevel = 0;
        if (bassLevel   < FAR_FLOOR) bassLevel   = 0;
      } else {
        targetLevel = 0;
        bassLevel   = 0;
      }

      const radii = [];
      if (audioLevel > 0.01) {
        const voiceAmp = audioLevel * 22;
        for (let i = 0; i < POINTS; i++) {
          const o = ringOffsets[i];
          const voice = Math.sin(t * 3.2 + i * 0.4) * audioLevel * 0.8;
          const target = voice * voiceAmp;
          o.smooth += (target - o.smooth) * 0.2;
          radii.push(baseR + bassLevel * 8 + o.smooth);
        }
      } else {
        for (let i = 0; i < POINTS; i++) {
          const o = ringOffsets[i];
          o.smooth += (0 - o.smooth) * 0.15;
          radii.push(baseR + o.smooth);
        }
      }
      const ringPath = buildClosedSmoothPath(radii);
      ring.setAttribute('d', ringPath);
      const radiiCore = radii.map(r => r - 1.5);
      ringCore.setAttribute('d', buildClosedSmoothPath(radiiCore));

      ribbons.forEach(rb => {
        if (rb.el) rb.el.setAttribute('d', buildRibbonPath(t, rb));
      });

      if (audioLevel > 0.01) {
        const hlIntensity = audioLevel * 0.9;
        highlight.setAttribute('d', buildHighlightArc(Math.sin(t * 0.3) * 0.25, 2 + audioLevel * 4));
        highlight.setAttribute('opacity', hlIntensity.toFixed(3));
      } else {
        highlight.setAttribute('opacity', '0');
      }

      haloOuter.setAttribute('r', (175 + audioLevel * 12).toFixed(1));
      haloOuter.setAttribute('opacity', (0.22 + audioLevel * 0.35).toFixed(3));
      atmo.setAttribute('opacity', (0.55 + audioLevel * 0.35).toFixed(3));

      const readoutEl = document.getElementById('orbReadout');
      if (readoutEl) {
        const isActive = audioLevel > 0.05;
        const textEl = readoutEl.querySelector('.ai-orb-readout-text');
        if (textEl) {
          const newText = isActive ? 'Voice AI · Listening' : 'Voice AI · Standby';
          if (textEl.textContent !== newText) textEl.textContent = newText;
        }
        readoutEl.classList.toggle('is-active', isActive);
      }

      if (running) rafId = requestAnimationFrame(animate);
    }

    async function attemptMic() {
      if (micAttempted) return;
      micAttempted = true;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const source = ctx.createMediaStreamSource(stream);
        analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        analyser.smoothingTimeConstant = 0.55;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        timeArray = new Uint8Array(analyser.fftSize);
        source.connect(analyser);
      } catch (err) {
        // Denied / unavailable — orb stays in ambient mode
      }
    }
    ['click', 'scroll', 'touchstart', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, attemptMic, { once: true, passive: true });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !running) { running = true; animate(); }
        else if (!e.isIntersecting && running) {
          running = false;
          if (rafId) cancelAnimationFrame(rafId);
        }
      });
    }, { threshold: 0.1 });
    io.observe(wrap);

    animate();
  }

  // Defer init until browser is idle so we don't fight LCP for CPU
  function schedule() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initOrb, { timeout: 1500 });
    } else {
      setTimeout(initOrb, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule);
  } else {
    schedule();
  }
})();
