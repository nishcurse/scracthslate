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

export type SharedBoard = {
    id: string;
    title: string;
    role: "editor" | "viewer";
    owner: {
        id: string;
        name: string;
        picture: string | null;
    };
};