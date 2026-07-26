"use client";

import React, { useEffect, useState } from "react";
import { Mail, Trash2, Reply, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function DashboardMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data: Message[] = await res.json();
        setMessages(data);
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const selectedMessage = messages.find((m) => m.id === selectedId);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/messages?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updated = messages.filter((m) => m.id !== id);
        setMessages(updated);
        if (selectedId === id) {
          setSelectedId(updated.length > 0 ? updated[0].id : null);
        }
        toast.success("Message deleted successfully");
      } else {
        toast.error("Failed to delete message");
      }
    } catch (err) {
      toast.error("Error deleting message");
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours}h ago`;
      return `${Math.floor(diffInHours / 24)}d ago`;
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-[var(--theme-color)]" /> Client Messages
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[var(--theme-color)]" />}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          View and reply to inquiries sent via your website contact form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Message List */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-5 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-20 bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedId === msg.id
                    ? "bg-zinc-100 dark:bg-zinc-800 border-[var(--theme-color)]"
                    : "bg-zinc-50 dark:bg-[#1a1a1a] border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                    {msg.name}
                  </h4>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {formatTimeAgo(msg.createdAt)}
                  </span>
                </div>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate mt-1">
                  {msg.subject}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {msg.message}
                </p>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-zinc-500">No client messages found.</div>
          )}
        </div>

        {/* Right Message Preview Detail */}
        <div className="lg:col-span-2 bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-md space-y-6">
          {selectedMessage ? (
            <>
              <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {selectedMessage.subject}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    From: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{selectedMessage.name}</span> ({selectedMessage.email})
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-rose-500 hover:bg-rose-500/10 transition"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] text-white text-xs font-bold transition border border-zinc-700/50 hover:border-[var(--theme-color)]"
                  >
                    <Reply className="w-4 h-4" /> Reply
                  </a>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-[#1a1a1a] p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80">
                <p className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-zinc-400">Select a message to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}
