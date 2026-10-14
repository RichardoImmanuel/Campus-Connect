/* =========================================
   TUGAS 12 (TAMBAHAN): DAFTAR PRESTASI MAHASISWA
   -----------------------------------------
   File ini hanya MENAMBAH blok baru di bawah kartu prestasi yang
   sudah ada di section #prestasi. Kode di index.html dan script.js
   tidak diubah.
   Isi blok: nama mahasiswa, juara/peringkat, nama lomba, tingkat,
   dan tahun, dengan tombol filter berdasarkan tingkat kompetisi.
   Catatan: daftar memakai <li>, bukan <article>, supaya counter
   prestasi di script.js (yang menghitung "#prestasi article") tidak
   berubah angkanya.
   ========================================= */
(function () {
  "use strict";

  const seksi = document.getElementById("prestasi");
  if (!seksi || document.getElementById("daftarPrestasi")) return;

  // DATA CONTOH. Ganti dengan data prestasi mahasiswa yang sebenarnya.
  const DATA_PRESTASI = [
    { nama: "Andi Pratama", peringkat: "Juara 1", lomba: "Lomba Pemrograman GemasTIK XVIII", tingkat: "Nasional", tahun: 2025 },
    { nama: "Siti Rahmadani", peringkat: "Medali Perak", lomba: "Olimpiade Matematika Perguruan Tinggi", tingkat: "Nasional", tahun: 2025 },
    { nama: "Tim Cipta Digital", peringkat: "Juara 2", lomba: "Hackathon Smart City Sumatera Utara", tingkat: "Regional", tahun: 2025 },
    { nama: "Budi Santoso", peringkat: "Best Paper", lomba: "Seminar Nasional Teknologi Informasi", tingkat: "Nasional", tahun: 2026 },
    { nama: "Maya Lestari", peringkat: "Finalis", lomba: "UI/UX Design Challenge", tingkat: "Internasional", tahun: 2026 },
    { nama: "Rizky Hutapea", peringkat: "Juara 3", lomba: "Debat Bahasa Indonesia Antar Fakultas", tingkat: "Universitas", tahun: 2026 }
  ];

  const TINGKAT = ["Semua", "Internasional", "Nasional", "Regional", "Universitas"];

  const WARNA_TINGKAT = {
    Internasional: "bg-coral/10 text-coral",
    Nasional: "bg-teal/10 text-teal",
    Regional: "bg-amber-100 text-amber-700",
    Universitas: "bg-ink/10 text-ink"
  };

  // Pembantu untuk membuat elemen (teks dimasukkan lewat textContent)
  function buat(tag, kelas, teks) {
    const elemen = document.createElement(tag);
    if (kelas) elemen.className = kelas;
    if (teks !== undefined) elemen.textContent = teks;
    return elemen;
  }

  // ----- Kerangka blok -----
  const blok = buat("div", "mt-14");
  blok.id = "daftarPrestasi";

  const judul = buat("h3", "font-display font-extrabold text-2xl text-ink", "Daftar Prestasi Terbaru");
  const keterangan = buat(
    "p",
    "mt-2 text-sm text-gray-600 md:text-base",
    "Pilih tingkat kompetisi untuk menyaring daftar prestasi."
  );

  const barisFilter = buat("div", "mt-5 flex flex-wrap gap-2");
  barisFilter.setAttribute("role", "group");
  barisFilter.setAttribute("aria-label", "Filter tingkat kompetisi");

  const daftar = buat("ul", "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3");
  const kosong = buat("p", "mt-6 text-sm text-gray-500", "Belum ada prestasi pada tingkat ini.");
  kosong.hidden = true;

  // ----- Kartu prestasi -----
  function buatKartu(data) {
    const item = buat(
      "li",
      "rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    );

    const atas = buat("div", "flex items-center justify-between gap-2");
    atas.appendChild(buat("span", "rounded-full bg-sun/30 px-3 py-1 text-xs font-bold text-ink", data.peringkat));
    atas.appendChild(buat("span", "text-xs font-semibold text-gray-500", String(data.tahun)));

    item.appendChild(atas);
    item.appendChild(buat("h4", "mt-4 text-lg font-bold text-ink", data.nama));
    item.appendChild(buat("p", "mt-1 text-sm leading-relaxed text-gray-600", data.lomba));
    item.appendChild(
      buat(
        "span",
        "mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold " + WARNA_TINGKAT[data.tingkat],
        data.tingkat
      )
    );
    return item;
  }

  // ----- Filter -----
  let tingkatAktif = "Semua";

  const KELAS_AKTIF = "bg-ink text-white border-ink";
  const KELAS_BIASA = "bg-white text-ink border-ink/20 hover:border-teal hover:text-teal";
  const KELAS_DASAR = "rounded-full border px-4 py-1.5 text-sm font-semibold transition";

  function tampilkan() {
    daftar.textContent = "";
    const hasil = DATA_PRESTASI.filter(function (data) {
      return tingkatAktif === "Semua" || data.tingkat === tingkatAktif;
    });
    hasil.forEach(function (data) {
      daftar.appendChild(buatKartu(data));
    });
    kosong.hidden = hasil.length > 0;

    barisFilter.querySelectorAll("button").forEach(function (tombol) {
      const aktif = tombol.dataset.tingkat === tingkatAktif;
      tombol.className = KELAS_DASAR + " " + (aktif ? KELAS_AKTIF : KELAS_BIASA);
      tombol.setAttribute("aria-pressed", aktif ? "true" : "false");
    });
  }

  TINGKAT.forEach(function (tingkat) {
    const tombol = buat("button", "", tingkat);
    tombol.type = "button";
    tombol.dataset.tingkat = tingkat;
    tombol.addEventListener("click", function () {
      tingkatAktif = tingkat;
      tampilkan();
    });
    barisFilter.appendChild(tombol);
  });

  blok.appendChild(judul);
  blok.appendChild(keterangan);
  blok.appendChild(barisFilter);
  blok.appendChild(daftar);
  blok.appendChild(kosong);
  seksi.appendChild(blok);

  tampilkan();
})();
