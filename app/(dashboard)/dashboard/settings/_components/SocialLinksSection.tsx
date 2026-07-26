"use client";

import React from "react";
import { Globe } from "lucide-react";
import { ProfileSettingsData } from "./types";

interface SocialLinksSectionProps {
  profile: ProfileSettingsData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileSettingsData>>;
}

export default function SocialLinksSection({
  profile,
  setProfile,
}: SocialLinksSectionProps) {
  return (
    <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
      <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <Globe className="w-4 h-4 text-[var(--theme-color)]" /> Social Links & Portfolio Metadata
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            value={profile.github}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
            placeholder="https://github.com/username"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={profile.linkedin}
            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>
      </div>
    </div>
  );
}
