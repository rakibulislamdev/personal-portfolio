"use client";

import React, { useEffect, useState } from "react";
import {
  ALL_SKILLS,
  SkillConfig,
} from "@/app/(dashboard)/dashboard/settings/_components/ServicesSkillsSection";

const SkillBadge = ({ skill }: { skill: SkillConfig }) => {
  const { label, Icon, color } = skill;
  return (
    <span className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap select-none bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700/50 text-zinc-700 dark:text-zinc-300">
      <Icon style={{ color, flexShrink: 0 }} aria-hidden="true" className="text-[10px] sm:text-sm" />
      {label}
    </span>
  );
};

const MarqueeRow = ({
  skills,
  direction,
}: {
  skills: SkillConfig[];
  direction: "left" | "right";
}) => {
  if (!skills || skills.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div
        className={`flex gap-2.5 w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {/* Original */}
        {skills.map((skill, i) => (
          <SkillBadge key={`a-${skill.id}-${i}`} skill={skill} />
        ))}
        {/* Duplicate for seamless loop */}
        <span aria-hidden="true" className="contents">
          {skills.map((skill, i) => (
            <SkillBadge key={`b-${skill.id}-${i}`} skill={skill} />
          ))}
        </span>
      </div>
    </div>
  );
};

export default function MarqueeSkills({ rawEnabledSkills }: { rawEnabledSkills?: string }) {
  const parseSkills = (rawStr?: string | null): SkillConfig[] => {
    if (!rawStr || rawStr.trim() === "") return [];
    try {
      let activeIds: any = rawStr;
      if (typeof activeIds === "string") {
        try {
          activeIds = JSON.parse(activeIds);
        } catch {
          activeIds = rawStr.split(",").map((s) => s.trim());
        }
      }
      // Unwrap double stringified JSON if present
      if (typeof activeIds === "string") {
        try {
          activeIds = JSON.parse(activeIds);
        } catch {}
      }
      if (Array.isArray(activeIds)) {
        return ALL_SKILLS.filter((s) => activeIds.includes(s.id));
      }
    } catch {
      // Fallback
    }
    return [];
  };

  const [enabledSkills, setEnabledSkills] = useState<SkillConfig[]>(() =>
    parseSkills(rawEnabledSkills)
  );

  useEffect(() => {
    const fetchFresh = async () => {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data?.enabledSkills !== undefined && data?.enabledSkills !== null) {
            setEnabledSkills(parseSkills(data.enabledSkills));
          }
        }
      } catch {
        // Fallback
      }
    };
    fetchFresh();
  }, [rawEnabledSkills]);

  if (!enabledSkills || enabledSkills.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[100px] text-xs font-semibold text-zinc-400">
        No skills selected in Dashboard Settings.
      </div>
    );
  }

  const row1Skills = enabledSkills.filter((_, idx) => idx % 2 === 0);
  const row2Skills = enabledSkills.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="flex flex-col gap-2.5 mb-5 mt-6">
      <div className="px-14">
        <MarqueeRow
          skills={row1Skills.length > 0 ? row1Skills : enabledSkills}
          direction="left"
        />
      </div>
      {row2Skills.length > 0 && (
        <div className="px-24">
          <MarqueeRow skills={row2Skills} direction="right" />
        </div>
      )}
    </div>
  );
}
