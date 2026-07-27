"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Message, TabType } from "./_components/types";
import MessagesHeader from "./_components/MessagesHeader";
import MessagesSidebar from "./_components/MessagesSidebar";
import MessageDetailView from "./_components/MessageDetailView";

export default function DashboardMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("ALL");

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 8,
  });

  const fetchMessages = async (pageNumber: number = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/messages?page=${pageNumber}&limit=8`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
          if (data.pagination) setPagination(data.pagination);
          if (data.messages.length > 0 && !selectedId) {
            setSelectedId(data.messages[0].id);
          }
        } else {
          setMessages(Array.isArray(data) ? data : []);
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
    fetchMessages(page);
  }, [page]);

  const updateMessageStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSelectMessage = (msg: Message) => {
    setSelectedId(msg.id);
    if (msg.status === "Unread") {
      updateMessageStatus(msg.id, "Read");
    }
  };

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

  const handleMarkReplied = async (id: string) => {
    await updateMessageStatus(id, "Replied");
    toast.success("Marked message as Replied");
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

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === "UNREAD") return m.status === "Unread";
    if (activeTab === "READ") return m.status === "Read";
    if (activeTab === "REPLIED") return m.status === "Replied";
    return true;
  });

  const selectedMessage = messages.find((m) => m.id === selectedId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Unread":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "Replied":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default:
        return "bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <MessagesHeader
        isLoading={isLoading}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Sidebar */}
        <MessagesSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredMessages={filteredMessages}
          selectedId={selectedId}
          isLoading={isLoading}
          onSelectMessage={handleSelectMessage}
          formatTimeAgo={formatTimeAgo}
          getStatusBadge={getStatusBadge}
          pagination={pagination}
          onPageChange={(newPage) => setPage(newPage)}
        />

        {/* Right Detail Panel */}
        <MessageDetailView
          selectedMessage={selectedMessage}
          formatTimeAgo={formatTimeAgo}
          getStatusBadge={getStatusBadge}
          onMarkReplied={handleMarkReplied}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
