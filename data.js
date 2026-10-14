/* =========================================
   DATA CAMPUSCONNECT (dipakai semua halaman)
   Semua konten di bawah adalah DATA CONTOH.
   Ganti dengan data kampus yang sebenarnya.
   ========================================= */

// ----- BERITA (10 berita, 4 kategori) -----
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

// Isi lengkap berita (untuk tombol "Baca Selengkapnya")
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

// ----- EVENT -----
// Yang sudah ada sebelumnya: title, category, date.
// Yang DITAMBAHKAN (contoh): time, location, image, summary, detail.
const eventsData = [
  { id: 1, title: "Seminar Cybersecurity & Forensik", category: "Akademik",   date: "2026-10-20", time: "09.00 – 12.00 WIB", location: "Aula Utama Kampus",
    image: "https://picsum.photos/seed/cyber/600/400",
    summary: "Kenali ancaman keamanan siber dan dasar analisis forensik digital bersama praktisi.",
    detail: `Seminar ini membahas ancaman keamanan siber yang sering dihadapi pengguna dan organisasi, serta pengantar forensik digital.\n\nPeserta mendapat gambaran alur penanganan insiden dan kebiasaan aman yang bisa langsung diterapkan sehari-hari.\n\nCatatan: Waktu, lokasi, dan isi acara ini adalah contoh konten dan perlu disesuaikan dengan pengumuman resmi.` },
  { id: 2, title: "Lomba UI/UX Design Nasional", category: "Kompetisi",   date: "2026-10-25", time: "08.00 – 17.00 WIB", location: "Gedung Fakultas Teknologi Informasi",
    image: "https://picsum.photos/seed/uiux/600/400",
    summary: "Rancang solusi antarmuka yang mudah digunakan dan bersaing dengan tim dari berbagai kampus.",
    detail: `Lomba ini mengajak mahasiswa merancang pengalaman pengguna untuk sebuah studi kasus, mulai dari riset singkat, wireframe, hingga prototipe yang dipresentasikan kepada juri.\n\nPeserta dinilai dari kejelasan alur, kemudahan penggunaan, dan kualitas visual.\n\nCatatan: Waktu, lokasi, dan ketentuan lomba ini adalah contoh konten dan perlu disesuaikan dengan pengumuman resmi.` },
  { id: 3, title: "Workshop Web Development", category: "Akademik",       date: "2026-11-01", time: "09.00 – 15.00 WIB", location: "Laboratorium Komputer",
    image: "https://picsum.photos/seed/webdev/600/400",
    summary: "Praktik membuat halaman web responsif dari nol, cocok untuk pemula.",
    detail: `Workshop ini memandu peserta membangun halaman web sederhana dengan HTML, CSS, dan JavaScript, lalu membuatnya nyaman dibuka di layar ponsel.\n\nBawa laptop masing-masing agar bisa praktik langsung bersama mentor.\n\nCatatan: Waktu, lokasi, dan materi ini adalah contoh konten dan perlu disesuaikan dengan pengumuman resmi.` },
  { id: 4, title: "Open Recruitment BEM Fakultas", category: "Organisasi", date: "2026-11-10", time: "10.00 – 14.00 WIB", location: "Sekretariat BEM Fakultas",
    image: "https://picsum.photos/seed/oprec/600/400",
    summary: "Bergabung dengan BEM dan ikut menyusun program kerja untuk mahasiswa fakultas.",
    detail: `BEM Fakultas membuka kesempatan bagi mahasiswa yang ingin belajar berorganisasi, memimpin kegiatan, dan berkontribusi bagi lingkungan kampus.\n\nSeleksi mencakup pengisian formulir dan wawancara singkat.\n\nCatatan: Waktu, lokasi, dan alur seleksi ini adalah contoh konten dan perlu dikonfirmasi kepada BEM terkait.` },
  { id: 5, title: "Sosialisasi Beasiswa LPDP", category: "Beasiswa",     date: "2026-11-15", time: "13.00 – 15.00 WIB", location: "Ruang Seminar Lantai 3",
    image: "https://picsum.photos/seed/lpdp/600/400",
    summary: "Pelajari syarat, tahapan seleksi, dan tips menyiapkan berkas beasiswa LPDP.",
    detail: `Sosialisasi ini menjelaskan gambaran program beasiswa, persyaratan umum, tahapan seleksi, serta cara menyiapkan dokumen dan esai.\n\nSesi tanya jawab dibuka di akhir acara.\n\nCatatan: Waktu, lokasi, dan isi sosialisasi ini adalah contoh konten. Periksa informasi resmi penyelenggara beasiswa.` }
];

