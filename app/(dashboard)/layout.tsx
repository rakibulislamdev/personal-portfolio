import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { 
  LogOut,
  Bell,
  Search,
} from "lucide-react";
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher";
import SidebarNav from "./_components/SidebarNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Protect Dashboard routes with NextAuth
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#0f0f0f] text-zinc-900 dark:text-white flex flex-col md:flex-row transition-colors duration-300">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#161616] border-r border-zinc-200/90 dark:border-zinc-800/80 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Dashboard Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-[#252525] border border-zinc-700/50 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              R
            </div>
            <div>
              <h2 className="font-bold text-zinc-900 dark:text-white text-base leading-none">
                Admin Panel
              </h2>
              <span className="text-[11px] font-semibold text-[var(--theme-color)] mt-1 block">
                {session.user.name || "Rakibul Islam"}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <SidebarNav />
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-5 h-5" /> Exit to Portfolio
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Bar */}
        <header className="h-20 bg-white/80 dark:bg-[#161616]/80 backdrop-blur-md border-b border-zinc-200/90 dark:border-zinc-800/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search dashboard..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="p-2.5 rounded-xl bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:scale-105 transition relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2" />
            </button>
            <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white">
              RI
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <ThemeSwitcher />
    </div>
  );
}
