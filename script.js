// Data berita (10 berita, 4 kategori)
const newsData = [
  { id: 1,  title: "Pendaftaran KRS Semester Genap Dibuka",          date: "2026-10-12", category: "Akademik",  image: "https://picsum.photos/seed/krs/600/400",       summary: "Mahasiswa dapat mengisi KRS melalui portal akademik mulai 12 hingga 20 Oktober 2026." },
  { id: 2,  title: "Jadwal Ujian Tengah Semester Dirilis",          date: "2026-10-10", category: "Akademik",  image: "https://picsum.photos/seed/uts/600/400",       summary: "Jadwal UTS tiap program studi sudah tersedia. Periksa ruang dan waktu ujianmu sejak sekarang." },
  { id: 3,  title: "Perpustakaan Kampus Perpanjang Jam Layanan",    date: "2026-10-08", category: "Akademik",  image: "https://picsum.photos/seed/library/600/400",   summary: "Perpustakaan buka hingga pukul 21.00 selama masa ujian untuk mendukung kegiatan belajar." },
  { id: 4,  title: "BEM Gelar Musyawarah Anggota Baru",              date: "2026-10-11", category: "Organisasi", image: "https://picsum.photos/seed/bem/600/400",       summary: "BEM mengundang seluruh pengurus dan anggota baru untuk menyusun program kerja semester ini." },
  { id: 5,  title: "UKM Fotografi Buka Open Recruitment",            date: "2026-10-09", category: "Organisasi", image: "https://picsum.photos/seed/photo/600/400",     summary: "Terbuka untuk semua jurusan. Tidak perlu kamera profesional, cukup semangat belajar." },
  { id: 6,  title: "Bakti Sosial Himpunan Mahasiswa di Desa Binaan", date: "2026-10-05", category: "Organisasi", image: "https://picsum.photos/seed/baksos/600/400",    summary: "Puluhan mahasiswa membantu renovasi sekolah dan mengajar di desa binaan selama dua hari." },
  { id: 7,  title: "Hackathon Nasional 2026 Terima Peserta Mahasiswa", date: "2026-10-13", category: "Kompetisi", image: "https://picsum.photos/seed/hackathon/600/400", summary: "Bentuk tim 3–4 orang dan kembangkan solusi digital untuk layanan publik. Hadiah total puluhan juta rupiah." },
  { id: 8,  title: "Tim Debat Kampus Lolos ke Babak Final Regional", date: "2026-10-07", category: "Kompetisi", image: "https://picsum.photos/seed/debat/600/400",     summary: "Tim debat berhasil mengalahkan 16 universitas dan akan tampil di final akhir bulan ini." },
  { id: 9,  title: "Beasiswa Prestasi Semester Genap Dibuka",        date: "2026-10-06", category: "Beasiswa",  image: "https://picsum.photos/seed/beasiswa1/600/400", summary: "Beasiswa untuk mahasiswa ber-IPK minimal 3,50. Siapkan transkrip dan surat rekomendasi dosen." },
  { id: 10, title: "Beasiswa Unggulan Daerah Perpanjang Pendaftaran", date: "2026-10-04", category: "Beasiswa",  image: "https://picsum.photos/seed/beasiswa2/600/400", summary: "Batas pendaftaran diperpanjang hingga 30 Oktober 2026 bagi mahasiswa dari daerah prioritas." }
];

// Warna badge tiap kategori
const categoryStyle = {
  Akademik:   "bg-ink text-white",
  Organisasi: "bg-teal text-white",
  Kompetisi:  "bg-coral text-white",
  Beasiswa:   "bg-sun text-ink"
};

// Ubah "2026-10-12" menjadi "12 Oktober 2026"
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// Buat HTML satu kartu berita
function createNewsCard(news) {
  return `
    <article class="news-card bg-white rounded-xl overflow-hidden border border-ink/10 flex flex-col" data-id="${news.id}">
      <img src="${news.image}" alt="${news.title}" loading="lazy" class="w-full h-44 object-cover">
      <div class="p-5 flex flex-col flex-1">
        <div class="flex items-center justify-between gap-2 text-sm">
          <span class="px-2.5 py-0.5 rounded-full font-semibold ${categoryStyle[news.category]}">${news.category}</span>
          <time datetime="${news.date}" class="text-ink/60">${formatDate(news.date)}</time>
        </div>
        <h3 class="mt-3 font-display font-bold text-lg leading-snug">${news.title}</h3>
        <p class="mt-2 text-ink/75 line-clamp-3">${news.summary}</p>
        <button type="button" class="read-more mt-auto pt-4 self-start font-semibold text-teal hover:underline" data-id="${news.id}">
          Baca Selengkapnya
        </button>
      </div>
    </article>`;
}

// Tampilkan semua berita ke halaman
function renderNews(list) {
  document.getElementById("news-grid").innerHTML = list.map(createNewsCard).join("");
}

renderNews(newsData);


/* =========================================
   DETAIL LENGKAP 10 BERITA
   ========================================= */

