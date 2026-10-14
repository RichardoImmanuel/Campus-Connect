/* =========================================================
   common.js – fungsi & komponen yang dipakai semua halaman
   (butuh data.js dimuat lebih dulu)
   ========================================================= */

// ----- Utilitas -----
function esc(teks) {
  return String(teks).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// "2026-10-12" -> Date lokal (hindari pergeseran zona waktu)
function parseDate(iso) {
  const p = iso.split("-").map(Number);
  return new Date(p[0], p[1] - 1, p[2]);
}
function formatDate(iso) {
  return parseDate(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
function dayAndMonth(iso) {
  const d = parseDate(iso);
  return { hari: String(d.getDate()), bulan: d.toLocaleDateString("id-ID", { month: "short" }) };
}

// Status event dihitung dari tanggal hari ini
const STATUS_LABEL = { akan: "Akan datang", berlangsung: "Sedang berlangsung", selesai: "Selesai" };
function eventStatus(e) {
  const sekarang = new Date();
  const mulai = parseDate(e.date);
  const akhir = parseDate(e.dateEnd || e.date);
  akhir.setHours(23, 59, 59, 999);
  if (sekarang < mulai) return "akan";
  if (sekarang > akhir) return "selesai";
  return "berlangsung";
}

// Ubah parameter URL tanpa memuat ulang halaman (untuk filter & detail)
function setParams(obj) {
  try {
    const url = new URL(location.href);
    Object.keys(obj).forEach(function (k) {
      const v = obj[k];
      if (v === null || v === undefined || v === "") url.searchParams.delete(k);
      else url.searchParams.set(k, v);
    });
    history.replaceState(null, "", url);
  } catch (err) { /* abaikan jika browser menolak */ }
}
function getParam(nama) { return new URLSearchParams(location.search).get(nama); }

// ----- Ikon (SVG inline) -----
const ICONS = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  news: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2M18 14h-8M15 18h-5M10 6h8v4h-8V6Z"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>'
};
function icon(nama, kelas) {
  return '<svg class="' + (kelas || "w-5 h-5") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[nama] + "</svg>";
}

// Gambar cadangan jika gambar gagal dimuat
window.IMG_FALLBACK = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B2559"/><stop offset="1" stop-color="#0E8A8C"/></linearGradient></defs><rect width="600" height="400" fill="url(#g)"/></svg>'
);
function imgTag(src, alt, kelas) {
  return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" class="' + (kelas || "") + '" onerror="this.onerror=null;this.src=IMG_FALLBACK">';
}

// ----- Komponen kartu -----
function badgeKategori(kategori) { return '<span class="badge badge-' + esc(kategori.toLowerCase()) + '">' + esc(kategori) + "</span>"; }
function badgeStatus(status) { return '<span class="badge status-' + status + '">' + STATUS_LABEL[status] + "</span>"; }
function badgeTingkat(tingkat) { return '<span class="badge level-' + esc(tingkat.toLowerCase()) + '">' + esc(tingkat) + "</span>"; }

function newsCardHTML(n, i) {
  return '<article class="card card-hover reveal flex flex-col" style="--i:' + (i || 0) + '">' +
    '<div class="card-media h-44">' + imgTag(n.image, n.title) + "</div>" +
    '<div class="p-5 flex flex-col flex-1">' +
      '<div class="flex items-center justify-between gap-2">' + badgeKategori(n.category) +
        '<time datetime="' + n.date + '" class="text-sm text-ink/60">' + formatDate(n.date) + "</time></div>" +
      '<h3 class="mt-3 font-display font-bold text-lg leading-snug">' + esc(n.title) + "</h3>" +
      '<p class="mt-2 text-ink/75 line-clamp-3">' + esc(n.summary) + "</p>" +
      '<a href="berita.html?baca=' + n.id + '" data-baca="' + n.id + '" class="link-more mt-auto pt-3 self-start">Baca selengkapnya</a>' +
    "</div></article>";
}

// Berita utama besar di Dashboard
function newsFeaturedHTML(n) {
  return '<article class="card card-hover reveal flex flex-col h-full">' +
    '<div class="card-media h-56 sm:h-72">' + imgTag(n.image, n.title) + "</div>" +
    '<div class="p-6 flex flex-col flex-1">' +
      '<div class="flex items-center gap-3">' + badgeKategori(n.category) +
        '<time datetime="' + n.date + '" class="text-sm text-ink/60">' + formatDate(n.date) + "</time></div>" +
      '<h3 class="mt-3 font-display font-extrabold text-2xl leading-snug">' + esc(n.title) + "</h3>" +
      '<p class="mt-2 text-ink/75 line-clamp-3">' + esc(n.summary) + "</p>" +
      '<div class="mt-auto pt-5"><a href="berita.html?baca=' + n.id + '" class="btn btn-ink">Baca selengkapnya</a></div>' +
    "</div></article>";
}

// Berita ringkas (horizontal) di Dashboard
function newsCompactHTML(n, i) {
  return '<a href="berita.html?baca=' + n.id + '" class="card card-hover reveal flex" style="--i:' + (i || 0) + '">' +
    '<div class="card-media w-28 sm:w-40 shrink-0">' + imgTag(n.image, n.title) + "</div>" +
    '<div class="p-4 flex flex-col min-w-0">' +
      '<div class="flex flex-wrap items-center gap-2">' + badgeKategori(n.category) +
        '<time datetime="' + n.date + '" class="text-xs text-ink/60">' + formatDate(n.date) + "</time></div>" +
      '<h3 class="mt-2 font-display font-bold leading-snug line-clamp-3">' + esc(n.title) + "</h3>" +
    "</div></a>";
}

function eventCardHTML(e, i) {
  const status = eventStatus(e);
  const tutup = status === "selesai";
  return '<article class="card card-hover reveal flex flex-col" style="--i:' + (i || 0) + '">' +
    '<div class="card-media h-44 relative">' + imgTag(e.image, e.title) +
      '<span class="absolute top-3 left-3">' + badgeStatus(status) + "</span></div>" +
    '<div class="p-5 flex flex-col flex-1">' +
      '<div class="self-start">' + badgeKategori(e.category) + "</div>" +
      '<h3 class="mt-3 font-display font-bold text-lg leading-snug">' + esc(e.title) + "</h3>" +
      '<ul class="mt-3 space-y-1.5 text-sm text-ink/75">' +
        '<li class="flex items-center gap-2">' + icon("calendar", "w-4 h-4 shrink-0 text-teal-deep") + "<span>" + formatDate(e.date) + "</span></li>" +
        '<li class="flex items-center gap-2">' + icon("clock", "w-4 h-4 shrink-0 text-teal-deep") + "<span>" + esc(e.time) + "</span></li>" +
        '<li class="flex items-center gap-2">' + icon("pin", "w-4 h-4 shrink-0 text-teal-deep") + "<span>" + esc(e.location) + "</span></li>" +
      "</ul>" +
      '<p class="mt-3 text-ink/75 line-clamp-2">' + esc(e.summary) + "</p>" +
      '<div class="mt-auto pt-5 grid grid-cols-2 gap-2">' +
        '<a href="event.html?detail=' + e.id + '" data-detail="' + e.id + '" class="btn btn-outline">Lihat detail</a>' +
        '<button type="button" class="btn btn-sun btn-daftar" data-daftar="' + e.id + '"' + (tutup ? " disabled" : "") + ">" + (tutup ? "Selesai" : "Daftar Event") + "</button>" +
      "</div>" +
    "</div></article>";
}

// Baris event ringkas di Dashboard
function eventRowHTML(e, i) {
  const t = dayAndMonth(e.date);
  return '<a href="event.html?detail=' + e.id + '" class="card card-hover reveal flex items-center gap-4 p-4" style="--i:' + (i || 0) + '">' +
    '<div class="shrink-0 w-16 rounded-xl bg-ink text-white text-center py-2">' +
      '<div class="font-display font-extrabold text-2xl leading-none">' + t.hari + '</div><div class="text-xs mt-1">' + esc(t.bulan) + "</div></div>" +
    '<div class="min-w-0 flex-1">' +
      '<div class="flex flex-wrap items-center gap-2">' + badgeKategori(e.category) + badgeStatus(eventStatus(e)) + "</div>" +
      '<h3 class="mt-1.5 font-display font-bold leading-snug">' + esc(e.title) + "</h3>" +
      '<p class="mt-1 text-sm text-ink/70 flex items-center gap-1.5">' + icon("pin", "w-4 h-4 shrink-0") + '<span class="truncate">' + esc(e.location) + " · " + esc(e.time) + "</span></p>" +
    "</div></a>";
}

function prestasiCardHTML(p, i) {
  return '<article class="card card-hover reveal flex flex-col" style="--i:' + (i || 0) + '">' +
    '<div class="card-media h-48 relative">' + imgTag(p.image, p.lomba) +
      '<span class="absolute top-3 left-3">' + badgeTingkat(p.tingkat) + "</span></div>" +
    '<div class="p-5 flex flex-col flex-1">' +
      '<div class="flex items-center justify-between gap-2">' +
        '<span class="badge badge-beasiswa">' + esc(p.peringkat) + "</span>" +
        '<span class="text-sm font-semibold text-ink/60">' + p.tahun + "</span></div>" +
      '<h3 class="mt-3 font-display font-bold text-lg leading-snug">' + esc(p.nama) + "</h3>" +
      '<p class="mt-1 text-sm font-semibold text-teal-deep">' + esc(p.lomba) + "</p>" +
      '<p class="mt-2 text-sm text-ink/75 leading-relaxed line-clamp-2">' + esc(p.deskripsi) + "</p>" +
      '<div class="mt-auto pt-4 flex items-center justify-between gap-2">' +
        '<span class="badge badge-netral">' + esc(p.kategori) + "</span>" +
        '<a href="prestasi.html?detail=' + p.id + '" data-detail="' + p.id + '" class="link-more">Lihat detail</a>' +
      "</div>" +
    "</div></article>";
}

// Tampilan kosong yang konsisten
function emptyStateHTML(judul, teks, tombolReset) {
  return '<div class="col-span-full reveal flex flex-col items-center text-center py-14 px-4 bg-white border border-dashed border-ink/20 rounded-2xl">' +
    '<div class="w-16 h-16 rounded-full bg-teal/10 text-teal-deep flex items-center justify-center">' + icon("search", "w-8 h-8") + "</div>" +
    '<h3 class="mt-5 font-display font-bold text-xl">' + esc(judul) + "</h3>" +
    '<p class="mt-2 text-ink/70 max-w-md">' + esc(teks) + "</p>" +
    (tombolReset ? '<button type="button" data-reset class="btn btn-ink mt-6">' + icon("reset", "w-4 h-4") + "Reset filter</button>" : "") +
    "</div>";
}

// Deretan chip filter. Dibuat sekali, lalu hanya diperbarui (fokus keyboard tidak hilang).
function buatChips(wadah, opsi, saatPilih, denganJumlah) {
  wadah.innerHTML = opsi.map(function (o) {
    return '<button type="button" class="chip" data-value="' + esc(o.value) + '" aria-pressed="false"><span>' + esc(o.label) + "</span>" +
      (denganJumlah ? '<span class="chip-count"></span>' : "") + "</button>";
  }).join("");
  wadah.addEventListener("click", function (ev) {
    const tombol = ev.target.closest(".chip");
    if (tombol) saatPilih(tombol.dataset.value);
  });
  return {
    perbarui: function (aktif, jumlah) {
      wadah.querySelectorAll(".chip").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.value === aktif));
        const c = b.querySelector(".chip-count");
        if (c && jumlah) c.textContent = jumlah[b.dataset.value] !== undefined ? "(" + jumlah[b.dataset.value] + ")" : "";
      });
    }
  };
}

