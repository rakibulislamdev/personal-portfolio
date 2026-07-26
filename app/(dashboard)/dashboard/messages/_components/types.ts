export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export type TabType = "ALL" | "UNREAD" | "READ" | "REPLIED";
