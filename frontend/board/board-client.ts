import { api } from "@/lib/api";

import { Board , BoardMember , SharedBoard } from "@/types/boardTypes";

class BoardClient {
    async getBoards(): Promise<Board[]> {
        const response = await api.get("/boards");

        return response.data;
    }

    async createBoard(
        title = "Untitled Board",
    ): Promise<Board> {
        const response = await api.post(
            "/boards",
            {
                title,
            },
        );

        return response.data;
    }

    async renameBoard(
        boardId: string,
        title: string,
    ): Promise<Board> {
        const response = await api.patch(
            `/boards/${boardId}`,
            {
                title,
            },
        );

        return response.data;
    }

    async deleteBoard(
        boardId: string,
    ): Promise<void> {
        await api.delete(`/boards/${boardId}`);
    }
    async getMembers(
        boardId: string,
    ): Promise<BoardMember[]> {
        const response = await api.get(
            `/boards/${boardId}/members`,
        );

        return response.data;
    }

    async addMember(
        boardId: string,
        email: string,
        role: "editor" | "viewer" = "editor",
    ): Promise<BoardMember> {
        const response = await api.post(
            `/boards/${boardId}/members`,
            {
                email,
                role,
            },
        );

        return response.data;
    }

    async getBoard(board_id : string): Promise<Board> {
        const resp = await api.get(`/boards/${board_id}`); 
        return resp.data;
    }

    async getSharedBoards(): Promise<SharedBoard[]> {
    const response = await api.get("/boards/shared");

    return response.data;
}
}

export const boardClient = new BoardClient();