// ----- Modal (dipakai detail & form pendaftaran) -----
const Modal = {
  terakhirFokus: null,
  buka: function (el, pemicu) {
    this.terakhirFokus = pemicu || document.activeElement;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      const target = el.querySelector("[data-autofocus]") || el.querySelector("button, a[href], input, select");
      if (target) target.focus();
    });
  },
  tutup: function (el) {
    if (!el.classList.contains("is-open")) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal-overlay.is-open")) document.body.style.overflow = "";
    if (this.terakhirFokus && this.terakhirFokus.focus) this.terakhirFokus.focus();
    el.dispatchEvent(new CustomEvent("modal:tutup", { bubbles: true }));
  },
  teratas: function () {
    const daftar = document.querySelectorAll(".modal-overlay.is-open");
    return daftar[daftar.length - 1] || null;
  }
};

document.addEventListener("click", function (ev) {
  const overlay = ev.target.closest(".modal-overlay");
  if (!overlay) return;
  if (ev.target === overlay || ev.target.closest("[data-close]")) Modal.tutup(overlay);
});
document.addEventListener("keydown", function (ev) {
  const modal = Modal.teratas();
  if (!modal) return;
  if (ev.key === "Escape") { Modal.tutup(modal); return; }
  if (ev.key === "Tab") { // jaga fokus tetap di dalam modal
    const fokus = Array.from(modal.querySelectorAll('button:not([disabled]), a[href], input, select, textarea')).filter(function (n) { return n.offsetParent !== null; });
    if (!fokus.length) return;
    const awal = fokus[0], akhir = fokus[fokus.length - 1];
    if (ev.shiftKey && document.activeElement === awal) { ev.preventDefault(); akhir.focus(); }
    else if (!ev.shiftKey && document.activeElement === akhir) { ev.preventDefault(); awal.focus(); }
  }
});

