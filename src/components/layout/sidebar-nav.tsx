"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  MessagesSquare,
  Newspaper,
  Bell,
  User,
  Users,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem, IconName } from "@/lib/nav";

const icons: Record<IconName, React.ElementType> = {
  dashboard: LayoutDashboard,
  calendar: CalendarDays,
  forum: MessagesSquare,
  news: Newspaper,
  bell: Bell,
  user: User,
  users: Users,
  shield: ShieldCheck,
  back: ArrowLeft,
};

export function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 p-3">
      {items.map(({ title, href, icon }) => {
        const Icon = icons[icon];
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {title}
          </Link>
        );
      })}
    </nav>
  );
}