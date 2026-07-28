"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Briefcase, GraduationCap, GripVertical } from "lucide-react";
import { ProfileSettingsData, ExperienceItem, EducationItem } from "./types";

interface ExperienceEducationSectionProps {
  profile: ProfileSettingsData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileSettingsData>>;
}

export default function ExperienceEducationSection({
  profile,
  setProfile,
}: ExperienceEducationSectionProps) {
  // Parse experience items
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    try {
      if (profile.experiences) {
        return JSON.parse(profile.experiences);
      }
    } catch (e) {}
    return [
      { id: "1", year: "2023 - 2024", title: "Fiverr (Marketplace)", role: "Junior Web Developer" },
      { id: "2", year: "2023 - Present", title: "Programming Hero", role: "Web Development Learner" },
    ];
  });

  // Parse education items
  const [educations, setEducations] = useState<EducationItem[]>(() => {
    try {
      if (profile.educations) {
        return JSON.parse(profile.educations);
      }
    } catch (e) {}
    return [
      { id: "1", year: "2021 - 2025", title: "Diploma in Computer Science & Technology", institution: "Pabna Polytechnic Institute, Pabna" },
    ];
  });

  // Sync back to parent profile state
  useEffect(() => {
    setProfile((prev) => ({
      ...prev,
      experiences: JSON.stringify(experiences),
      educations: JSON.stringify(educations),
    }));
  }, [experiences, educations, setProfile]);

  // Experience handlers
  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: Date.now().toString(),
      year: "2024 - Present",
      title: "Company / Platform",
      role: "Position / Role",
    };
    setExperiences((prev) => [...prev, newItem]);
  };

  const handleUpdateExperience = (id: string, field: keyof ExperienceItem, value: string) => {
    setExperiences((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  // Education handlers
  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: Date.now().toString(),
      year: "2021 - 2025",
      title: "Degree / Course",
      institution: "Institution / University",
    };
    setEducations((prev) => [...prev, newItem]);
  };

  const handleUpdateEducation = (id: string, field: keyof EducationItem, value: string) => {
    setEducations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteEducation = (id: string) => {
    setEducations((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-10">
      {/* Experience Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Work Experience
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Manage your work history displayed on the About page
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddExperience}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-zinc-900 dark:bg-[#2e2e2e] text-white hover:bg-zinc-800 dark:hover:bg-[#383838] transition shadow-sm border border-zinc-700/50"
          >
            <Plus className="w-4 h-4 text-[var(--theme-color)]" /> Add Experience
          </button>
        </div>

        <div className="space-y-4">
          {experiences.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--text-muted)] rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
              No experience items added yet. Click &quot;Add Experience&quot; to create one.
            </div>
          ) : (
            experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1a] border border-zinc-200/90 dark:border-zinc-800/80 space-y-4 shadow-sm relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--theme-color)] uppercase tracking-wider flex items-center gap-1.5">
                    <GripVertical className="w-4 h-4 text-zinc-400" />
                    Experience #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteExperience(exp.id)}
                    className="text-red-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-500/10 transition"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Year / Duration
                    </label>
                    <input
                      type="text"
                      value={exp.year}
                      onChange={(e) =>
                        handleUpdateExperience(exp.id, "year", e.target.value)
                      }
                      placeholder="e.g. 2023 - 2024"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#242424] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) =>
                        handleUpdateExperience(exp.id, "title", e.target.value)
                      }
                      placeholder="e.g. Fiverr (Marketplace)"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#242424] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Role / Position
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) =>
                        handleUpdateExperience(exp.id, "role", e.target.value)
                      }
                      placeholder="e.g. Junior Web Developer"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#242424] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Education Credentials
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Manage your education background displayed on the About page
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddEducation}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-zinc-900 dark:bg-[#2e2e2e] text-white hover:bg-zinc-800 dark:hover:bg-[#383838] transition shadow-sm border border-zinc-700/50"
          >
            <Plus className="w-4 h-4 text-[var(--theme-color)]" /> Add Education
          </button>
        </div>

        <div className="space-y-4">
          {educations.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--text-muted)] rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
              No education items added yet. Click &quot;Add Education&quot; to create one.
            </div>
          ) : (
            educations.map((edu, index) => (
              <div
                key={edu.id}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1a] border border-zinc-200/90 dark:border-zinc-800/80 space-y-4 shadow-sm relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--theme-color)] uppercase tracking-wider flex items-center gap-1.5">
                    <GripVertical className="w-4 h-4 text-zinc-400" />
                    Education #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteEducation(edu.id)}
                    className="text-red-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-500/10 transition"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Year / Period
                    </label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) =>
                        handleUpdateEducation(edu.id, "year", e.target.value)
                      }
                      placeholder="e.g. 2021 - 2025"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#242424] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Degree / Qualification
                    </label>
                    <input
                      type="text"
                      value={edu.title}
                      onChange={(e) =>
                        handleUpdateEducation(edu.id, "title", e.target.value)
                      }
                      placeholder="e.g. Diploma in Computer Science & Technology"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#242424] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Institution / Location
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleUpdateEducation(
                          edu.id,
                          "institution",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Pabna Polytechnic Institute, Pabna"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-[#242424] border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:border-[var(--theme-color)] transition"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
