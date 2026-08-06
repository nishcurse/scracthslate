export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt?: string;
  status?: "draft" | "review" | "published";
  members?: number;
}

export interface DashboardUser {
  name: string;
  role: string;
  email: string;
  workspace: string;
}
