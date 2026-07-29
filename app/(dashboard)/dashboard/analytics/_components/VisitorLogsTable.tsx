"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { VisitorLog } from "./types";

interface VisitorLogsTableProps {
  logs: VisitorLog[];
  loading: boolean;
  pagination?: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  onPageChange?: (page: number) => void;
  selectedLogIds: string[];
  setSelectedLogIds: React.Dispatch<React.SetStateAction<string[]>>;
  onDelete: (id: string) => void;
}

export default function VisitorLogsTable({
  logs,
  loading,
  pagination,
  onPageChange,
  selectedLogIds,
  setSelectedLogIds,
  onDelete,
}: VisitorLogsTableProps) {
  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalCount = pagination?.totalCount || 0;

  const isAllSelected = logs.length > 0 && selectedLogIds.length === logs.length;

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          Real-time Visitor Logs
        </h2>
        {totalCount > 0 && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Total {totalCount} logs recorded
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 text-xs uppercase font-semibold">
              <th className="py-3 px-4 w-12">
                <button
                  type="button"
                  onClick={() => {
                    if (isAllSelected) {
                      setSelectedLogIds([]);
                    } else {
                      setSelectedLogIds(logs.map((l) => l.id));
                    }
                  }}
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-200 focus:outline-none ${isAllSelected
                      ? "bg-[var(--theme-color)] border-[var(--theme-color)] shadow-md shadow-[var(--theme-color)]/25"
                      : "bg-zinc-100 dark:bg-zinc-800/60 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
                    }`}
                >
                  {isAllSelected && (
                    <svg className="w-3.5 h-3.5 text-white fill-none stroke-current stroke-[3.5]" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              </th>
              <th className="py-3 px-4">Visitor IP</th>
              <th className="py-3 px-4">Country & City</th>
              <th className="py-3 px-4">Page Visited</th>
              <th className="py-3 px-4">Device / Browser</th>
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {loading ? (
              [1, 2, 3, 4].map((n) => (
                <tr key={n}>
                  <td colSpan={7} className="py-4 px-4">
                    <div className="h-6 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" />
                  </td>
                </tr>
              ))
            ) : logs.length > 0 ? (
              logs.map((log) => {
                const isSelected = selectedLogIds.includes(log.id);
                return (
                  <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
                    <td className="py-4 px-4 w-12">
                      <button
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedLogIds((prev) => prev.filter((id) => id !== log.id));
                          } else {
                            setSelectedLogIds((prev) => [...prev, log.id]);
                          }
                        }}
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center cursor-pointer transition-all duration-200 focus:outline-none ${isSelected
                            ? "bg-[var(--theme-color)] border-[var(--theme-color)] shadow-md shadow-[var(--theme-color)]/25"
                            : "bg-zinc-100 dark:bg-zinc-800/60 border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600"
                          }`}
                      >
                        {isSelected && (
                          <svg className="w-3.5 h-3.5 text-white fill-none stroke-current stroke-[3.5]" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                      </button>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs font-bold text-[var(--theme-color)]">
                      {log.ip}
                    </td>
                    <td className="py-4 px-4 font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                      <span className="text-[11px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
                        {log.flag && log.flag.length === 2 && /^[A-Za-z]{2}$/.test(log.flag)
                          ? log.flag.toUpperCase()
                          : "BD"}
                      </span>
                      <img
                        src={`https://flagcdn.com/24x18/${log.flag && log.flag.length === 2 && /^[A-Za-z]{2}$/.test(log.flag)
                            ? log.flag.toLowerCase()
                            : log.country?.toLowerCase().includes("bangladesh")
                              ? "bd"
                              : log.country?.toLowerCase().includes("united states")
                                ? "us"
                                : log.country?.toLowerCase().includes("united kingdom")
                                  ? "gb"
                                  : "bd"
                          }.png`}
                        alt={log.country || "Flag"}
                        className="w-5 h-3.5 object-cover rounded-xs shadow-xs"
                      />
                      <span>{log.country}</span>
                      <span className="text-xs text-zinc-400 font-normal">({log.city})</span>
                    </td>
                    <td className="py-4 px-4 text-xs font-mono text-zinc-600 dark:text-zinc-300">
                      {log.page}
                    </td>
                    <td className="py-4 px-4 text-xs text-zinc-500 dark:text-zinc-400">
                      {log.device}
                    </td>
                    <td className="py-4 px-4 text-xs text-zinc-400">
                      {log.timestamp}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onDelete(log.id)}
                        className="p-2 bg-red-650/10 hover:bg-red-650/20 text-red-500 rounded-xl transition cursor-pointer"
                        title="Delete log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-xs text-zinc-500">
                  No visitor logs available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Server-Side Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/60 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
