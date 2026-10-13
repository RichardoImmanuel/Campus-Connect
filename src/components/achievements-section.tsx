import { Award, Medal, Trophy } from "lucide-react";

type Achievement = {
  id: number;
  studentName: string;
  title: string;
  competition: string;
  level: "Internasional" | "Nasional" | "Regional" | "Universitas";
  rank: string;
  year: number;
  icon: "trophy" | "medal" | "award";
};

// Bentuk data mengikuti tabel Achievements di dokumen "Penjelasan Proyek":
// nama mahasiswa (studentName), tingkat kompetisi (level), dan tahun (year).
// DATA CONTOH. Ganti dengan data prestasi mahasiswa yang sebenarnya.
const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    studentName: "Andi Pratama",
    title: "Juara 1 Lomba Pemrograman",
    competition: "GemasTIK XVIII",
    level: "Nasional",
    rank: "Juara 1",
    year: 2025,
    icon: "trophy",
  },
  {
    id: 2,
    studentName: "Siti Rahmadani",
    title: "Medali Perak Olimpiade Sains",
    competition: "Olimpiade Matematika Perguruan Tinggi",
    level: "Nasional",
    rank: "Medali Perak",
    year: 2025,
    icon: "medal",
  },
  {
    id: 3,
    studentName: "Tim Cipta Digital",
    title: "Juara 2 Hackathon Kota Cerdas",
    competition: "Hackathon Smart City Sumatera Utara",
    level: "Regional",
    rank: "Juara 2",
    year: 2025,
    icon: "trophy",
  },
  {
    id: 4,
    studentName: "Budi Santoso",
    title: "Best Paper Konferensi Mahasiswa",
    competition: "Seminar Nasional Teknologi Informasi",
    level: "Nasional",
    rank: "Best Paper",
    year: 2026,
    icon: "award",
  },
  {
    id: 5,
    studentName: "Maya Lestari",
    title: "Finalis Kompetisi Desain UI/UX",
    competition: "UI/UX Design Challenge",
    level: "Internasional",
    rank: "Finalis",
    year: 2026,
    icon: "medal",
  },
  {
    id: 6,
    studentName: "Rizky Hutapea",
    title: "Juara 3 Lomba Debat Bahasa Indonesia",
    competition: "Debat Antar Fakultas",
    level: "Universitas",
    rank: "Juara 3",
    year: 2026,
    icon: "award",
  },
];

const ICONS = { trophy: Trophy, medal: Medal, award: Award } as const;

export default function AchievementsSection() {
  return (
    <section id="prestasi" className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2 text-center">Prestasi Mahasiswa</h2>
      <p className="text-center text-muted-foreground mb-8">
        Capaian mahasiswa di bidang akademik, kompetisi, dan organisasi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <article
              key={item.id}
              className="border border-border bg-card text-card-foreground rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="inline-block bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs px-2.5 py-0.5 rounded-full font-semibold mb-2">
                    {item.level}
                  </span>
                  <h3 className="text-lg font-bold text-foreground leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted-foreground">Peraih</dt>
                  <dd className="font-medium text-foreground">{item.studentName}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted-foreground">Kompetisi</dt>
                  <dd className="text-foreground">{item.competition}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-muted-foreground">Capaian</dt>
                  <dd className="text-foreground">
                    {item.rank} ({item.year})
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </section>
  );
}
