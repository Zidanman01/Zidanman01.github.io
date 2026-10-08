// =====================================================================
//  DATA PORTOFOLIO — ganti semua isi di bawah ini dengan data Anda.
//  Tidak perlu mengubah HTML/CSS; halaman dibangun dari objek ini.
// =====================================================================
const data = {
  nama: "Zidan",
  namaLengkap: "Muhammad Zidan",
  peran: "Mahasiswa Informatika",
  kampus: "Universitas Negeri Jakarta",
  intro:
    "Saya suka membangun aplikasi web yang menyelesaikan masalah nyata, dari alat bantu mengajar untuk guru sampai sistem pendukung keputusan. Biasanya saya bekerja dengan React, PHP, Node.js, dan MySQL, dan mulai memadukan AI ke dalam aplikasi.",
  fakta: [
    { label: "Semester", nilai: "7" },
    { label: "IPK", nilai: "3,87" },
    { label: "Fokus", nilai: "Web Full-stack" },
    { label: "Lokasi", nilai: "Jakarta" },
    { label: "Repo GitHub", nilai: "10 publik" },
  ],
  cv: "#", // ganti dengan link file CV, mis. "cv-zidan.pdf"
  email: "zidan@example.com",
  tautan: [
    { label: "GitHub", url: "https://github.com/Zidanman01" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
    { label: "Instagram", url: "https://instagram.com/" },
  ],

  proyek: [
    {
      judul: "TeacherDesk",
      ringkas: "Aplikasi manajemen pengajaran dengan konsultan dan generator soal AI",
      tahun: 2026,
      kategori: "Full-stack",
      deskripsi:
        "Aplikasi web lokal untuk guru: mengelola mata pelajaran, kelas, jadwal, materi, jurnal mengajar, dan bank soal. Versi 1.4 menambahkan konsultan kurikulum AI dan generator soal pilihan ganda dari dokumen PDF lewat OpenRouter, lengkap dengan level Bloom C1–C6 dan pembahasan otomatis.",
      fitur: [
        "Dashboard jadwal hari ini, progres materi, dan pengingat jurnal",
        "Template jadwal mingguan dengan deteksi jadwal bentrok",
        "Generator soal AI dari PDF (hingga 150 halaman) yang tersimpan ke bank soal",
        "Proteksi CSRF, rate limit, migrasi database, dan backup data",
      ],
      teknologi: ["PHP 8", "MySQL", "OpenRouter AI", "JavaScript", "Composer"],
      demo: "",
      kode: "https://github.com/Zidanman01/teacherDesk",
      bahasa: { PHP: 233798, CSS: 10278, JavaScript: 1825, Hack: 190 },
    },
    {
      judul: "SPK Metode AHP",
      ringkas: "Sistem pendukung keputusan berbasis Analytic Hierarchy Process",
      tahun: 2026,
      kategori: "Full-stack",
      deskripsi:
        "Sistem pendukung keputusan untuk menentukan bobot kriteria dan peringkat alternatif dengan metode AHP. Terdiri dari frontend dashboard dan REST API terpisah yang juga menghasilkan laporan siap cetak.",
      fitur: [
        "Kelola kriteria dan matriks perbandingan berpasangan",
        "Perhitungan bobot AHP dan halaman peringkat",
        "Ekspor laporan ke PDF, Excel, dan Word lengkap dengan grafik",
        "Halaman login admin dan dashboard ringkasan",
      ],
      teknologi: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MySQL"],
      demo: "",
      kode: "https://github.com/Zidanman01/Sistem-Pendukung-Keputusan-main",
      bahasa: { TypeScript: 230280, JavaScript: 32043, CSS: 5604, HTML: 1535 },
    },
    {
      judul: "DailyFlow Tracker",
      ringkas: "Pengatur jadwal harian, mingguan, dan bulanan dengan statistik produktivitas",
      tahun: 2026,
      kategori: "Frontend",
      deskripsi:
        "Aplikasi React untuk mencatat dan menyelesaikan kegiatan sehari-hari tanpa backend. Semua data tersimpan di browser, dengan fitur backup dan restore JSON supaya data tidak hilang.",
      fitur: [
        "Tampilan harian, mingguan, dan bulanan dengan pencarian dan filter",
        "Drag-and-drop untuk mengurutkan kegiatan dan memindahkannya antarhari",
        "Grafik aktivitas 7 hari, tren 30 hari, dan distribusi per kategori",
        "Penghitung streak dan rekor streak terbaik",
      ],
      teknologi: ["React", "Vite", "Recharts", "dnd-kit", "localStorage"],
      demo: "",
      kode: "https://github.com/Zidanman01/DailyFlow-Tracker",
      bahasa: { JavaScript: 38149, CSS: 17966, HTML: 477 },
    },
  ],

  // Urutan: terbaru di atas. jalur: "main" (studi) atau "cabang" (organisasi, magang, lomba).
  // "tag" opsional untuk menandai pencapaian penting.
  perjalanan: [
    { tanggal: "Agu 2026", jalur: "main", pesan: "Mulai semester 7", deskripsi: "Mengambil peminatan Rekayasa Perangkat Lunak." },
    { tanggal: "Jul 2026", jalur: "cabang", pesan: "Selesai magang Backend Developer", deskripsi: "Magang 2 bulan di PT Contoh Digital, mengerjakan API layanan pembayaran." },
    { tanggal: "Mei 2026", jalur: "cabang", pesan: "Mulai magang Backend Developer", deskripsi: "" },
    { tanggal: "Nov 2025", jalur: "main", pesan: "Juara 2 Hackathon Kampus", deskripsi: "Contoh pencapaian. Ganti dengan data Anda.", tag: "juara-2" },
    { tanggal: "Sep 2025", jalur: "main", pesan: "Asisten praktikum Struktur Data", deskripsi: "Membimbing 40 mahasiswa tingkat satu." },
    { tanggal: "Mar 2025", jalur: "main", pesan: "Bergabung dengan Himpunan Mahasiswa Informatika", deskripsi: "Divisi Riset dan Teknologi." },
    { tanggal: "Agu 2023", jalur: "main", pesan: "Masuk Informatika", deskripsi: "Universitas Negeri Jakarta, angkatan 2023.", tag: "v1.0" },
  ],

  // Diambil dari repositori GitHub. "repo" = nama repo di github.com/Zidanman01 yang memakai teknologi itu.
  // Teknologi ini juga tampil sebagai tombol keyboard 3D pada bagian pembuka (satu warna per grup).
  keahlian: [
    {
      grup: "Bahasa pemrograman",
      item: [
        { nama: "PHP", repo: ["teacherDesk", "backend-cuti-karyawan", "finance-backend"] },
        { nama: "JavaScript", repo: ["DailyFlow-Tracker", "teacherDesk", "Sistem-Pendukung-Keputusan-main"] },
        { nama: "TypeScript", repo: ["Sistem-Pendukung-Keputusan-main", "finance-tracker-frontend"] },
        { nama: "Go", repo: ["File-bot-request-discord", "File-bot-request-slack"] },
        { nama: "Java", repo: ["Sistem-Pengerjaan-Soal-dan-Melihat-Nilai"] },
      ],
    },
    {
      grup: "Framework & library",
      item: [
        { nama: "React", repo: ["DailyFlow-Tracker", "Sistem-Pendukung-Keputusan-main", "finance-tracker-frontend"] },
        { nama: "Tailwind CSS", repo: ["Sistem-Pendukung-Keputusan-main", "backend-cuti-karyawan", "finance-tracker-frontend"] },
        { nama: "Laravel", repo: ["backend-cuti-karyawan", "finance-backend"] },
        { nama: "Recharts", repo: ["DailyFlow-Tracker", "Sistem-Pendukung-Keputusan-main"] },
        { nama: "Next.js", repo: ["finance-tracker-frontend"] },
        { nama: "Express", repo: ["Sistem-Pendukung-Keputusan-main"] },
      ],
    },
    {
      grup: "Database, API & tools",
      item: [
        { nama: "Vite", repo: ["DailyFlow-Tracker", "Sistem-Pendukung-Keputusan-main", "backend-cuti-karyawan", "finance-tracker-frontend"] },
        { nama: "Composer", repo: ["teacherDesk", "backend-cuti-karyawan", "finance-backend"] },
        { nama: "MySQL", repo: ["teacherDesk", "Sistem-Pendukung-Keputusan-main"] },
        { nama: "Discord & Slack API", repo: ["File-bot-request-discord", "File-bot-request-slack"] },
        { nama: "OpenRouter AI", repo: ["teacherDesk"] },
      ],
    },
  ],
};

// =====================================================================
//  Kode di bawah ini membangun halaman. Biasanya tidak perlu diubah.
// =====================================================================
const $ = (id) => document.getElementById(id);
const el = (tag, props = {}, ...children) => {
  const node = document.createElement(tag);
  Object.assign(node, props);
  children.flat().forEach((c) => c != null && node.append(c));
  return node;
};

// Header & hero
$("brand").textContent = data.nama;
$("heroRole").append(el("span", { className: "prompt", textContent: "~$ " }), `${data.peran} di ${data.kampus}`);
// Nama diketik dengan TextType (React Bits). Salinan tak terlihat menahan ukuran judul agar
// teks di bawahnya tidak bergeser selama mengetik; pembaca layar membaca teks sr-only.
if (typeof textType === "function") {
  const ketik = el("span", { className: "hero-name__type" });
  $("heroName").append(
    el("span", { className: "sr-only", textContent: data.namaLengkap }),
    el(
      "span",
      { className: "hero-name__stage", ariaHidden: "true" },
      el("span", { className: "hero-name__ghost" }, data.namaLengkap, el("span", { className: "cursor" })),
      ketik
    )
  );
  textType(ketik, { text: data.namaLengkap, typingSpeed: 75, initialDelay: 500, loop: false, cursorCharacter: "", cursorClassName: "cursor" });
} else {
  $("heroName").append(data.namaLengkap, el("span", { className: "cursor", ariaHidden: "true" }));
}
$("heroIntro").textContent = data.intro;
$("heroActions").append(
  el("a", { className: "btn btn-primary", href: "#proyek", textContent: "Lihat proyek" }),
  el("a", { className: "btn btn-ghost", href: data.cv, textContent: "Unduh CV" })
);
// Fakta yang diawali angka (mis. "3,87", "10 publik") naik dari 0 dengan CountUp (React Bits).
data.fakta.forEach((f) => {
  const dd = el("dd", { textContent: f.nilai });
  $("heroFacts").append(el("div", {}, el("dt", { textContent: f.label }), dd));
  const m = /^(\d+(?:,\d+)?)(.*)$/.exec(f.nilai);
  if (!m || typeof countUp !== "function") return;
  const desimal = (m[1].split(",")[1] || "").length;
  const fmt = new Intl.NumberFormat("id-ID", { minimumFractionDigits: desimal, maximumFractionDigits: desimal });
  const angka = el("span", { className: "count-up" });
  dd.replaceChildren(angka, m[2]);
  countUp(angka, { to: parseFloat(m[1].replace(",", ".")), duration: 2, format: (v) => fmt.format(v) });
});

// Proyek unggulan: panel studi kasus dengan komposisi bahasa dari GitHub
const warnaBahasa = { PHP: "#4F5D95", JavaScript: "#f1e05a", TypeScript: "#3178c6", CSS: "#663399", HTML: "#e34c26", Hack: "#878787" };
const persen = (n) => n.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";

data.proyek.forEach((p) => {
  const [akun, repo] = p.kode.replace(/\/$/, "").split("/").slice(-2);
  const total = Object.values(p.bahasa).reduce((a, b) => a + b, 0);
  const bahasa = Object.entries(p.bahasa)
    .sort((a, b) => b[1] - a[1])
    .map(([nama, byte]) => ({ nama, pct: (byte / total) * 100, warna: warnaBahasa[nama] || "#8b949e" }));

  const bar = el(
    "div",
    { className: "langbar", role: "img", ariaLabel: "Komposisi bahasa: " + bahasa.map((b) => `${b.nama} ${persen(b.pct)}`).join(", ") },
    bahasa.map((b) => {
      const seg = el("span", {});
      seg.style.flexGrow = b.pct;
      seg.style.background = b.warna;
      return seg;
    })
  );
  const legenda = el(
    "ul",
    { className: "lang-legend" },
    bahasa.map((b) => {
      const dot = el("i", { ariaHidden: "true" });
      dot.style.background = b.warna;
      return el("li", {}, dot, el("span", { textContent: b.nama }), el("span", { className: "lang-pct", textContent: persen(b.pct) }));
    })
  );

  const links = el("div", { className: "case-links" }, el("a", { className: "btn btn-primary", href: p.kode, target: "_blank", rel: "noopener", textContent: "Lihat kode di GitHub" }));
  if (p.demo) links.append(el("a", { className: "btn btn-ghost", href: p.demo, target: "_blank", rel: "noopener", textContent: "Buka demo" }));

  // Poster panel galeri: komposisi bahasa sebagai garis-garis warna.
  const poster = el(
    "span",
    { className: "ag-poster" },
    bahasa.map((b) => {
      const s = el("span", {});
      s.style.flexGrow = b.pct;
      s.style.background = b.warna;
      return s;
    })
  );
  const isiId = `proyek-isi-${repo.toLowerCase()}`;
  const tab = el(
    "button",
    { type: "button", className: "ag-tab", ariaLabel: `${p.judul}, ${p.kategori}, ${p.tahun}` },
    el("span", { className: "ag-tab__title", textContent: p.judul }),
    el("span", { className: "ag-tab__meta", textContent: `${p.kategori}, ${p.tahun}` })
  );
  tab.setAttribute("aria-controls", isiId);

  const isi = el(
    "div",
    { className: "ag-panel__text" },
    el(
      "div",
      { className: "case-bar" },
      el("span", { className: "case-repo" }, `${akun} / `, el("strong", { textContent: repo })),
      el("span", { className: "case-meta", textContent: `${p.kategori}, ${p.tahun}` })
    ),
    el(
      "div",
      { className: "case-body" },
      el(
        "div",
        { className: "case-main" },
        el("h3", { className: "case-title", textContent: p.judul }),
        el("p", { className: "case-sum", textContent: p.ringkas }),
        el("p", { className: "case-desc", textContent: p.deskripsi }),
        links
      ),
      el(
        "div",
        { className: "case-side" },
        el("h4", { textContent: "Bahasa" }),
        bar,
        legenda,
        el("h4", { textContent: "Teknologi" }),
        el("ul", { className: "tags" }, p.teknologi.map((t) => el("li", { textContent: t }))),
        el("h4", { textContent: "Fitur utama" }),
        el("ul", { className: "features" }, p.fitur.map((f) => el("li", { textContent: f })))
      )
    )
  );

  const article = el(
    "article",
    { className: "ag-panel case", id: `proyek-${repo.toLowerCase()}`, role: "listitem" },
    el("span", { className: "ag-panel__frame", ariaHidden: "true" }, el("span", { className: "ag-panel__media" }, poster), el("span", { className: "ag-panel__overlay" })),
    tab,
    el("div", { className: "ag-panel__label", id: isiId }, el("span", { className: "ag-panel__bar", ariaHidden: "true" }), isi)
  );
  article.dataset.repo = repo.toLowerCase();
  $("projects").append(article);
});

// Proyek ditampilkan sebagai AccordionGallery (React Bits): arahkan kursor ke panel untuk membukanya.
$("projects").setAttribute("role", "list");
$("projects").setAttribute("aria-labelledby", "proyek-title");
const galeri =
  typeof AccordionGallery === "function"
    ? AccordionGallery($("projects"), { defaultIndex: 0, expandRatio: 0.7, trigger: "hover", gap: 12, tilt: 6 })
    : null;

// Dipanggil dari objek 3D: buka panel proyek, gulir ke sana, lalu sorot sebentar.
window.bukaProyek = (repo) => {
  const panels = [...document.querySelectorAll(".case")];
  const i = panels.findIndex((p) => p.dataset.repo === repo.toLowerCase());
  if (i < 0) return;
  const item = panels[i];
  if (galeri) galeri.setActive(i);
  item.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  item.classList.remove("flash");
  void item.offsetWidth;
  item.classList.add("flash");
  item.querySelector(".case-links a").focus({ preventScroll: true });
};

// Perjalanan sebagai git log
const hash = (s) => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
};
data.perjalanan.forEach((c, i, arr) => {
  const isBranch = c.jalur === "cabang";
  const prevBranch = arr[i - 1]?.jalur === "cabang";
  const nextBranch = arr[i + 1]?.jalur === "cabang";
  const cls = ["commit"];
  if (isBranch) {
    cls.push("branch");
    if (!prevBranch) cls.push("branch-end"); // titik merge (terbaru)
    if (!nextBranch) cls.push("branch-start"); // titik awal cabang
  }
  if (c.tag) cls.push("tag");

  const rail = el("div", { className: "rail", ariaHidden: "true" }, el("span", { className: "dot" }));
  if (isBranch && (!prevBranch || !nextBranch)) rail.append(el("span", { className: "fork" }));

  const head = el("div", { className: "commit-head" }, el("span", { className: "commit-hash", textContent: hash(c.tanggal + c.pesan) }));
  if (c.tag) head.append(el("span", { className: "commit-ref", textContent: `tag: ${c.tag}` }));
  head.append(el("span", { className: "commit-msg", textContent: c.pesan }));

  const info = el(
    "div",
    {},
    head,
    el("div", { className: "commit-meta", textContent: `${c.tanggal}${isBranch ? " · cabang pengalaman" : ""}` })
  );
  if (c.deskripsi) info.append(el("p", { className: "commit-desc", textContent: c.deskripsi }));

  $("gitlog").append(el("li", { className: cls.join(" ") }, rail, info));
});