const newsDetails = {
  1: `Pendaftaran Kartu Rencana Studi (KRS) Semester Genap dibuka mulai 12 hingga 20 Oktober 2026.

Mahasiswa diharapkan memeriksa mata kuliah yang akan diambil sebelum melakukan pengisian KRS. Pastikan mata kuliah yang dipilih sesuai dengan kurikulum, jumlah SKS yang diperbolehkan, dan persyaratan akademik.

Sebelum menyelesaikan pengisian, periksa kembali seluruh mata kuliah agar tidak terjadi kesalahan. Jika mengalami kendala, mahasiswa dapat menghubungi bagian akademik atau dosen pembimbing akademik.

Catatan: Informasi jadwal dan prosedur ini merupakan contoh konten portal dan perlu disesuaikan dengan pengumuman resmi kampus.`,

  2: `Jadwal Ujian Tengah Semester (UTS) untuk setiap program studi telah dirilis dalam contoh pengumuman akademik ini.

Mahasiswa disarankan memeriksa jadwal ujian masing-masing, termasuk tanggal, jam, mata kuliah, dan lokasi ruang ujian. Persiapkan materi sejak dini agar proses belajar lebih teratur.

Pastikan juga persyaratan ujian dan ketentuan dari dosen telah dipahami. Hindari datang terlambat dan siapkan perlengkapan yang diperlukan sebelum hari ujian.

Catatan: Jadwal aktual harus diperiksa melalui portal akademik atau pengumuman resmi kampus.`,

  3: `Perpustakaan kampus dalam contoh informasi ini memperpanjang jam layanan hingga pukul 21.00 selama masa ujian.

Perpanjangan jam operasional diharapkan membantu mahasiswa yang membutuhkan waktu tambahan untuk membaca referensi, mengerjakan tugas, dan mempersiapkan ujian.

Mahasiswa dapat memanfaatkan koleksi buku, bahan bacaan, serta fasilitas belajar yang tersedia. Tetap jaga ketenangan dan kebersihan agar semua pengunjung dapat belajar dengan nyaman.

Catatan: Jam layanan aktual perlu dikonfirmasi kepada pihak perpustakaan.`,

  4: `Badan Eksekutif Mahasiswa (BEM) mengadakan musyawarah anggota baru untuk membahas arah kegiatan dan program kerja organisasi.

Kegiatan ini dapat menjadi kesempatan bagi pengurus dan anggota baru untuk menyampaikan ide, berdiskusi, serta menentukan prioritas kegiatan selama satu semester.

Partisipasi anggota penting agar program yang disusun sesuai dengan kebutuhan mahasiswa. Melalui musyawarah, organisasi juga dapat membagi tanggung jawab dan memperkuat kerja sama tim.

Catatan: Informasi pelaksanaan kegiatan ini merupakan contoh konten dan perlu dikonfirmasi kepada BEM terkait.`,

  5: `Unit Kegiatan Mahasiswa (UKM) Fotografi membuka kesempatan bagi mahasiswa yang ingin mengembangkan kemampuan fotografi dan kreativitas visual.

Kegiatan UKM dapat mencakup pengenalan komposisi, pencahayaan, teknik mengambil gambar, penyuntingan foto, hingga dokumentasi acara kampus.

Mahasiswa dari berbagai program studi dapat belajar bersama. Kamera profesional bukan satu-satunya syarat untuk memulai karena kamera ponsel juga dapat digunakan untuk berlatih.

Catatan: Persyaratan dan periode pendaftaran harus diperiksa melalui pengumuman resmi UKM Fotografi.`,

  6: `Himpunan mahasiswa menyelenggarakan kegiatan bakti sosial di desa binaan sebagai bentuk kepedulian terhadap masyarakat.

Kegiatan dalam contoh berita ini mencakup bantuan renovasi sekolah dan kegiatan belajar bersama anak-anak selama dua hari. Mahasiswa dapat berkontribusi melalui tenaga, pengetahuan, serta kegiatan edukatif.

Selain memberikan manfaat kepada masyarakat, kegiatan sosial juga membantu mahasiswa mengembangkan kerja sama, komunikasi, dan rasa tanggung jawab.

Catatan: Rincian kegiatan ini merupakan contoh untuk demonstrasi website, bukan laporan kejadian yang telah diverifikasi.`,

  7: `Hackathon Nasional 2026 dalam contoh pengumuman ini membuka kesempatan bagi mahasiswa untuk mengembangkan solusi digital bagi berbagai permasalahan layanan publik.

Peserta dapat membentuk tim beranggotakan tiga hingga empat orang. Tim kemudian menentukan masalah yang ingin diselesaikan, merancang solusi, dan mengembangkan prototipe untuk dipresentasikan.

Kompetisi seperti ini dapat menjadi sarana untuk melatih pemrograman, kreativitas, kolaborasi, serta kemampuan memecahkan masalah.

Sebelum mendaftar, pastikan membaca persyaratan peserta, jadwal, mekanisme seleksi, dan ketentuan hadiah pada penyelenggara resmi.`,

  8: `Tim debat kampus dalam contoh berita ini berhasil melaju ke babak final regional setelah melalui rangkaian pertandingan.

Kompetisi debat melatih mahasiswa untuk menyusun argumen berdasarkan bukti, berpikir kritis, menanggapi pendapat lawan, serta menyampaikan gagasan dengan jelas.

Keberhasilan menuju final dapat menjadi motivasi bagi mahasiswa lain untuk mengembangkan kemampuan komunikasi dan berpikir analitis.

Catatan: Nama tim, hasil pertandingan, dan jadwal final perlu disesuaikan dengan hasil kompetisi yang benar-benar terjadi.`,

  9: `Beasiswa Prestasi Semester Genap dalam contoh informasi ini ditujukan bagi mahasiswa yang memenuhi persyaratan akademik, termasuk IPK minimal 3,50.

Calon pendaftar dapat mulai menyiapkan transkrip nilai, surat rekomendasi dosen, serta dokumen pendukung lainnya sesuai ketentuan penyelenggara.

Sebelum mengirimkan berkas, periksa kembali kelengkapan dokumen, batas waktu pendaftaran, kriteria penerima, dan tahapan seleksi.

Catatan: Persyaratan dan ketersediaan beasiswa aktual harus dikonfirmasi melalui penyelenggara resmi.`,

  10: `Informasi Beasiswa Unggulan Daerah dalam contoh berita ini menyampaikan perpanjangan batas pendaftaran hingga 30 Oktober 2026 bagi mahasiswa yang memenuhi kriteria program.

Mahasiswa yang berminat sebaiknya memeriksa cakupan penerima, persyaratan domisili, prestasi akademik, dokumen administrasi, dan mekanisme pengajuan.

Perpanjangan waktu dapat memberikan kesempatan tambahan untuk melengkapi berkas. Namun, calon penerima tetap perlu memastikan bahwa informasi tersebut benar-benar diumumkan oleh penyelenggara resmi.

Catatan: Tanggal dan ketentuan pada konten contoh ini harus diverifikasi sebelum dipublikasikan sebagai informasi aktual.`
};

