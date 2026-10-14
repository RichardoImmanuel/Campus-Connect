/* Prestasi: daftar prestasi dengan filter tingkat & kategori, serta detail */
(function () {
  "use strict";

  const state = { tingkat: "Semua", bidang: "Semua" };
  const grid = document.getElementById("prestasiGrid");
  const ringkasan = document.getElementById("ringkasan");

  const urut = prestasiData.slice().sort(function (a, b) { return b.tahun - a.tahun || b.id - a.id; });
  const TINGKAT = ["Semua", "Internasional", "Nasional", "Regional", "Universitas"].filter(function (t) {
    return t === "Semua" || prestasiData.some(function (p) { return p.tingkat === t; });
  });
  const BIDANG = ["Semua"].concat(urut.reduce(function (h, p) { if (h.indexOf(p.kategori) < 0) h.push(p.kategori); return h; }, []));

  const chipTingkat = buatChips(document.getElementById("chipTingkat"),
    TINGKAT.map(function (t) { return { value: t, label: t }; }),
    function (v) { state.tingkat = v; render(); }, true);
  const chipBidang = buatChips(document.getElementById("chipBidang"),
    BIDANG.map(function (b) { return { value: b, label: b }; }),
    function (v) { state.bidang = v; render(); }, true);

  function cocok(p, tingkat, bidang) {
    return (tingkat === "Semua" || p.tingkat === tingkat) && (bidang === "Semua" || p.kategori === bidang);
  }

  function render() {
    const jumlahTingkat = {}, jumlahBidang = {};
    TINGKAT.forEach(function (t) { jumlahTingkat[t] = urut.filter(function (p) { return cocok(p, t, state.bidang); }).length; });
    BIDANG.forEach(function (b) { jumlahBidang[b] = urut.filter(function (p) { return cocok(p, state.tingkat, b); }).length; });
    chipTingkat.perbarui(state.tingkat, jumlahTingkat);
    chipBidang.perbarui(state.bidang, jumlahBidang);

    const hasil = urut.filter(function (p) { return cocok(p, state.tingkat, state.bidang); });
    grid.innerHTML = hasil.length
      ? hasil.map(function (p, i) { return prestasiCardHTML(p, Math.min(i, 8)); }).join("")
      : emptyStateHTML("Belum ada prestasi yang cocok", "Coba pilih tingkat atau kategori lain.", true);
    ringkasan.textContent = "Menampilkan " + hasil.length + " dari " + prestasiData.length + " prestasi";
  }

  function aturUlang() { state.tingkat = "Semua"; state.bidang = "Semua"; render(); }

  document.getElementById("resetPrestasi").addEventListener("click", aturUlang);
  grid.addEventListener("click", function (ev) {
    if (ev.target.closest("[data-reset]")) { aturUlang(); return; }
    const tautan = ev.target.closest("a[data-detail]");
    if (tautan) {
      ev.preventDefault();
      if (bukaDetailPrestasi(tautan.dataset.detail, tautan)) setParams({ detail: tautan.dataset.detail });
    }
  });

  render();
  document.addEventListener("DOMContentLoaded", function () {
    if (getParam("detail")) bukaDetailPrestasi(getParam("detail"));
  });
})();
