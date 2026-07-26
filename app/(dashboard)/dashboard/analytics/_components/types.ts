export interface VisitorLog {
  id: string;
  ip: string;
  country: string;
  city: string;
  flag: string;
  page: string;
  timestamp: string;
  device: string;
}

export interface TopCountry {
  name: string;
  flag: string;
  percentage: number;
}

export interface AnalyticsData {
  totalVisitors: number;
  activeLive: number;
  topCountry: TopCountry;
  logs: VisitorLog[];
}
