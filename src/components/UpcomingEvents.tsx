"use client";

import React, { useState } from "react";

// Tugas 8: Data array berisi 5 event
const events = [
  { id: 1, title: "Seminar Cybersecurity & Forensik", date: "20 Okt 2026", type: "Akademik" },
  { id: 2, title: "Lomba UI/UX Design Nasional", date: "25 Okt 2026", type: "Kompetisi" },
  { id: 3, title: "Workshop Next.js & React", date: "01 Nov 2026", type: "Akademik" },
  { id: 4, title: "Open Recruitment BEM Fakultas", date: "10 Nov 2026", type: "Organisasi" },
  { id: 5, title: "Sosialisasi Beasiswa LPDP", date: "15 Nov 2026", type: "Beasiswa" },
];

export default function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [formData, setFormData] = useState({ nama: "", nim: "", email: "" });
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tugas 11: Validasi JavaScript untuk form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.nama || !formData.nim || !formData.email || !selectedEvent) {
      setError("Semua kolom wajib diisi.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format email tidak valid.");
      return;
    }

    alert(`Pendaftaran Berhasil!\nNama: ${formData.nama}\nNIM: ${formData.nim}\nEvent: ${selectedEvent}`);
    setIsModalOpen(false); 
    setFormData({ nama: "", nim: "", email: "" }); 
    setSelectedEvent("");
  };

  return (
    <section className="mt-8 w-full text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold">Upcoming Events</h2>
        {/* Tugas 9: Tombol Daftar Event */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium text-sm"
        >
          Daftar Event
        </button>
      </div>
      
      {/* Render 5 kartu Event */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {events.map((evt) => (
          <div key={evt.id} className="bg-[#1a1b1e] border border-gray-800 p-5 rounded-xl shadow-lg hover:border-gray-600 transition">
            <span className="text-xs font-semibold bg-gray-800 px-2 py-1 rounded text-gray-300 mb-3 inline-block">
              {evt.type}
            </span>
            <h3 className="font-bold text-lg leading-tight mb-2">{evt.title}</h3>
            <p className="text-sm text-gray-400">{evt.date}</p>
          </div>
        ))}
      </div>

      {/* Tugas 10: Form Modal dengan input Nama, NIM, Email, dan Pilihan Event */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-[#121212] border border-gray-800 p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-6 font-serif">Form Pendaftaran Event</h3>
            
            {error && <p className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4 text-sm border border-red-800">{error}</p>}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="bg-[#1a1b1e] border border-gray-700 w-full p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">NIM</label>
                <input 
                  type="text" 
                  className="bg-[#1a1b1e] border border-gray-700 w-full p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={formData.nim}
                  onChange={(e) => setFormData({...formData, nim: e.target.value})}
                  placeholder="Masukkan NIM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">Email</label>
                <input 
                  type="email" 
                  className="bg-[#1a1b1e] border border-gray-700 w-full p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="nama@kampus.ac.id"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">Pilih Event</label>
                <select 
                  className="bg-[#1a1b1e] border border-gray-700 w-full p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                >
                  <option value="" disabled className="text-gray-500">-- Pilih Event --</option>
                  {events.map((evt) => (
                    <option key={evt.id} value={evt.title}>{evt.title}</option>
                  ))}
                </select>
              </div>

              <div className="mt-6">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 rounded-md font-medium transition">
                  Kirim Pendaftaran
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}