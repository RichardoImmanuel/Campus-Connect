// Konfigurasi Tailwind bersama untuk semua halaman.
// Warna dasar & font TIDAK diubah dari desain awal. Ditambah dua turunan
// lebih gelap (teal-deep, coral-deep) khusus untuk teks kecil agar kontras terbaca.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: '#1B2559',
        paper: '#F6F7FB',
        sun: '#F4B63D',
        teal: { DEFAULT: '#0E8A8C', deep: '#0A7072' },
        coral: { DEFAULT: '#E4553F', deep: '#C2432F' }
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Source Sans 3"', 'sans-serif']
      }
    }
  }
};
