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