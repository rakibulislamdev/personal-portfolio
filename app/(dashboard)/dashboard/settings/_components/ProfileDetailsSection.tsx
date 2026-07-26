"use client";

import React from "react";
import { User } from "lucide-react";
import { ProfileSettingsData } from "./types";
import ImageDropzone from "./ImageDropzone";

interface ProfileDetailsSectionProps {
  profile: ProfileSettingsData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileSettingsData>>;
}

export default function ProfileDetailsSection({
  profile,
  setProfile,
}: ProfileDetailsSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <User className="w-4 h-4 text-[var(--theme-color)]" /> Profile & Contact Settings
      </h2>

      {/* Drag and Drop Image Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-zinc-50/70 dark:bg-[#181818]/70 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80">
        <ImageDropzone
          label="Homepage Profile Picture"
          value={profile.profileImage}
          onChange={(url) => setProfile({ ...profile, profileImage: url })}
          placeholder="/assets/Images/rakibulislam.jpg"
        />

        <ImageDropzone
          label="About Page Picture (Separate Image)"
          value={profile.aboutImage}
          onChange={(url) => setProfile({ ...profile, aboutImage: url })}
          placeholder="/assets/Images/rakibulislam.jpg"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Professional Tagline *
          </label>
          <input
            type="text"
            required
            value={profile.title}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Notification / Contact Email *
          </label>
          <input
            type="email"
            required
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Phone Number *
          </label>
          <input
            type="text"
            required
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            placeholder="+8801621-574994"
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

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Typewriter Sub-Bio Text (Homepage)
          </label>
          <input
            type="text"
            value={profile.typewriterText}
            onChange={(e) => setProfile({ ...profile, typewriterText: e.target.value })}
            placeholder="Web Developer based in Bangladesh"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Experience (Months)
          </label>
          <input
            type="number"
            value={profile.experienceMonths}
            onChange={(e) => setProfile({ ...profile, experienceMonths: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            Clients Worldwide
          </label>
          <input
            type="number"
            value={profile.clientsWorldwide}
            onChange={(e) => setProfile({ ...profile, clientsWorldwide: Number(e.target.value) })}
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
            About Page Self-Summary Bio
          </label>
          <textarea
            rows={3}
            value={profile.aboutBio}
            onChange={(e) => setProfile({ ...profile, aboutBio: e.target.value })}
            placeholder="Write full summary bio for your About page..."
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition resize-none"
          />
        </div>
      </div>
    </div>
  );
}
