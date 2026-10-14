/* Berita: pencarian + filter kategori + urutan + rentang tanggal (semuanya saling terhubung) */
(function () {
  "use strict";

  const NILAI_AWAL = { q: "", kategori: "Semua", urut: "terbaru", dari: "", sampai: "" };
  const state = Object.assign({}, NILAI_AWAL);

  const el = {
    cari: document.getElementById("cari"),
    hapus: document.getElementById("hapusCari"),
    urut: document.getElementById("urut"),
    dari: document.getElementById("dari"),
    sampai: document.getElementById("sampai"),
    panel: document.getElementById("panelTanggal"),
    tombolTanggal: document.getElementById("tombolTanggal"),
    pesanTanggal: document.getElementById("pesanTanggal"),
    reset: document.getElementById("reset"),
    grid: document.getElementById("news-grid"),
    ringkasan: document.getElementById("ringkasan")
  };

  // Kategori diambil dari data yang benar-benar ada
  const kategori = ["Semua"].concat(newsData.reduce(function (hasil, n) {
    if (hasil.indexOf(n.category) < 0) hasil.push(n.category);
    return hasil;
  }, []));

  // Teks yang dicari: judul + ringkasan + kategori + isi berita (tanpa baris "Catatan")
  const indeks = newsData.map(function (n) {
    const isi = (newsDetails[n.id] || "").replace(/Catatan:.*$/gim, "");
    return { n: n, teks: [n.title, n.summary, n.category, isi].join(" ").toLowerCase() };
  });

  const chips = buatChips(
    document.getElementById("chipKategori"),
    kategori.map(function (k) { return { value: k, label: k === "Semua" ? "Semua Berita" : k }; }),
    function (nilai) { state.kategori = nilai; render(); },
    true
  );

  // ----- Pencocokan -----
  function rentangTidakValid() { return state.dari && state.sampai && state.dari > state.sampai; }

  // Pencarian + rentang tanggal (kategori dipisah agar jumlah per kategori bisa dihitung)
  function cocokDasar(item) {
    const kata = state.q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!kata.every(function (k) { return item.teks.indexOf(k) >= 0; })) return false;
    if (state.dari && item.n.date < state.dari) return false;
    if (state.sampai && item.n.date > state.sampai) return false;
    return true;
  }

  function sudahDefault() {
    return Object.keys(NILAI_AWAL).every(function (k) { return state[k] === NILAI_AWAL[k]; });
  }

  // ----- Tampilan -----
  function render() {
    const tidakValid = rentangTidakValid();
    el.pesanTanggal.hidden = !tidakValid;
    const dasar = tidakValid ? [] : indeks.filter(cocokDasar);

    const jumlah = { Semua: dasar.length };
    kategori.slice(1).forEach(function (k) {
      jumlah[k] = dasar.filter(function (x) { return x.n.category === k; }).length;
    });
    chips.perbarui(state.kategori, jumlah);

    const hasil = dasar
      .filter(function (x) { return state.kategori === "Semua" || x.n.category === state.kategori; })
      .map(function (x) { return x.n; })
      .sort(function (a, b) {
        const urutan = state.urut === "terlama" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
        return urutan || a.id - b.id;
      });

    el.grid.innerHTML = hasil.length
      ? hasil.map(function (n, i) { return newsCardHTML(n, Math.min(i, 8)); }).join("")
      : emptyStateHTML("Berita yang kamu cari tidak ditemukan", "Coba kata kunci lain, pilih kategori berbeda, atau atur ulang filter.", true);

    el.ringkasan.textContent = hasil.length
      ? "Menampilkan " + hasil.length + " dari " + newsData.length + " berita"
      : "Tidak ada berita yang cocok dengan pencarian atau filter";
    el.hapus.hidden = state.q === "";

    // Batas tanggal agar pilihan tidak saling bertabrakan
    el.dari.max = state.sampai || "";
    el.sampai.min = state.dari || "";

    setParams({
      q: state.q.trim(),
      kategori: state.kategori === NILAI_AWAL.kategori ? "" : state.kategori,
      urut: state.urut === NILAI_AWAL.urut ? "" : state.urut,
      dari: state.dari, sampai: state.sampai
    });
  }

  function bukaPanelTanggal(buka) {
    el.panel.classList.toggle("open", buka);
    el.tombolTanggal.setAttribute("aria-expanded", String(buka));
  }

  function aturUlang() {
    Object.assign(state, NILAI_AWAL);
    el.cari.value = "";
    el.urut.value = NILAI_AWAL.urut;
    el.dari.value = "";
    el.sampai.value = "";
    bukaPanelTanggal(false);
    render();
  }

  // ----- Event -----
  el.cari.addEventListener("input", function () { state.q = el.cari.value; render(); });
  el.cari.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && state.q) { state.q = ""; el.cari.value = ""; render(); }
  });
  el.hapus.addEventListener("click", function () { state.q = ""; el.cari.value = ""; render(); el.cari.focus(); });
  el.urut.addEventListener("change", function () { state.urut = el.urut.value; render(); });
  el.dari.addEventListener("change", function () { state.dari = el.dari.value; render(); });
  el.sampai.addEventListener("change", function () { state.sampai = el.sampai.value; render(); });
  el.tombolTanggal.addEventListener("click", function () { bukaPanelTanggal(!el.panel.classList.contains("open")); });
  el.reset.addEventListener("click", aturUlang);
  el.grid.addEventListener("click", function (ev) {
    if (ev.target.closest("[data-reset]")) { aturUlang(); return; }
    const tautan = ev.target.closest("[data-baca]");
    if (tautan) {
      ev.preventDefault();
      if (bukaDetailBerita(tautan.dataset.baca, tautan)) setParams({ baca: tautan.dataset.baca });
    }
  });

  // ----- Keadaan awal dari URL (mis. berita.html?kategori=Akademik&q=beasiswa) -----
  const p = new URLSearchParams(location.search);
  if (p.get("q")) state.q = p.get("q");
  if (kategori.indexOf(p.get("kategori")) > 0) state.kategori = p.get("kategori");
  if (p.get("urut") === "terlama") state.urut = "terlama";
  if (/^\d{4}-\d{2}-\d{2}$/.test(p.get("dari") || "")) state.dari = p.get("dari");
  if (/^\d{4}-\d{2}-\d{2}$/.test(p.get("sampai") || "")) state.sampai = p.get("sampai");
  el.cari.value = state.q;
  el.urut.value = state.urut;
  el.dari.value = state.dari;
  el.sampai.value = state.sampai;
  if (state.dari || state.sampai) bukaPanelTanggal(true);
  render();

  // Tautan dari Dashboard: berita.html?baca=ID (modal dibuat oleh layout.js saat DOM siap)
  document.addEventListener("DOMContentLoaded", function () {
    if (getParam("baca")) bukaDetailBerita(getParam("baca"));
  });
})();
