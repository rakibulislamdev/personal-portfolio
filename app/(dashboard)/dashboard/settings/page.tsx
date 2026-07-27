"use client";

import React, { useEffect, useState } from "react";
import { Save, Loader2, User, Cpu, Globe } from "lucide-react";
import { toast } from "sonner";
import { ProfileSettingsData } from "./_components/types";
import SettingsHeader from "./_components/SettingsHeader";
import ProfileDetailsSection from "./_components/ProfileDetailsSection";
import SocialLinksSection from "./_components/SocialLinksSection";
import ServicesSkillsSection from "./_components/ServicesSkillsSection";

type SettingsTab = "profile" | "skills" | "social";

export default function DashboardSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [profile, setProfile] = useState<ProfileSettingsData>({
    name: "Rakibul Islam",
    title: "Web Developer & Frontend Specialist",
    email: "rirakib03@gmail.com",
    phone: "+8801621-574994",
    location: "Dhaka, Bangladesh",
    github: "https://github.com/Rakibul-Islam-1",
    linkedin: "https://linkedin.com/in/rakibul-islam",
    instagram: "https://instagram.com",
    profileImage: "/assets/Images/rakibulislam.jpg",
    aboutImage: "/assets/Images/rakibulislam.jpg",
    resumeUrl: "",
    typewriterText: "Web Developer based in Bangladesh",
    aboutBio:
      "I am a Dhaka, Bangladesh-based web developer with a focus on web development. I have a diverse range of experience having worked on various web applications.",
    experienceMonths: 6,
    clientsWorldwide: 25,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
      toast.error("Failed to fetch settings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (res.ok) {
        toast.success("Settings saved successfully to database!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to save settings");
      }
    } catch (err) {
      toast.error("Error saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <SettingsHeader isLoading={isLoading} />

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "profile"
              ? "bg-zinc-900 text-white dark:bg-[#2a2a2a] dark:text-white shadow border border-zinc-800 dark:border-zinc-700"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
          }`}
        >
          <User className="w-4 h-4 text-[var(--theme-color)]" /> Profile Details
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "skills"
              ? "bg-zinc-900 text-white dark:bg-[#2a2a2a] dark:text-white shadow border border-zinc-800 dark:border-zinc-700"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
          }`}
        >
          <Cpu className="w-4 h-4 text-[var(--theme-color)]" /> Services & Skills
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === "social"
              ? "bg-zinc-900 text-white dark:bg-[#2a2a2a] dark:text-white shadow border border-zinc-800 dark:border-zinc-700"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
          }`}
        >
          <Globe className="w-4 h-4 text-[var(--theme-color)]" /> Social Links & SEO
        </button>
      </div>

      {/* Settings Form Container */}
      <form
        onSubmit={handleSave}
        className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-6"
      >
        {/* Tab Content */}
        {activeTab === "profile" && (
          <ProfileDetailsSection profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "skills" && (
          <ServicesSkillsSection profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "social" && (
          <SocialLinksSection profile={profile} setProfile={setProfile} />
        )}

        {/* Submit Action */}
        <div className="pt-4 flex justify-end border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold text-xs border border-zinc-700/50 hover:border-[var(--theme-color)] transition shadow-md disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
