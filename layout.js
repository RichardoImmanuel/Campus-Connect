/* =========================================================
   layout.js – navbar, footer, dan modal detail yang sama di
   semua halaman. Dimuat di bagian ATAS <body> agar navbar
   langsung muncul. Setiap halaman menandai dirinya lewat
   <body data-page="dashboard|berita|event|prestasi">.
   ========================================================= */
(function () {
  "use strict";

  const MENU = [
    { kunci: "dashboard", href: "index.html", label: "Dashboard" },
    { kunci: "berita", href: "berita.html", label: "Berita" },
    { kunci: "event", href: "event.html", label: "Event" },
    { kunci: "prestasi", href: "prestasi.html", label: "Prestasi" }
  ];
  const aktif = document.body.dataset.page;

  function tautan(kelas) {
    return MENU.map(function (m) {
      const penanda = m.kunci === aktif ? ' aria-current="page"' : "";
      return '<li><a href="' + m.href + '" class="' + kelas + '"' + penanda + ">" + m.label + "</a></li>";
    }).join("");
  }

  const header =
    '<header class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ink/10">' +
      '<nav class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between" aria-label="Navigasi utama">' +
        '<a href="index.html" class="font-display font-extrabold text-xl">Campus<span class="text-teal">Connect</span></a>' +
        '<ul class="hidden md:flex items-center gap-8 text-sm font-semibold">' + tautan("nav-link") + "</ul>" +
        '<button type="button" id="navToggle" class="md:hidden icon-btn" aria-expanded="false" aria-controls="navMobile" aria-label="Buka menu">' +
          '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' +
        "</button>" +
      "</nav>" +
      '<div id="navMobile" class="collapsible md:hidden"><div><ul class="max-w-6xl mx-auto px-4 pb-3 flex flex-col gap-1">' + tautan("nav-link-mobile") + "</ul></div></div>" +
    "</header>";

  const footer =
    '<footer class="bg-ink text-white/60 text-sm on-dark">' +
      '<div class="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">' +
        "<p>&copy; 2026 CampusConnect – Portal Informasi Mahasiswa</p>" +
        '<ul class="flex flex-wrap gap-x-5">' + MENU.map(function (m) {
          return '<li><a href="' + m.href + '" class="inline-block py-1 hover:text-white">' + m.label + "</a></li>";
        }).join("") + "</ul>" +
      "</div></footer>";

  const modalDetail =
    '<div id="detailModal" class="modal-overlay" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="detailTitle">' +
      '<div class="modal-panel bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">' +
        '<button type="button" data-close class="absolute top-3 right-3 z-10 bg-white rounded-full w-11 h-11 shadow flex items-center justify-center text-ink" aria-label="Tutup">' +
          '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
        '<div id="detailMedia"></div>' +
        '<div class="p-6 sm:p-8">' +
          '<div id="detailBadges" class="flex flex-wrap items-center gap-2"></div>' +
          '<h2 id="detailTitle" class="font-display font-extrabold text-2xl sm:text-3xl mt-3 leading-snug"></h2>' +
          '<dl id="detailFacts" class="mt-3 space-y-1.5 text-sm text-ink/75"></dl>' +
          '<div id="detailBody" class="mt-5 text-ink/80 leading-7 whitespace-pre-line"></div>' +
          '<div id="detailActions" class="mt-6 flex flex-wrap gap-3"></div>' +
        "</div></div></div>";

  // Navbar langsung disisipkan di awal body
  document.body.insertAdjacentHTML("afterbegin", header);

  const toggle = document.getElementById("navToggle");
  const panel = document.getElementById("navMobile");
  toggle.addEventListener("click", function () {
    const buka = !panel.classList.contains("open");
    panel.classList.toggle("open", buka);
    toggle.setAttribute("aria-expanded", String(buka));
    toggle.setAttribute("aria-label", buka ? "Tutup menu" : "Buka menu");
  });

  // Footer & modal disisipkan setelah isi halaman selesai dibaca
  document.addEventListener("DOMContentLoaded", function () {
    document.body.insertAdjacentHTML("beforeend", footer + modalDetail);
  });
})();
