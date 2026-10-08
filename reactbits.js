/*
 * Port JavaScript biasa (tanpa React) dari komponen React Bits — https://reactbits.dev
 *   - CountUp           (src/content/TextAnimations/CountUp)
 *   - TextType          (src/content/TextAnimations/TextType)
 *   - AccordionGallery  (src/content/Components/AccordionGallery)
 *
 * Copyright (c) 2026 David Haz
 * MIT + Commons Clause License Condition v1.0
 * https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md
 */

// CountUp: angka naik memakai pegas dengan damping/stiffness yang sama seperti versi React
// (useSpring dari motion). Mulai saat elemen terlihat, sekali saja.
function countUp(node, { to, from = 0, duration = 2, delay = 0, format = String }) {
  node.textContent = format(from);
  const done = () => (node.textContent = format(to));
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return done();

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const run = () => {
    let x = from, v = 0, last = performance.now();
    const step = (now) => {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;
      v += (-stiffness * (x - to) - damping * v) * dt; // massa 1, Euler semi-implisit
      x += v * dt;
      if (format(x) === format(to) && Math.abs(v) < 0.05) return done();
      node.textContent = format(x);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    setTimeout(run, delay * 1000);
  });
  io.observe(node);
}

// TextType: teks diketik huruf demi huruf; dengan loop, teks dihapus lalu kalimat berikutnya diketik.
// Kursor berkedip memakai GSAP seperti versi React. Jika gerakan dikurangi, teks langsung tampil utuh.
function textType(node, options = {}) {
  const o = {
    text: "",
    typingSpeed: 50,
    initialDelay: 0,
    pauseDuration: 2000,
    deletingSpeed: 30,
    loop: true,
    showCursor: true,
    cursorCharacter: "|",
    cursorClassName: "",
    cursorBlinkDuration: 0.5,
    variableSpeed: null,
    ...options,
  };
  const texts = Array.isArray(o.text) ? o.text : [o.text];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  node.classList.add("text-type");
  const content = document.createElement("span");
  content.className = "text-type__content";
  node.append(content);

  if (o.showCursor) {
    const cursor = document.createElement("span");
    cursor.className = `text-type__cursor ${o.cursorClassName}`.trim();
    cursor.textContent = o.cursorCharacter;
    node.append(cursor);
    if (window.gsap && !reduced) {
      gsap.set(cursor, { opacity: 1 });
      gsap.to(cursor, { opacity: 0, duration: o.cursorBlinkDuration, repeat: -1, yoyo: true, ease: "power2.inOut" });
    }
  }

  if (reduced) {
    content.textContent = texts[texts.length - 1];
    return;
  }

  let index = 0, shown = "";
  const speed = () =>
    o.variableSpeed ? Math.random() * (o.variableSpeed.max - o.variableSpeed.min) + o.variableSpeed.min : o.typingSpeed;
  const type = () => {
    const full = texts[index];
    if (shown.length < full.length) {
      content.textContent = shown = full.slice(0, shown.length + 1);
      return setTimeout(type, speed());
    }
    if (!o.loop && index === texts.length - 1) return;
    setTimeout(erase, o.pauseDuration);
  };
  const erase = () => {
    if (shown) {
      content.textContent = shown = shown.slice(0, -1);
      return setTimeout(erase, o.deletingSpeed);
    }
    index = (index + 1) % texts.length;
    setTimeout(type, o.initialDelay);
  };
  setTimeout(type, o.initialDelay);
}

