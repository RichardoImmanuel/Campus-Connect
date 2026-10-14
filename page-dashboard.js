/* Dashboard: ringkasan statistik, pengumuman, dan cuplikan berita/event/prestasi */
(function () {
  "use strict";

  // ----- Pengumuman penting (merujuk ke berita yang sudah ada) -----
  document.getElementById("pengumuman").innerHTML = pengumumanData.map(function (p) {
    return '<li><a href="berita.html?baca=' + p.newsId + '" class="block py-3 hover:text-sun transition-colors">' +
      '<span class="block font-semibold">' + esc(p.label) + "</span>" +
      '<span class="block text-sm text-white/70">' + esc(p.info) + "</span></a></li>";
  }).join("");

  // ----- Statistik (dihitung dari data, bukan angka tetap) -----
  const statistik = [
    { id: "statBerita", ikon: "news", jumlah: newsData.length, label: "Berita dipublikasikan", href: "berita.html", warna: "bg-ink/10 text-ink" },
    { id: "statEvent", ikon: "calendar", jumlah: eventsData.length, label: "Event kampus", href: "event.html", warna: "bg-teal/10 text-teal-deep" },
    { id: "statPrestasi", ikon: "trophy", jumlah: prestasiData.length, label: "Prestasi mahasiswa", href: "prestasi.html", warna: "bg-sun/30 text-ink" }
  ];
  document.getElementById("statTiles").innerHTML = statistik.map(function (s) {
    return '<a href="' + s.href + '" class="card card-hover flex items-center gap-4 p-5 shadow-sm">' +
      '<span class="w-14 h-14 rounded-full flex items-center justify-center shrink-0 ' + s.warna + '">' + icon(s.ikon, "w-7 h-7") + "</span>" +
      "<span><span id=\"" + s.id + '" class="block font-display font-extrabold text-4xl leading-none">0</span>' +
      '<span class="block mt-1 font-semibold text-ink/80">' + s.label + "</span></span></a>";
  }).join("");
  statistik.forEach(function (s) { animasiCounter(document.getElementById(s.id), s.jumlah); });

  // ----- Berita terbaru: 1 utama + 2 ringkas -----
  const berita = newsData.slice().sort(function (a, b) { return b.date.localeCompare(a.date); });
  document.getElementById("dashBerita").innerHTML =
    '<div class="lg:col-span-3">' + newsFeaturedHTML(berita[0]) + "</div>" +
    '<div class="lg:col-span-2 flex flex-col gap-6">' +
      berita.slice(1, 3).map(function (n, i) { return newsCompactHTML(n, i + 1); }).join("") + "</div>";

  // ----- Event: yang belum selesai, paling dekat dulu -----
  const event = eventsData
    .filter(function (e) { return eventStatus(e) !== "selesai"; })
    .sort(function (a, b) { return a.date.localeCompare(b.date); })
    .slice(0, 3);
  document.getElementById("dashEvent").innerHTML = event.length
    ? event.map(eventRowHTML).join("")
    : '<div class="rounded-2xl border border-dashed border-ink/20 p-8 text-center text-ink/70">Belum ada event mendatang. Lihat event yang sudah berlalu di halaman Event.</div>';

  // ----- Prestasi terbaru -----
  const prestasi = prestasiData.slice().sort(function (a, b) { return b.tahun - a.tahun || b.id - a.id; }).slice(0, 3);
  document.getElementById("dashPrestasi").innerHTML = prestasi.map(prestasiCardHTML).join("");
})();