/* =========================================
   FUNGSI BACA SELENGKAPNYA
   ========================================= */

const detailModal = document.getElementById("detailBeritaModal");

function bukaDetailBerita(id) {
  const berita = newsData.find(item => item.id === Number(id));

  if (!berita) return;

  document.getElementById("detailGambar").src = berita.image;
  document.getElementById("detailGambar").alt = berita.title;
  document.getElementById("detailKategori").textContent = berita.category;
  document.getElementById("detailTanggal").textContent =
    formatDate(berita.date);
  document.getElementById("detailJudul").textContent = berita.title;
  document.getElementById("detailIsi").textContent =
    newsDetails[berita.id] || berita.summary;

  detailModal.classList.remove("hidden");
  detailModal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function tutupDetailBerita() {
  detailModal.classList.add("hidden");
  detailModal.classList.remove("flex");
  document.body.style.overflow = "";
}

// Klik tombol Baca Selengkapnya
document.getElementById("news-grid").addEventListener("click", function(event) {
  const tombol = event.target.closest(".read-more");

  if (tombol) {
    bukaDetailBerita(tombol.dataset.id);
  }
});

// Tombol tutup di bagian atas dan bawah
document.getElementById("tutupDetailBerita").addEventListener(
  "click",
  tutupDetailBerita
);

document.getElementById("tutupDetailBawah").addEventListener(
  "click",
  tutupDetailBerita
);

// Tutup jika mengeklik area gelap di luar modal
detailModal.addEventListener("click", function(event) {
  if (event.target === detailModal) {
    tutupDetailBerita();
  }
});

// Tutup menggunakan tombol Escape
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && !detailModal.classList.contains("hidden")) {
    tutupDetailBerita();
  }
});


// Nanti ditambahkan: filter, search, modal, validasi form, counter.


/* =========================================
   JAVASCRIPT TUGAS 11 (MODAL & VALIDASI)
   ========================================= */
function bukaModal(namaEvent) {
    document.getElementById("modalPendaftaran").style.display = "block";
    document.getElementById("pilihanEvent").value = namaEvent;
    document.getElementById("pesanError").innerText = ""; 
}

function tutupModal() {
    document.getElementById("modalPendaftaran").style.display = "none";
    document.getElementById("formEvent").reset();
}

window.onclick = function(event) {
    let modal = document.getElementById("modalPendaftaran");
    if (event.target == modal) {
        tutupModal();
    }
}

document.getElementById("formEvent").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    let nama = document.getElementById("nama").value.trim();
    let nim = document.getElementById("nim").value.trim();
    let email = document.getElementById("email").value.trim();
    let pilihanEvent = document.getElementById("pilihanEvent").value;
    let pesanError = document.getElementById("pesanError");

    if (nama === "" || nim === "" || email === "" || pilihanEvent === "") {
        pesanError.innerText = "Error: Semua kolom wajib diisi!";
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        pesanError.innerText = "Error: Format email tidak valid!";
        return;
    }

    alert("Pendaftaran Berhasil!\n\nNama: " + nama + "\nNIM: " + nim + "\nEvent: " + pilihanEvent);
    tutupModal();
});