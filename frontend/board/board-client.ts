import { api } from "@/lib/api";

import { Board } from "@/types/boardTypes";

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
}

export const boardClient = new BoardClient();