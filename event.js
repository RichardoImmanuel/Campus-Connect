/* Event: daftar event, filter kategori/status, detail, dan pendaftaran */
(function () {
  "use strict";

  const state = { kategori: "Semua", status: "Semua" };
  const grid = document.getElementById("eventGrid");
  const ringkasan = document.getElementById("ringkasan");
  const modalDaftar = document.getElementById("modalPendaftaran");
  const form = document.getElementById("formEvent");
  const pilihan = document.getElementById("pilihanEvent");

  const urut = eventsData.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
  const kategori = ["Semua"].concat(urut.reduce(function (h, e) { if (h.indexOf(e.category) < 0) h.push(e.category); return h; }, []));
  const daftarStatus = ["Semua", "akan", "berlangsung", "selesai"];

  // Isi pilihan event pada form dari data (nilai = nama event, seperti sebelumnya)
  urut.forEach(function (e) {
    const o = document.createElement("option");
    o.value = e.title;
    o.textContent = e.title;
    pilihan.appendChild(o);
  });

  const chipKategori = buatChips(
    document.getElementById("chipKategori"),
    kategori.map(function (k) { return { value: k, label: k === "Semua" ? "Semua Kategori" : k }; }),
    function (v) { state.kategori = v; render(); }, true);
  const chipStatus = buatChips(
    document.getElementById("chipStatus"),
    daftarStatus.map(function (s) { return { value: s, label: s === "Semua" ? "Semua Status" : STATUS_LABEL[s] }; }),
    function (v) { state.status = v; render(); }, true);

  function render() {
    const jumlahKat = {}, jumlahStatus = {};
    kategori.forEach(function (k) {
      jumlahKat[k] = urut.filter(function (e) { return (k === "Semua" || e.category === k) && (state.status === "Semua" || eventStatus(e) === state.status); }).length;
    });
    daftarStatus.forEach(function (s) {
      jumlahStatus[s] = urut.filter(function (e) { return (s === "Semua" || eventStatus(e) === s) && (state.kategori === "Semua" || e.category === state.kategori); }).length;
    });
    chipKategori.perbarui(state.kategori, jumlahKat);
    chipStatus.perbarui(state.status, jumlahStatus);

    const hasil = urut.filter(function (e) {
      return (state.kategori === "Semua" || e.category === state.kategori) && (state.status === "Semua" || eventStatus(e) === state.status);
    });
    grid.innerHTML = hasil.length
      ? hasil.map(function (e, i) { return eventCardHTML(e, Math.min(i, 8)); }).join("")
      : emptyStateHTML("Belum ada event yang cocok", "Coba pilih kategori atau status lain.", true);
    ringkasan.textContent = "Menampilkan " + hasil.length + " dari " + eventsData.length + " event";
  }

  function aturUlang() { state.kategori = "Semua"; state.status = "Semua"; render(); }

  // ----- Detail event -----
  function bukaDetailEvent(id, pemicu) {
    const e = eventsData.find(function (x) { return x.id === Number(id); });
    if (!e) return false;
    const status = eventStatus(e);
    tampilkanDetail({
      image: e.image, judul: e.title, pemicu: pemicu,
      badges: [badgeKategori(e.category), badgeStatus(status)],
      fakta: [["calendar", "Tanggal", formatDate(e.date)], ["clock", "Waktu", e.time], ["pin", "Lokasi", e.location]],
      isi: e.detail,
      aksi: (status === "selesai" ? "" : '<button type="button" class="btn btn-sun" data-daftar="' + e.id + '">Daftar Event</button>') + TOMBOL_TUTUP_DETAIL,
      saatTutup: function () { setParams({ detail: null }); }
    });
    return true;
  }

  // ----- Form pendaftaran -----
  function bukaDaftar(id) {
    const e = eventsData.find(function (x) { return x.id === Number(id); });
    if (!e) return;
    const detail = document.getElementById("detailModal");
    let asal = document.activeElement;
    if (detail.classList.contains("is-open")) { asal = Modal.terakhirFokus; Modal.tutup(detail); }
    pilihan.value = e.title;
    document.getElementById("pesanError").innerText = "";
    Modal.buka(modalDaftar, asal);
  }

  modalDaftar.addEventListener("modal:tutup", function () { form.reset(); });

  // Dijalankan hanya jika validasi (validasi-form.js) lolos
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const acara = pilihan.value;
    Modal.tutup(modalDaftar);
    toast("Pendaftaran berhasil! " + nama + " terdaftar di " + acara + ".");
  });

  // ----- Event klik -----
  document.getElementById("resetEvent").addEventListener("click", aturUlang);
  document.addEventListener("click", function (ev) {
    if (ev.target.closest("[data-reset]")) { aturUlang(); return; }
    const daftar = ev.target.closest("[data-daftar]");
    if (daftar && !daftar.disabled) { bukaDaftar(daftar.dataset.daftar); return; }
    const detail = ev.target.closest("a[data-detail]");
    if (detail) {
      ev.preventDefault();
      if (bukaDetailEvent(detail.dataset.detail, detail)) setParams({ detail: detail.dataset.detail });
    }
  });

  render();
  document.addEventListener("DOMContentLoaded", function () {
    if (getParam("detail")) bukaDetailEvent(getParam("detail"));
  });
})();
