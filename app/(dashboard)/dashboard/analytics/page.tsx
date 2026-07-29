"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { VisitorLog, TopCountry } from "./_components/types";
import AnalyticsHeader from "./_components/AnalyticsHeader";
import AnalyticsOverviewCards from "./_components/AnalyticsOverviewCards";
import VisitorLogsTable from "./_components/VisitorLogsTable";

export default function DashboardAnalyticsPage() {
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [activeLive, setActiveLive] = useState<number>(1);
  const [topCountry, setTopCountry] = useState<TopCountry | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  // Multi-select & Deletion State
  const [selectedLogIds, setSelectedLogIds] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAnalytics = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?page=${pageNumber}&limit=10`);
      const data = await res.json();
      setLogs(data.logs || []);
      setActiveLive(data.activeLive || (data.logs ? data.logs.length : 1));
      setTopCountry(data.topCountry || null);
      if (data.pagination) {
        setPagination(data.pagination);
      }
      // Reset selection when loading new page data
      setSelectedLogIds([]);
    } catch (e) {
      console.error("Failed to fetch analytics data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteLogs = async () => {
    if (selectedLogIds.length === 0) return;
    setIsDeleting(true);
    try {
      const res = await fetch("/api/analytics", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedLogIds }),
      });

      if (res.ok) {
        toast.success(`Successfully deleted ${selectedLogIds.length} visitor logs`);
        setSelectedLogIds([]);
        setShowConfirm(false);
        fetchAnalytics(page);
      } else {
        toast.error("Failed to delete selected logs");
      }
    } catch (error) {
      console.error("Error deleting logs:", error);
      toast.error("Error deleting selected logs");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSingleDeleteTrigger = (id: string) => {
    setSelectedLogIds([id]);
    setShowConfirm(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <AnalyticsHeader
        loading={loading}
        onRefresh={() => fetchAnalytics(page)}
      />

      {/* Analytics Overview Cards */}
      <AnalyticsOverviewCards
        activeLive={activeLive}
        topCountry={topCountry}
        loading={loading}
      />

      {/* Bulk Delete Options Bar */}
      {selectedLogIds.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-red-950/20 border border-red-900/30 rounded-2xl animate-in slide-in-from-top-2 duration-205 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-red-400">
              {selectedLogIds.length} visitor logs selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedLogIds([])}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Deselect All
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="px-3 py-1.5 bg-red-650 hover:bg-red-650/90 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Real-time Visitor Logs Table */}
      <VisitorLogsTable
        logs={logs}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        selectedLogIds={selectedLogIds}
        setSelectedLogIds={setSelectedLogIds}
        onDelete={handleSingleDeleteTrigger}
      />

      {/* Bulk Delete Confirmation Dialog Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-sm font-bold text-white">
                {selectedLogIds.length === 1 ? "Delete Visitor Log" : "Delete Selected Logs"}
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                {selectedLogIds.length === 1
                  ? "Are you sure you want to delete this visitor log? This action is permanent and cannot be undone."
                  : `Are you sure you want to delete these ${selectedLogIds.length} visitor logs? This action is permanent and cannot be undone.`}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedLogIds([]);
                }}
                className="py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition cursor-pointer"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteLogs}
                className="py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
