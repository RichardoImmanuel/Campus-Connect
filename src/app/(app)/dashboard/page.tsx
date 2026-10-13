import UpcomingEvents from "@/components/UpcomingEvents";

export default function DashboardPage() {
  return (
    <main className="w-full min-h-screen p-8 text-white">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold font-serif">Dashboard Utama</h1>
      </div>

      {/* Memanggil komponen tugasmu agar tampil di layar */}
      <UpcomingEvents />

    </main>
  );
}