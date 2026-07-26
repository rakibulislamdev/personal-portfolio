export interface VisitorLog {
  id: string;
  ip: string;
  country: string;
  city: string;
  flag: string;
  page: string;
  device: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  category: string;
  image: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface DashboardData {
  totalProjects: number;
  totalVisitors: number;
  recentVisitors: VisitorLog[];
  recentProjects: Project[];
  recentMessages: Message[];
  unreadMessagesCount: number;
}
