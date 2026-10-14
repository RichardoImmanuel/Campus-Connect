/* =========================================
   HALAMAN EVENT (event.html)
   - Menampilkan daftar event + filter kategori
   - Tombol Daftar Event membuka modal berisi form
   - Validasi form dikerjakan oleh validasi-form.js
   ========================================= */

// Data event. Ganti dengan event kampus yang sebenarnya.
const eventData = [
  { id: 1, title: "Seminar Cybersecurity & Forensik",  date: "2026-10-20", time: "09.00 – 12.00 WIB", place: "Aula Utama",            category: "Akademik",   quota: 150, desc: "Pengenalan keamanan siber dan forensik digital bersama praktisi industri." },
  { id: 2, title: "Lomba UI/UX Design Nasional",       date: "2026-10-25", time: "08.00 – 17.00 WIB", place: "Gedung Fakultas Teknik", category: "Kompetisi",  quota: 60,  desc: "Rancang prototipe aplikasi dalam satu hari, dinilai oleh desainer profesional." },
  { id: 3, title: "Workshop Web Development",          date: "2026-11-01", time: "13.00 – 16.00 WIB", place: "Lab Komputer 2",         category: "Akademik",   quota: 40,  desc: "Belajar membangun website dengan HTML, CSS, Tailwind, dan JavaScript." },
  { id: 4, title: "Open Recruitment BEM Fakultas",     date: "2026-11-10", time: "10.00 – 15.00 WIB", place: "Sekretariat BEM",        category: "Organisasi", quota: 100, desc: "Pendaftaran pengurus baru BEM Fakultas untuk periode kepengurusan berikutnya." },
  { id: 5, title: "Sosialisasi Beasiswa LPDP",         date: "2026-11-15", time: "09.00 – 11.30 WIB", place: "Ruang Seminar Lt. 3",    category: "Beasiswa",   quota: 120, desc: "Penjelasan syarat, tahapan seleksi, dan tips menyiapkan berkas beasiswa." }
];

const KATEGORI = ["Semua", "Akademik", "Kompetisi", "Organisasi", "Beasiswa"];

// Kelas warna badge sudah ada di style.css
const badgeKelas = {
  Akademik: "badge-akademik",
  Kompetisi: "badge-kompetisi",
  Organisasi: "badge-organisasi",
  Beasiswa: "badge-beasiswa"
};

let kategoriAktif = "Semua";
const sudahDaftar = new Set(); // id event yang sudah didaftar (hanya selama halaman terbuka)

const grid = document.getElementById("event-grid");
const filterBox = document.getElementById("filter-event");
const jumlahEl = document.getElementById("jumlah-event");
const modal = document.getElementById("modalPendaftaran");
const form = document.getElementById("formEvent");
const pesanError = document.getElementById("pesanError");
const pilihan = document.getElementById("pilihanEvent");

// "2026-10-20" -> "Selasa, 20 Oktober 2026"
function formatTanggal(str) {
  return new Date(str + "T00:00:00").toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
}

function buatKartu(ev) {
  const terdaftar = sudahDaftar.has(ev.id);
  return `
    <article class="bg-white rounded-xl border border-ink/10 p-6 flex flex-col">
      <div><span class="badge ${badgeKelas[ev.category]}">${ev.category}</span></div>
      <h3 class="font-display font-bold text-xl leading-snug">${ev.title}</h3>
      <p class="mt-2 text-ink/75">${ev.desc}</p>
      <dl class="mt-4 space-y-1 text-sm text-ink/80">
        <div><dt class="inline font-semibold">Tanggal:</dt> <dd class="inline">${formatTanggal(ev.date)}</dd></div>
        <div><dt class="inline font-semibold">Waktu:</dt> <dd class="inline">${ev.time}</dd></div>
        <div><dt class="inline font-semibold">Lokasi:</dt> <dd class="inline">${ev.place}</dd></div>
        <div><dt class="inline font-semibold">Kuota:</dt> <dd class="inline">${ev.quota} peserta</dd></div>
      </dl>
      <button type="button" class="btn-daftar mt-auto ${terdaftar ? 'opacity-60 cursor-default' : ''}"
              data-id="${ev.id}" ${terdaftar ? "disabled" : ""} style="margin-top:1.25rem">
        ${terdaftar ? "Sudah Terdaftar" : "Daftar Event"}
      </button>
    </article>`;
}

function tampilkanEvent() {
  const hasil = eventData
    .filter(ev => kategoriAktif === "Semua" || ev.category === kategoriAktif)
    .sort((a, b) => a.date.localeCompare(b.date));

  grid.innerHTML = hasil.length
    ? hasil.map(buatKartu).join("")
    : `<p class="text-ink/60">Belum ada event pada kategori ini.</p>`;
  jumlahEl.textContent = `Menampilkan ${hasil.length} dari ${eventData.length} event`;

  filterBox.querySelectorAll("button").forEach(btn => {
    const aktif = btn.dataset.kategori === kategoriAktif;
    btn.className = "rounded-full border px-4 py-1.5 text-sm font-semibold transition " +
      (aktif ? "bg-ink text-white border-ink" : "bg-white text-ink border-ink/20 hover:border-teal hover:text-teal");
    btn.setAttribute("aria-pressed", aktif);
  });
}

// ----- Filter kategori -----
KATEGORI.forEach(nama => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = nama;
  btn.dataset.kategori = nama;
  btn.addEventListener("click", () => { kategoriAktif = nama; tampilkanEvent(); });
  filterBox.appendChild(btn);
});

// ----- Isi pilihan event pada form -----
eventData.forEach(ev => {
  const opt = document.createElement("option");
  opt.value = ev.title;
  opt.textContent = ev.title;
  pilihan.appendChild(opt);
});

// ----- Modal -----
function bukaModal(namaEvent) {
  pesanError.textContent = "";
  pesanError.style.color = "";
  pilihan.value = namaEvent;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  document.getElementById("nama").focus();
}

function tutupModal() {
  modal.style.display = "none";
  document.body.style.overflow = "";
  form.reset();
}

grid.addEventListener("click", e => {
  const btn = e.target.closest(".btn-daftar");
  if (!btn || btn.disabled) return;
  const ev = eventData.find(item => item.id === Number(btn.dataset.id));
  if (ev) bukaModal(ev.title);
});

const tombolTutup = document.getElementById("tutupModalDaftar");
tombolTutup.addEventListener("click", tutupModal);
tombolTutup.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") tutupModal(); });
modal.addEventListener("click", e => { if (e.target === modal) tutupModal(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.style.display === "block") tutupModal();
});

// ----- Kirim form -----
// Handler ini hanya berjalan jika validasi-form.js menyatakan semua isian benar.
form.addEventListener("submit", e => {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const ev = eventData.find(item => item.title === pilihan.value);
  if (ev) sudahDaftar.add(ev.id);

  tutupModal();
  tampilkanEvent();
  alert(`Pendaftaran berhasil!\n\nNama: ${nama}\nEvent: ${ev ? ev.title : pilihan.value}`);
});

tampilkanEvent();