// Modal detail umum (berita, event, prestasi)
function tampilkanDetail(cfg) {
  const m = document.getElementById("detailModal");
  m.querySelector("#detailMedia").innerHTML = cfg.image ? '<div class="card-media h-56 sm:h-72">' + imgTag(cfg.image, cfg.alt || cfg.judul) + "</div>" : "";
  m.querySelector("#detailBadges").innerHTML = cfg.badges.join("");
  m.querySelector("#detailTitle").textContent = cfg.judul;
  m.querySelector("#detailFacts").innerHTML = (cfg.fakta || []).map(function (f) {
    return '<div class="flex items-start gap-2">' + icon(f[0], "w-4 h-4 mt-1 shrink-0 text-teal-deep") +
      '<div><dt class="sr-only">' + esc(f[1]) + "</dt><dd>" + esc(f[2]) + "</dd></div></div>";
  }).join("");
  m.querySelector("#detailBody").textContent = cfg.isi;
  m.querySelector("#detailActions").innerHTML = cfg.aksi || "";
  m._saatTutup = cfg.saatTutup || null;
  Modal.buka(m, cfg.pemicu);
}
document.addEventListener("modal:tutup", function (ev) {
  if (ev.target.id === "detailModal" && ev.target._saatTutup) ev.target._saatTutup();
});