// Keahlian: panjang bar = jumlah proyek yang memakai teknologi itu
const maksRepo = Math.max(...data.keahlian.flatMap((g) => g.item.map((t) => t.repo.length)));
data.keahlian.forEach((g) =>
  $("skills").append(
    el(
      "div",
      { className: "skill-group" },
      el("h3", { textContent: g.grup }),
      el(
        "ul",
        { className: "skill-list" },
        g.item.map((t) => {
          const fill = el("span", { className: "skill-fill" });
          fill.style.width = `${(t.repo.length / maksRepo) * 100}%`;
          return el(
            "li",
            {},
            el("span", { className: "skill-name", textContent: t.nama }),
            el("span", { className: "skill-track", ariaHidden: "true" }, fill),
            el("span", { className: "skill-level", textContent: `${t.repo.length} proyek` })
          );
        })
      )
    )
  )
);

// Kontak & footer
$("contactText").textContent =
  "Terbuka untuk magang, proyek freelance, atau sekadar diskusi soal teknologi. Biasanya saya membalas email dalam satu hari.";
$("contactMail").textContent = data.email;
$("contactMail").href = `mailto:${data.email}`;
$("contactSend").href = `mailto:${data.email}`;
$("contactCopy").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText(data.email);
    btn.textContent = "Email disalin";
  } catch {
    btn.textContent = "Gagal menyalin, salin manual";
  }
  setTimeout(() => (btn.textContent = "Salin email"), 2200);
});
data.tautan.forEach((t) =>
  $("contactLinks").append(el("li", {}, el("a", { href: t.url, target: "_blank", rel: "noopener", textContent: t.label })))
);
$("footer").textContent = `© ${new Date().getFullYear()} ${data.namaLengkap}. Dibuat dengan HTML, CSS, JavaScript, dan Three.js.`;

