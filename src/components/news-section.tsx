'use client';

import { useState } from 'react';

// Data Berita (Poin 3: Memiliki Kategori)
const ALL_NEWS = [
  {
    id: 1,
    title: "Pembukaan Beasiswa Unggulan 2026",
    category: "Beasiswa",
    date: "12 Oktober 2026",
    summary: "Pendaftaran beasiswa resmi dibuka untuk seluruh mahasiswa aktif.",
    image: "https://via.placeholder.com/300x180"
  },
  {
    id: 2,
    title: "Pendaftaran GemasTIK XIX Resmi Dibuka",
    category: "Kompetisi",
    date: "10 Oktober 2026",
    summary: "Segera daftarkan tim terbaikmu dalam kompetisi TI nasional tahun ini.",
    image: "https://via.placeholder.com/300x180"
  },
  {
    id: 3,
    title: "Jadwal Pelaksanaan UTS Semester Ganjil",
    category: "Akademik",
    date: "05 Oktober 2026",
    summary: "Simak jadwal lengkap ujian tengah semester ganjil tahun ajaran ini.",
    image: "https://via.placeholder.com/300x180"
  },
  {
    id: 4,
    title: "Open Recruitment Pengurus GDGoC USU",
    category: "Organisasi",
    date: "01 Oktober 2026",
    summary: "Bergabunglah bersama komunitas developer di kampus kita.",
    image: "https://via.placeholder.com/300x180"
  }
];

export default function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState('Semua'); // Poin 4: Filter
  const [searchQuery, setSearchQuery] = useState('');                 // Poin 5: Search

  const filteredNews = ALL_NEWS.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Berita Terbaru</h2>

      {/* Poin 5: Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cari berita berdasarkan judul atau ringkasan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
      </div>

      {/* Poin 4: Tombol Filter Kategori */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {['Semua', 'Akademik', 'Organisasi', 'Kompetisi', 'Beasiswa'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Daftar Berita */}
      {filteredNews.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Berita tidak ditemukan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div key={news.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={news.image} alt={news.title} className="w-full h-44 object-cover" />
              <div className="p-4">
                {/* Poin 3: Label Kategori */}
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold mb-2">
                  {news.category}
                </span>
                <p className="text-xs text-gray-400 mb-1">{news.date}</p>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{news.title}</h3>
                <p className="text-sm text-gray-600">{news.summary}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}