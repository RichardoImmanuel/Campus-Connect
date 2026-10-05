import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { mainNav } from "@/lib/nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r md:block">
        <div className="flex h-14 items-center px-6 font-bold">
          Campus Connect
        </div>
        <SidebarNav items={mainNav} />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}