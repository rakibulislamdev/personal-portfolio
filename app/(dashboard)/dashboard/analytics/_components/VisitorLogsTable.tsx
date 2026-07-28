"use client";

import React from "react";
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
}

export default function VisitorLogsTable({
  logs,
  loading,
  pagination,
  onPageChange,
}: VisitorLogsTableProps) {
  const currentPage = pagination?.currentPage || 1;
  const totalPages = pagination?.totalPages || 1;
  const totalCount = pagination?.totalCount || 0;

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
              <th className="py-3 px-4">Visitor IP</th>
              <th className="py-3 px-4">Country & City</th>
              <th className="py-3 px-4">Page Visited</th>
              <th className="py-3 px-4">Device / Browser</th>
              <th className="py-3 px-4 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {loading ? (
              [1, 2, 3, 4].map((n) => (
                <tr key={n}>
                  <td colSpan={5} className="py-4 px-4">
                    <div className="h-6 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse" />
                  </td>
                </tr>
              ))
            ) : logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition">
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
                      src={`https://flagcdn.com/24x18/${
                        log.flag && log.flag.length === 2 && /^[A-Za-z]{2}$/.test(log.flag)
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
                  <td className="py-4 px-4 text-right text-xs text-zinc-400">
                    {log.timestamp}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-zinc-500">
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
