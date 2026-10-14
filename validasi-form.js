/* =========================================
   TUGAS 11 (TAMBAHAN): VALIDASI FORM PENDAFTARAN EVENT
   -----------------------------------------
   File ini hanya MENAMBAH fitur. Tidak ada kode di script.js
   atau index.html yang diubah. Cara kerjanya:
   - Pengecekan dijalankan lebih dulu (fase capture) sebelum
     handler submit bawaan di script.js.
   - Kalau ada isian yang salah, pengiriman dihentikan dan pesan
     error muncul di bawah kolom yang bermasalah.
   - Kalau semua benar, handler bawaan berjalan seperti biasa.
   Validasi memakai JavaScript biasa, tanpa library.
   ========================================= */
(function () {
  "use strict";

  const form = document.getElementById("formEvent");
  if (!form) return;

  // Matikan validasi bawaan browser agar pesan error kita yang tampil
  form.noValidate = true;

  // ----- Aturan validasi -----
  const POLA_NAMA = /^[\p{L} .,'-]+$/u; // huruf, spasi, titik, koma, apostrof, strip
  const POLA_NIM = /^\d{8,12}$/;        // 8 sampai 12 digit angka
  const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const kolom = {
    nama: document.getElementById("nama"),
    nim: document.getElementById("nim"),
    email: document.getElementById("email"),
    pilihanEvent: document.getElementById("pilihanEvent")
  };
  const pesanUmum = document.getElementById("pesanError");

  // Setiap fungsi mengembalikan teks error, atau "" jika isian valid
  const aturan = {
    nama: function (nilai) {
      const nama = nilai.trim();
      if (nama === "") return "Nama wajib diisi.";
      if (nama.length < 3) return "Nama minimal 3 karakter.";
      if (nama.length > 100) return "Nama maksimal 100 karakter.";
      if (!POLA_NAMA.test(nama)) return "Nama hanya boleh berisi huruf dan spasi.";
      return "";
    },
    nim: function (nilai) {
      const nim = nilai.trim();
      if (nim === "") return "NIM wajib diisi.";
      if (!/^\d+$/.test(nim)) return "NIM hanya boleh berisi angka.";
      if (!POLA_NIM.test(nim)) return "NIM harus 8 sampai 12 digit.";
      return "";
    },
    email: function (nilai) {
      const email = nilai.trim();
      if (email === "") return "Email wajib diisi.";
      if (email.length > 100) return "Email maksimal 100 karakter.";
      if (!POLA_EMAIL.test(email)) return "Format email tidak valid, contoh: nama@kampus.ac.id.";
      return "";
    },
    pilihanEvent: function (nilai) {
      if (nilai === "") return "Pilih salah satu event.";
      return "";
    }
  };

  // ----- Tampilan error -----
  const gaya = document.createElement("style");
  gaya.textContent =
    ".field-error{color:#d32f2f;font-size:13px;font-weight:600;margin-top:4px;}" +
    ".form-group input.input-invalid,.form-group select.input-invalid{border-color:#d32f2f;background-color:#fff5f5;}" +
    ".form-group input.input-valid,.form-group select.input-valid{border-color:#2e7d32;}";
  document.head.appendChild(gaya);

  // Siapkan elemen pesan di bawah tiap kolom + atribut aksesibilitas
  Object.keys(kolom).forEach(function (kunci) {
    const input = kolom[kunci];
    if (!input) return;

    const pesan = document.createElement("p");
    pesan.className = "field-error";
    pesan.id = "error-" + input.id;
    pesan.setAttribute("role", "alert");
    pesan.hidden = true;
    input.insertAdjacentElement("afterend", pesan);
    input.setAttribute("aria-describedby", pesan.id);
  });

  if (kolom.nama) kolom.nama.maxLength = 100;
  if (kolom.email) kolom.email.maxLength = 100;
  if (kolom.nim) {
    kolom.nim.maxLength = 12;
    kolom.nim.setAttribute("inputmode", "numeric");
  }

  function tampilkanHasil(kunci, teksError) {
    const input = kolom[kunci];
    const pesan = document.getElementById("error-" + input.id);
    pesan.textContent = teksError;
    pesan.hidden = teksError === "";
    input.classList.toggle("input-invalid", teksError !== "");
    input.classList.toggle("input-valid", teksError === "");
    input.setAttribute("aria-invalid", teksError !== "" ? "true" : "false");
  }

  function validasiKolom(kunci) {
    const teksError = aturan[kunci](kolom[kunci].value);
    tampilkanHasil(kunci, teksError);
    return teksError === "";
  }

  function bersihkanSemua() {
    Object.keys(kolom).forEach(function (kunci) {
      const input = kolom[kunci];
      const pesan = document.getElementById("error-" + input.id);
      pesan.textContent = "";
      pesan.hidden = true;
      input.classList.remove("input-invalid", "input-valid");
      input.removeAttribute("aria-invalid");
    });
  }

  // ----- Validasi saat pengguna mengisi -----
  Object.keys(kolom).forEach(function (kunci) {
    const input = kolom[kunci];
    if (!input) return;

    // Cek ketika pindah kolom
    input.addEventListener("blur", function () {
      validasiKolom(kunci);
    });

    // Setelah muncul error, perbarui langsung saat pengguna mengetik
    input.addEventListener(input.tagName === "SELECT" ? "change" : "input", function () {
      if (kunci === "nim") {
        input.value = input.value.replace(/\D/g, ""); // buang selain angka
      }
      if (input.classList.contains("input-invalid") || input.classList.contains("input-valid")) {
        validasiKolom(kunci);
      }
    });
  });

  // ----- Validasi saat form dikirim -----
  // Dipasang di document dengan fase capture supaya berjalan SEBELUM
  // handler submit bawaan di script.js.
  document.addEventListener("submit", function (event) {
    if (event.target !== form) return;

    let kolomPertamaSalah = null;
    Object.keys(kolom).forEach(function (kunci) {
      if (!validasiKolom(kunci) && !kolomPertamaSalah) {
        kolomPertamaSalah = kolom[kunci];
      }
    });

    if (kolomPertamaSalah) {
      event.preventDefault();
      event.stopPropagation(); // handler bawaan tidak ikut jalan
      if (pesanUmum) pesanUmum.innerText = "Periksa kembali isian yang ditandai merah.";
      kolomPertamaSalah.focus();
    } else if (pesanUmum) {
      pesanUmum.innerText = "";
    }
  }, true);

  // Form dikosongkan (misal saat modal ditutup) -> hapus tanda error
  form.addEventListener("reset", bersihkanSemua);
})();