// ----- PRESTASI -----
// Menggabungkan 6 kartu prestasi + 6 daftar prestasi yang sebelumnya terpisah.
// Entri 7 (Inovasi Sosial) dipertahankan dari kartu lama dan diberi data contoh.
const prestasiData = [
  { id: 1, nama: "Andi Pratama",   peringkat: "Juara 1",      lomba: "Lomba Pemrograman GemasTIK XVIII",         tingkat: "Nasional",      tahun: 2025, kategori: "Teknologi",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    deskripsi: "Ajang untuk mengembangkan kemampuan algoritma, logika, dan pemecahan masalah melalui pemrograman." },
  { id: 2, nama: "Siti Rahmadani", peringkat: "Medali Perak", lomba: "Olimpiade Matematika Perguruan Tinggi",    tingkat: "Nasional",      tahun: 2025, kategori: "Akademik",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80",
    deskripsi: "Kompetisi akademik untuk menguji pengetahuan, ketelitian, dan kemampuan berpikir kritis mahasiswa." },
  { id: 3, nama: "Tim Cipta Digital", peringkat: "Juara 2",   lomba: "Hackathon Smart City Sumatera Utara",      tingkat: "Regional",      tahun: 2025, kategori: "Inovasi",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
    deskripsi: "Ajang pengembangan ide dan solusi digital untuk menjawab berbagai permasalahan di masyarakat." },
  { id: 4, nama: "Budi Santoso",   peringkat: "Best Paper",   lomba: "Seminar Nasional Teknologi Informasi",     tingkat: "Nasional",      tahun: 2026, kategori: "Akademik",
    image: "https://picsum.photos/seed/bestpaper/900/600",
    deskripsi: "Penghargaan untuk karya ilmiah terbaik pada seminar yang mempertemukan peneliti dan mahasiswa bidang teknologi informasi." },
  { id: 5, nama: "Maya Lestari",   peringkat: "Finalis",      lomba: "UI/UX Design Challenge",                   tingkat: "Internasional", tahun: 2026, kategori: "Kreativitas",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80",
    deskripsi: "Pengembangan desain antarmuka dan pengalaman pengguna yang kreatif, menarik, serta mudah digunakan." },
  { id: 6, nama: "Rizky Hutapea",  peringkat: "Juara 3",      lomba: "Debat Bahasa Indonesia Antar Fakultas",    tingkat: "Universitas",   tahun: 2026, kategori: "Komunikasi",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
    deskripsi: "Melatih kemampuan menyampaikan argumen, berpikir kritis, dan berkomunikasi secara terstruktur." },
  { id: 7, nama: "Tim Mahasiswa Peduli Lingkungan", peringkat: "Penghargaan", lomba: "Program Inovasi Sosial",    tingkat: "Universitas",   tahun: 2026, kategori: "Pengabdian",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    deskripsi: "Kegiatan mahasiswa untuk menciptakan solusi kreatif yang memberikan manfaat bagi masyarakat." }
];

// ----- PENGUMUMAN PENTING (diambil dari berita yang sudah ada) -----
const pengumumanData = [
  { newsId: 1,  label: "Pengisian KRS Semester Genap", info: "12–20 Okt 2026" },
  { newsId: 10, label: "Pendaftaran Beasiswa Unggulan Daerah", info: "Hingga 30 Okt 2026" },
  { newsId: 3,  label: "Perpustakaan buka hingga 21.00", info: "Selama masa ujian" }
];
