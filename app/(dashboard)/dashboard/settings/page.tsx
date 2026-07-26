"use client";

import React, { useState } from "react";
import { Settings, Save, Lock, User, Globe } from "lucide-react";
import { toast } from "sonner";

export default function DashboardSettingsPage() {
  const [profile, setProfile] = useState({
    name: "Rakibul Islam",
    title: "Web Developer & Frontend Specialist",
    email: "rirakib03@gmail.com",
    location: "Pabna, Bangladesh",
    github: "https://github.com/Rakibul-Islam-1",
    linkedin: "https://linkedin.com/in/rakibul-islam",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[var(--theme-color)]" /> Dashboard Settings
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Manage your account credentials, portfolio metadata, and preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-6">
        <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <User className="w-4 h-4 text-[var(--theme-color)]" /> Profile Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Professional Tagline
            </label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Notification Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold text-xs border border-zinc-700/50 hover:border-[var(--theme-color)] transition shadow-md"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
