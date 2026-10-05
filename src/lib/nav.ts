export type IconName =
  | "dashboard"
  | "calendar"
  | "forum"
  | "news"
  | "bell"
  | "user"
  | "users"
  | "shield"
  | "back";

export type NavItem = {
  title: string;
  href: string;
  icon: IconName;
};

export const mainNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { title: "Akademik", href: "/schedule", icon: "calendar" },
  { title: "Forum", href: "/feed", icon: "forum" },
  { title: "Berita", href: "/news", icon: "news" },
  { title: "Notifikasi", href: "/notifications", icon: "bell" },
  { title: "Profil", href: "/profile", icon: "user" },
];

export const adminNav: NavItem[] = [
  { title: "Kelola User", href: "/admin/users", icon: "users" },
  { title: "Hak Akses", href: "/admin/roles", icon: "shield" },
  { title: "Kembali ke Portal", href: "/dashboard", icon: "back" },
];