// AccordionGallery: panel melebar saat dipilih, panel lain miring (tilt), media bergeser
// (parallax) dan menjadi abu-abu. Bekerja pada DOM yang sudah ada:
//   root > .ag-panel > (.ag-panel__frame > .ag-panel__media) + .ag-tab + .ag-panel__label > (.ag-panel__bar + .ag-panel__text)
// Keadaan akhir juga diatur lewat kelas CSS, jadi tanpa GSAP galeri tetap berfungsi (tanpa animasi).
function AccordionGallery(root, options = {}) {
  const o = {
    defaultIndex: 0,
    expandRatio: 0.52,
    duration: 0.6,
    ease: "power3.out",
    parallax: 0.5,
    tilt: 8,
    stagger: 0.06,
    trigger: "hover",
    grayscale: true,
    gap: 10,
    onChange: null,
    ...options,
  };
  const panels = [...root.querySelectorAll(":scope > .ag-panel")];
  const count = panels.length;
  if (!count) return null;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const r = clamp(o.expandRatio, 0.2, 0.9);
  const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
  let active = clamp(o.defaultIndex, 0, count - 1);
  let tl = null, first = true, mediaSize = 320;

  root.classList.add("accordion-gallery");
  root.style.setProperty("--ag-gap", `${o.gap}px`);
  root.style.setProperty("--ag-grow", grow);

  function apply(animate) {
    const dur = animate && !reduced ? o.duration : 0;
    if (tl) tl.kill();
    tl = window.gsap ? gsap.timeline() : null;

    panels.forEach((panel, i) => {
      const isActive = i === active;
      panel.classList.toggle("ag-panel--active", isActive);
      const tab = panel.querySelector(".ag-tab");
      if (tab) tab.setAttribute("aria-expanded", String(isActive));
      const label = panel.querySelector(".ag-panel__label");
      if (label) label.inert = !isActive;
      if (!tl) return;

      const media = panel.querySelector(".ag-panel__media");
      const bar = panel.querySelector(".ag-panel__bar");
      const text = panel.querySelector(".ag-panel__text");
      const rot = isActive ? 0 : i < active ? o.tilt : -o.tilt;

      tl.to(panel, { flexGrow: isActive ? grow : 1, rotateY: rot, "--ag-dim": isActive ? 0 : 0.35, duration: dur, ease: o.ease }, 0);
      if (media) {
        const drift = clamp(active - i, -1.5, 1.5);
        const shift = drift * o.parallax * mediaSize * 0.06;
        tl.to(media, { x: isActive ? 0 : shift, "--ag-gray": o.grayscale ? (isActive ? 0 : 1) : 0, duration: dur, ease: o.ease }, 0);
      }
      if (bar && text) {
        if (isActive) tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease: o.ease, stagger: reduced ? 0 : o.stagger }, 0);
        else tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease: o.ease }, 0);
      }
    });
  }

  function measure() {
    const width = root.getBoundingClientRect().width;
    const usable = Math.max(width - o.gap * (count - 1), 120);
    mediaSize = Math.max(140, usable * r * 1.22);
    root.style.setProperty("--ag-media-size", `${mediaSize}px`);
    // Lebar isi panel dikunci ke lebar panel saat terbuka, agar teks tidak mengalir ulang selama animasi.
    root.style.setProperty("--ag-open-size", `${usable * (grow / (grow + count - 1))}px`);
    apply(!first);
  }

  function setActive(i) {
    i = clamp(i, 0, count - 1);
    if (i === active) return;
    active = i;
    apply(true);
    if (typeof o.onChange === "function") o.onChange(i);
  }

  panels.forEach((panel, i) => {
    if (o.trigger === "hover") panel.addEventListener("mouseenter", () => setActive(i));
    panel.addEventListener("click", (e) => {
      if (i !== active) {
        e.preventDefault();
        setActive(i);
      }
    });
    panel.addEventListener("keydown", (e) => {
      if (!e.target.classList.contains("ag-tab")) return;
      const next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!next) return;
      e.preventDefault();
      const j = (i + next + count) % count;
      setActive(j);
      panels[j].querySelector(".ag-panel__label a, .ag-panel__label button")?.focus({ preventScroll: true });
    });
  });

  new ResizeObserver(measure).observe(root);
  measure();
  first = false;

  return {
    setActive,
    get active() {
      return active;
    },
  };
}
