export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  views: number;
  status: string; // "Published" | "Draft"
  content: string | null;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
}
