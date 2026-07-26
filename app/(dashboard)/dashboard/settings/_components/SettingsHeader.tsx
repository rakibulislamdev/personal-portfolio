"use client";

import React from "react";
import { Settings, Loader2 } from "lucide-react";

interface SettingsHeaderProps {
  isLoading: boolean;
}

export default function SettingsHeader({ isLoading }: SettingsHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
        <Settings className="w-6 h-6 text-[var(--theme-color)]" /> Dashboard Settings
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[var(--theme-color)]" />}
      </h1>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
        Manage your account credentials, portfolio metadata, and preferences.
      </p>
    </div>
  );
}