const TOMBOL_TUTUP_DETAIL = '<button type="button" data-close class="btn btn-ink">Tutup</button>';

function bukaDetailBerita(id, pemicu) {
  const n = newsData.find(function (x) { return x.id === Number(id); });
  if (!n) return false;
  tampilkanDetail({
    image: n.image, judul: n.title, pemicu: pemicu,
    badges: [badgeKategori(n.category)],
    fakta: [["calendar", "Tanggal publikasi", formatDate(n.date)]],
    isi: newsDetails[n.id] || n.summary,
    aksi: '<button type="button" data-close class="btn btn-ink">Kembali ke Berita</button>',
    saatTutup: function () { setParams({ baca: null }); }
  });
  return true;
}

function bukaDetailPrestasi(id, pemicu) {
  const p = prestasiData.find(function (x) { return x.id === Number(id); });
  if (!p) return false;
  tampilkanDetail({
    image: p.image, judul: p.nama, alt: p.lomba, pemicu: pemicu,
    badges: ['<span class="badge badge-beasiswa">' + esc(p.peringkat) + "</span>", badgeTingkat(p.tingkat), '<span class="badge badge-netral">' + esc(p.kategori) + "</span>"],
    fakta: [["award", "Lomba", p.lomba], ["calendar", "Tahun", String(p.tahun)]],
    isi: p.deskripsi + "\n\nCatatan: Data prestasi ini adalah contoh dan perlu diganti dengan data sebenarnya.",
    aksi: TOMBOL_TUTUP_DETAIL,
    saatTutup: function () { setParams({ detail: null }); }
  });
  return true;
}

// ----- Toast -----
function toast(pesan) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    el.setAttribute("aria-live", "polite");
    document.body.appendChild(el);
  }
  el.textContent = pesan;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { el.classList.remove("show"); }, 4000);
}

// ----- Counter angka (menghormati preferensi kurangi animasi) -----
function animasiCounter(el, target) {
  if (!el) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target.toLocaleString("id-ID"); return; }
  const durasi = 1000, mulai = performance.now();
  function langkah(sekarang) {
    const p = Math.min((sekarang - mulai) / durasi, 1);
    el.textContent = Math.floor(p * target).toLocaleString("id-ID");
    if (p < 1) requestAnimationFrame(langkah);
    else el.textContent = target.toLocaleString("id-ID");
  }
  requestAnimationFrame(langkah);
}

// ----- Isi ikon untuk elemen statis: data-icon (awal) & data-icon-end (akhir) -----
document.querySelectorAll("[data-icon]").forEach(function (el) {
  el.insertAdjacentHTML("afterbegin", icon(el.dataset.icon, el.dataset.iconClass));
});
document.querySelectorAll("[data-icon-end]").forEach(function (el) {
  el.insertAdjacentHTML("beforeend", icon(el.dataset.iconEnd, "w-4 h-4 chevron"));
});
