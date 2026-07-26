"use client";

import React from "react";
import { VisitorLog } from "./types";

interface VisitorLogsTableProps {
  logs: VisitorLog[];
  loading: boolean;
}

export default function VisitorLogsTable({
  logs,
  loading,
}: VisitorLogsTableProps) {
  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md">
      <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
        Real-time Visitor Logs
      </h2>
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
                    <span className="text-base">{log.flag}</span>
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
    </div>
  );
}
