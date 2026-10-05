import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Kiri: branding (disembunyikan di mobile) */}
      <div className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2 text-xl font-bold">
          <GraduationCap className="h-6 w-6" />
          Campus Connect
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold leading-tight">
            Semua kebutuhan kampusmu, dalam satu portal.
          </h2>
          <p className="opacity-80">
            Jadwal, tugas, forum diskusi, dan pengumuman resmi kampus.
          </p>
        </div>
        <p className="text-sm opacity-70">© 2026 Campus Connect</p>
      </div>

      {/* Kanan: form */}
      <div className="relative flex items-center justify-center p-6">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}