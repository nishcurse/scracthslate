export interface Board {
    id: string;
    title: string;
    updated_at: string,
}

export type BoardMember = {
  board_id: string;
  user_id: string;
  role: "editor" | "viewer";
  name: string;
  email: string;
  picture: string | null;
};