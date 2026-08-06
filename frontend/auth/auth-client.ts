import { api } from "@/lib/api";
import {User} from "@/types/user"

interface LoginResponse {
    access_token: string;
}

class AuthClient {
    async loginWithGoogle(code : string) : Promise<LoginResponse> {
            const response = await api.post("/auth/google" , {
                code 
            } )
          
            return response.data;
    }

    async getCurrentUser() : Promise<User> {
        const response = await api.get("/auth/me")
        return response.data;
    }
}

export const authClient = new AuthClient();