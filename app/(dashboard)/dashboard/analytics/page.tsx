"use client";

import React, { useEffect, useState } from "react";
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

      {/* Real-time Visitor Logs Table with Server-Side Pagination */}
      <VisitorLogsTable
        logs={logs}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