// Tandai menu sesuai bagian yang sedang dibaca
const navLinks = [...document.querySelectorAll(".site-header nav a")];
const spy = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => (a.getAttribute("href") === `#${en.target.id}` ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
    }),
  { rootMargin: "-45% 0px -50% 0px" }
);
["top", "proyek", "pengalaman", "keahlian", "kontak"].forEach((id) => $(id) && spy.observe($(id)));

// Transisi saat scroll: elemen muncul ketika masuk layar.
// Hanya aktif jika pengguna tidak meminta gerakan dikurangi; tanpa JS semua konten tetap terlihat.
const progress = $("scrollProgress");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
};
let progressQueued = false;
window.addEventListener(
  "scroll",
  () => {
    if (progressQueued) return;
    progressQueued = true;
    requestAnimationFrame(() => {
      progressQueued = false;
      updateProgress();
    });
  },
  { passive: true }
);
window.addEventListener("resize", updateProgress);
updateProgress();

if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const stagger = (nodes, step) => nodes.forEach((n, i) => n.style.setProperty("--d", `${i * step}ms`));
  document.querySelectorAll(".section-head, .projects, .gitlog, .skill-group, .contact-card").forEach((n) => n.setAttribute("data-reveal", ""));
  stagger([...document.querySelectorAll(".skill-group")], 90);
  document.querySelectorAll(".skill-group").forEach((g) => stagger([...g.querySelectorAll(".skill-fill")], 70));
  stagger([...document.querySelectorAll(".gitlog .commit")], 90);

  const reveal = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        reveal.unobserve(en.target);
      }),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  document.documentElement.classList.add("js-reveal");
  document.querySelectorAll("[data-reveal]").forEach((n) => reveal.observe(n));
}

// Tema terang/gelap
const root = document.documentElement;
try {
  const saved = localStorage.getItem("tema");
  if (saved) root.dataset.theme = saved;
} catch {}
$("themeToggle").addEventListener("click", () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try {
    localStorage.setItem("tema", root.dataset.theme);
  } catch {}
});
