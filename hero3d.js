// Objek 3D interaktif di bagian pembuka: keyboard melayang. Tiap tombol = satu teknologi
// dari data.keahlian, warnanya mengikuti grup. Memakai Three.js r128 dari CDN.
(function () {
  const stage = document.getElementById("heroStage");
  const canvas = document.getElementById("heroCanvas");
  if (!stage || !canvas) return;
  const fail = () => stage.classList.add("no-3d");
  if (!window.THREE) return fail();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    return fail();
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  const board = new THREE.Group();
  scene.add(board);

  const portfolio = typeof data !== "undefined" ? data : { keahlian: [], proyek: [], tautan: [] };
  const githubBase = (portfolio.tautan.find((t) => t.label === "GitHub") || {}).url || "https://github.com/Zidanman01";
  const techs = portfolio.keahlian.flatMap((g, gi) => g.item.map((t) => ({ ...t, grup: g.grup, gi, press: 0, typeUntil: 0 })));
  const labelLayer = document.getElementById("techLabels");
  const panel = document.getElementById("techPanel");
  let selected = -1, hoverPointer = -1, hoverFocus = -1;

  // Tata letak: tiap grup mulai di baris baru, dibungkus maksimal 7 unit per baris.
  // Lebar tombol mengikuti panjang nama, seperti tombol Shift/Spasi di keyboard asli.
  const U = 0.62, GAP = 0.08, KEY_H = 0.24, BEVEL = 0.035, MAX_UNITS = 7;
  const unitsFor = (name) => (name.length <= 4 ? 1 : name.length <= 8 ? 1.5 : name.length <= 12 ? 2 : 2.75);
  const rows = [];
  let row = null;
  techs.forEach((t) => {
    t.units = unitsFor(t.nama);
    if (!row || row.gi !== t.gi || row.units + t.units > MAX_UNITS) rows.push((row = { gi: t.gi, keys: [], units: 0 }));
    row.keys.push(t);
    row.units += t.units;
  });
  const maxUnits = Math.max(1, ...rows.map((r) => r.units));

  function roundedBox(w, d, h, r) {
    const x = -w / 2, y = -d / 2;
    const s = new THREE.Shape();
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + d - r);
    s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
    s.lineTo(x + r, y + d);
    s.quadraticCurveTo(x, y + d, x, y + d - r);
    s.lineTo(x, y + r);
    s.quadraticCurveTo(x, y, x + r, y);
    const g = new THREE.ExtrudeGeometry(s, { depth: h, bevelEnabled: true, bevelThickness: BEVEL, bevelSize: BEVEL, bevelSegments: 3, curveSegments: 6 });
    g.rotateX(-Math.PI / 2); // arah ekstrusi jadi ke atas (sumbu Y)
    return g;
  }

  rows.forEach((rw, ri) => {
    let x = (-rw.units * U) / 2;
    const z = (ri - (rows.length - 1) / 2) * U;
    rw.keys.forEach((t) => {
      const w = t.units * U;
      t.key = new THREE.Group();
      t.key.position.set(x + w / 2, 0, z);
      x += w;

      t.body = new THREE.Mesh(
        roundedBox(w - GAP - 2 * BEVEL, U - GAP - 2 * BEVEL, KEY_H, 0.06),
        new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.05 })
      );
      t.body.userData.i = techs.indexOf(t);

      // Legenda tombol digambar di kanvas lalu ditempel di permukaan atas.
      t.canvas = document.createElement("canvas");
      t.canvas.width = Math.round((w - GAP) * 256);
      t.canvas.height = Math.round((U - GAP) * 256);
      t.tex = new THREE.CanvasTexture(t.canvas);
      t.tex.anisotropy = maxAniso;
      const legend = new THREE.Mesh(
        new THREE.PlaneGeometry(w - GAP, U - GAP),
        new THREE.MeshBasicMaterial({ map: t.tex, transparent: true, depthWrite: false })
      );
      legend.rotation.x = -Math.PI / 2;
      legend.position.y = KEY_H + BEVEL + 0.002;

      t.key.add(t.body, legend);
      board.add(t.key);
    });
  });

  const plateMat = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.1 });
  const plate = new THREE.Mesh(roundedBox(maxUnits * U + 0.3, rows.length * U + 0.3, 0.18, 0.18), plateMat);
  plate.position.y = -0.24;
  board.add(plate);

  // Tombol HTML tersembunyi agar keyboard 3D tetap bisa dipakai dengan Tab dan pembaca layar.
  techs.forEach((t, i) => {
    t.label = document.createElement("button");
    t.label.type = "button";
    t.label.className = "tech-label";
    t.label.textContent = t.nama;
    t.label.setAttribute("aria-pressed", "false");
    t.label.setAttribute("aria-label", `${t.nama}, dipakai di ${t.repo.length} proyek`);
    t.label.addEventListener("click", () => select(i));
    t.label.addEventListener("focus", () => (hoverFocus = i));
    t.label.addEventListener("blur", () => hoverFocus === i && (hoverFocus = -1));
    labelLayer.append(t.label);
  });

  function select(i) {
    selected = i;
    techs.forEach((t, j) => t.label.setAttribute("aria-pressed", String(j === i)));
    renderPanel(techs[i]);
  }

  function deselect() {
    if (selected < 0) return;
    const btn = techs[selected].label;
    selected = -1;
    techs.forEach((t) => t.label.setAttribute("aria-pressed", "false"));
    panel.hidden = true;
    stage.classList.remove("has-panel");
    btn.focus({ preventScroll: true });
  }

  function renderPanel(t) {
    const make = (tag, props) => Object.assign(document.createElement(tag), props);
    const list = make("ul", { className: "tech-repos" });
    t.repo.forEach((repo) => {
      const proj = portfolio.proyek.find((p) => p.kode.split("/").pop().toLowerCase() === repo.toLowerCase());
      const li = make("li", {});
      if (proj) {
        const b = make("button", { type: "button", className: "tech-repo featured" });
        b.append(make("span", { textContent: proj.judul }), make("small", { textContent: "Lihat detail" }));
        b.addEventListener("click", () => window.bukaProyek && window.bukaProyek(repo));
        li.append(b);
      } else {
        const a = make("a", { className: "tech-repo", href: `${githubBase}/${repo}`, target: "_blank", rel: "noopener" });
        a.append(make("span", { textContent: repo }), make("small", { textContent: "GitHub" }));
        li.append(a);
      }
      list.append(li);
    });
    const close = make("button", { type: "button", className: "tech-close", textContent: "Tutup" });
    close.addEventListener("click", deselect);
    panel.replaceChildren(
      make("h3", { textContent: t.nama }),
      make("p", { textContent: `${t.grup}, dipakai di ${t.repo.length} proyek` }),
      list,
      close
    );
    panel.hidden = false;
    stage.classList.add("has-panel");
  }

  document.addEventListener("keydown", (e) => e.key === "Escape" && deselect());

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const keyLight = new THREE.DirectionalLight(0xffffff, 0.75);
  keyLight.position.set(-3, 6, 5);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.25);
  rimLight.position.set(4, -2, 3);
  scene.add(rimLight);

  // Warna mengikuti token CSS, termasuk saat tema berganti. Grup ke-n memakai warna yang sama
  // dengan grupnya di bagian Keahlian.
  const groupTone = ["accent", "merge", "branch"];
  const tone = { accent: new THREE.Color(), branch: new THREE.Color(), ink: new THREE.Color(), merge: new THREE.Color() };
  let accentInk = "#ffffff";

  function drawLegend(t) {
    const c = t.canvas, g = c.getContext("2d"), pad = c.height * 0.16;
    const font = (px) => `700 ${px}px "Instrument Sans", system-ui, sans-serif`;
    let size = 52;
    g.clearRect(0, 0, c.width, c.height);
    g.font = font(size);
    const fit = (c.width - pad * 2) / g.measureText(t.nama).width;
    if (fit < 1) g.font = font((size = Math.floor(size * fit)));
    g.fillStyle = groupTone[t.gi % groupTone.length] === "accent" ? accentInk : "#0b1020";
    g.textBaseline = "top";
    g.fillText(t.nama, pad, pad);
    t.tex.needsUpdate = true;
  }

  function readTokens() {
    const cs = getComputedStyle(document.documentElement);
    for (const k of Object.keys(tone)) tone[k].set(cs.getPropertyValue("--" + k).trim() || "#888888");
    accentInk = cs.getPropertyValue("--accent-ink").trim() || "#ffffff";
    plateMat.color.copy(tone.ink);
    techs.forEach((t) => {
      const c = tone[groupTone[t.gi % groupTone.length]];
      t.body.material.color.copy(c);
      t.body.material.emissive.copy(c);
      drawLegend(t);
    });
  }
  readTokens();
  if (document.fonts) document.fonts.load('700 52px "Instrument Sans"').then(() => techs.forEach(drawLegend));
  new MutationObserver(readTokens).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readTokens);

  // Input: kursor memiringkan keyboard, seret untuk memutar, klik tombol untuk memilih.
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const bodies = techs.map((t) => t.body);
  function pick(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(bodies)[0];
    return hit ? hit.object.userData.i : -1;
  }

  const pointer = { nx: 0, ny: 0 };
  let dragging = false, downX = 0, downY = 0, lastX = 0, dragYaw = 0;
  const clamp = (v, a) => Math.max(-a, Math.min(a, v));

  window.addEventListener(
    "pointermove",
    (e) => {
      const r = canvas.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      const near = Math.abs(nx) < 1.5 && Math.abs(ny) < 1.5;
      pointer.nx = near ? clamp(nx, 1) : 0;
      pointer.ny = near ? clamp(ny, 1) : 0;
      if (dragging) {
        dragYaw = clamp(dragYaw + (e.clientX - lastX) * 0.006, 0.6);
        lastX = e.clientX;
      }
    },
    { passive: true }
  );
  canvas.addEventListener("pointermove", (e) => {
    if (dragging) return;
    hoverPointer = pick(e);
    canvas.style.cursor = hoverPointer >= 0 ? "pointer" : "";
  });
  canvas.addEventListener("pointerleave", () => (hoverPointer = -1));
  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    downX = lastX = e.clientX;
    downY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointerup", (e) => {
    dragging = false;
    if (Math.hypot(e.clientX - downX, e.clientY - downY) < 6) {
      const i = pick(e);
      if (i >= 0) select(i);
    }
  });
  canvas.addEventListener("pointercancel", () => (dragging = false));

  // Ukuran: jarak kamera diatur agar keyboard memenuhi kanvas.
  // Perkecil angka tambahan di FIT_W/FIT_H agar keyboard makin besar (risiko terpotong saat dimiringkan).
  const BASE_PITCH = 0.8, BASE_YAW = -0.15;
  let pitch = BASE_PITCH, yaw = BASE_YAW, nextType = 0;
  const FIT_W = maxUnits * U + 1.5, FIT_H = rows.length * U + 0.4;
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.position.z = Math.max(FIT_H / 2 / t, FIT_W / 2 / t / camera.aspect);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  let visible = true;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(stage);

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const calm = reduceMotion.matches;

    if (!dragging) dragYaw *= 0.96;
    yaw += (BASE_YAW + pointer.nx * 0.18 + dragYaw - yaw) * 0.06;
    pitch += (BASE_PITCH + pointer.ny * 0.12 - pitch) * 0.06;
    board.rotation.set(pitch, yaw, 0);
    board.position.y = calm ? 0 : Math.sin(now / 1400) * 0.06;

    // Tombol acak tertekan sesekali, seperti ada yang sedang mengetik.
    if (!calm && selected < 0 && techs.length && now > nextType) {
      techs[Math.floor(Math.random() * techs.length)].typeUntil = now + 130;
      nextType = now + 180 + Math.random() * 700;
    }

    const hover = hoverFocus >= 0 ? hoverFocus : hoverPointer;
    techs.forEach((t, i) => {
      const target = i === selected ? 1 : i === hover ? 0.45 : now < t.typeUntil ? 0.8 : 0;
      t.press += (target - t.press) * (calm ? 1 : 0.35);
      t.key.position.y = -t.press * 0.13;
      t.body.material.emissiveIntensity = i === selected ? 0.4 : i === hover ? 0.22 : 0;
    });
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
})();
