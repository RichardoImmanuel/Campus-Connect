import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarNav } from "./sidebar-nav";
import { ThemeToggle } from "./theme-toggle";
import { mainNav } from "@/lib/nav";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background px-4">
      {/* Menu mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="p-4 font-bold">Campus Connect</SheetTitle>
          <SidebarNav items={mainNav} />
        </SheetContent>
      </Sheet>

      <span className="font-bold md:hidden">Campus Connect</span>
      <div className="flex-1" />

      {/* Slot lonceng notifikasi: diisi Anggota 5 */}
      <div id="notification-slot" />

      <ThemeToggle />
      <Avatar className="h-8 w-8">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </header>
  );
}