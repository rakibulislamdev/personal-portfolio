"use client";

import React from "react";
import { Mail, Trash2, Reply, CheckCircle2 } from "lucide-react";
import { Message } from "./types";

interface MessageDetailViewProps {
  selectedMessage: Message | undefined;
  formatTimeAgo: (dateStr: string) => string;
  getStatusBadge: (status: string) => string;
  onMarkReplied: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MessageDetailView({
  selectedMessage,
  formatTimeAgo,
  getStatusBadge,
  onMarkReplied,
  onDelete,
}: MessageDetailViewProps) {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-6">
      {selectedMessage ? (
        <>
          {/* Message Details Header */}
          <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {selectedMessage.subject}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                    selectedMessage.status
                  )}`}
                >
                  {selectedMessage.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                From: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedMessage.name}</span> ({selectedMessage.email})
              </p>
              <span className="text-[11px] text-zinc-400 block mt-0.5">
                Received {formatTimeAgo(selectedMessage.createdAt)} ({new Date(selectedMessage.createdAt).toLocaleString()})
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {selectedMessage.status !== "Replied" && (
                <button
                  onClick={() => onMarkReplied(selectedMessage.id)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 text-xs font-bold transition border border-emerald-500/20"
                  title="Mark as Replied"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mark Replied
                </button>
              )}
              <button
                onClick={() => onDelete(selectedMessage.id)}
                className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-rose-500 hover:bg-rose-500/10 transition border border-transparent hover:border-rose-500/20"
                title="Delete Message"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                onClick={() => onMarkReplied(selectedMessage.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] text-white text-xs font-bold transition border border-zinc-700/50 hover:border-[var(--theme-color)]"
              >
                <Reply className="w-4 h-4" /> Reply via Email
              </a>
            </div>
          </div>

          {/* Message Body Content */}
          <div className="bg-zinc-50 dark:bg-[#1a1a1a] p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Inquiry Message:
            </h3>
            <p className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed">
              {selectedMessage.message}
            </p>
          </div>
        </>
      ) : (
        <div className="py-20 text-center text-zinc-400 space-y-2">
          <Mail className="w-10 h-10 mx-auto text-zinc-300 dark:text-zinc-700" />
          <p className="text-sm font-medium">Select a message from the list to view full details</p>
        </div>
      )}
    </div>
  );
}
