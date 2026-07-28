"use client";

import React, { useEffect, useState } from "react";
import { DashboardData } from "./_components/types";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardStatsGrid from "./_components/DashboardStatsGrid";
import LiveVisitorWidget from "./_components/LiveVisitorWidget";
import DashboardProjectsList from "./_components/DashboardProjectsList";
import RecentInquiriesWidget from "./_components/RecentInquiriesWidget";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/dashboard/stats", {
        next: { revalidate: 30 },
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <DashboardHeader
        isLoading={isLoading}
        onRefresh={fetchDashboardData}
      />

      {/* Overview Stats Grid */}
      <DashboardStatsGrid
        data={data}
        isLoading={isLoading}
      />

      {/* Real-time Live Visitor Stream */}
      <LiveVisitorWidget
        visitors={data?.recentVisitors || []}
        isLoading={isLoading}
      />

      {/* Main Grid: Projects List (2 Cols) & Recent Inquiries (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <DashboardProjectsList
          projects={data?.recentProjects || []}
          isLoading={isLoading}
        />

        <RecentInquiriesWidget
          messages={data?.recentMessages || []}
          unreadCount={data?.unreadMessagesCount || 0}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
