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
      <div>
        <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <Globe className="w-4 h-4 text-[var(--theme-color)]" /> Social Links & Portfolio Metadata
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Facebook */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Facebook URL
          </label>
          <input
            type="url"
            value={profile.facebook || ""}
            onChange={(e) => setProfile({ ...profile, facebook: e.target.value })}
            placeholder="https://facebook.com/username"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Contact Page</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, facebookInContact: !(profile.facebookInContact ?? true) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.facebookInContact ?? true) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.facebookInContact ?? true) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Home & About</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, facebookInProfilesCard: !(profile.facebookInProfilesCard ?? false) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.facebookInProfilesCard ?? false) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.facebookInProfilesCard ?? false) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* GitHub */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            GitHub URL
          </label>
          <input
            type="url"
            value={profile.github}
            onChange={(e) => setProfile({ ...profile, github: e.target.value })}
            placeholder="https://github.com/username"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Contact Page</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, githubInContact: !(profile.githubInContact ?? true) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.githubInContact ?? true) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.githubInContact ?? true) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Home & About</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, githubInProfilesCard: !(profile.githubInProfilesCard ?? true) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.githubInProfilesCard ?? true) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.githubInProfilesCard ?? true) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={profile.linkedin}
            onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Contact Page</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, linkedinInContact: !(profile.linkedinInContact ?? true) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.linkedinInContact ?? true) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.linkedinInContact ?? true) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Home & About</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, linkedinInProfilesCard: !(profile.linkedinInProfilesCard ?? true) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.linkedinInProfilesCard ?? true) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.linkedinInProfilesCard ?? true) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Twitter */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Twitter URL
          </label>
          <input
            type="url"
            value={profile.twitter || ""}
            onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
            placeholder="https://twitter.com/username"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Contact Page</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, twitterInContact: !(profile.twitterInContact ?? true) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.twitterInContact ?? true) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.twitterInContact ?? true) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Home & About</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, twitterInProfilesCard: !(profile.twitterInProfilesCard ?? false) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.twitterInProfilesCard ?? false) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.twitterInProfilesCard ?? false) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Instagram */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            Instagram URL
          </label>
          <input
            type="url"
            value={profile.instagram}
            onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
            placeholder="https://instagram.com/username"
            className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
          />
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Contact Page</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, instagramInContact: !(profile.instagramInContact ?? true) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.instagramInContact ?? true) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.instagramInContact ?? true) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-[#1a1a1a]/50 p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
              <span>Show on Home & About</span>
              <button
                type="button"
                onClick={() => setProfile({ ...profile, instagramInProfilesCard: !(profile.instagramInProfilesCard ?? false) })}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  (profile.instagramInProfilesCard ?? false) ? "bg-[var(--theme-color)]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    (profile.instagramInProfilesCard ?? false) ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Analytics Tracking Controls */}
      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
        <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          SEO, Google Analytics & Meta Pixel Integration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Google Analytics Tracking ID (GA4)
            </label>
            <input
              type="text"
              value={profile.googleAnalyticsId || ""}
              onChange={(e) => setProfile({ ...profile, googleAnalyticsId: e.target.value })}
              placeholder="e.g. G-XXXXXXXXXX"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
            />
            <span className="text-[11px] text-zinc-400 block mt-1">
              Enter your Google Tag Manager or GA4 Measurement ID
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
              Meta (Facebook) Pixel ID
            </label>
            <input
              type="text"
              value={profile.metaPixelId || ""}
              onChange={(e) => setProfile({ ...profile, metaPixelId: e.target.value })}
              placeholder="e.g. 123456789012345"
              className="w-full px-4 py-3 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
            />
            <span className="text-[11px] text-zinc-400 block mt-1">
              Enter your Facebook Pixel Pixel ID for ad conversion tracking
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
