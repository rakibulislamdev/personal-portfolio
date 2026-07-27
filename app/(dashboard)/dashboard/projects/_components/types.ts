export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  altText?: string;
  description?: string;
  year?: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies?: string;
  keyFeatures?: string;
}
