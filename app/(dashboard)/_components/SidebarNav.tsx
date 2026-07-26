"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  FileText,
  Settings,
  Globe,
} from "lucide-react";

export default function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Live Analytics", href: "/dashboard/analytics", icon: Globe },
    { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "Messages", href: "/dashboard/messages", icon: Mail },
    { name: "Blog Posts", href: "/dashboard/blogs", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md font-bold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-colors ${
                isActive
                  ? "text-[var(--theme-color)]"
                  : "text-zinc-400 dark:text-zinc-500"
              }`}
            />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
