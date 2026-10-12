import NewsSection from "@/components/news-section";

export default function BeritaPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
          Portal Berita & Informasi Kampus
        </h1>
        <p className="text-muted-foreground mb-6">
          Temukan informasi terbaru seputar akademik, organisasi, kompetisi, dan beasiswa.
        </p>
        
        {/* Memanggil komponen filter, search, dan kartu berita buatanmu */}
        <NewsSection />
      </div>
    </main>
  );
}