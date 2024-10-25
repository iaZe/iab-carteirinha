import { api } from "./api";

export const login = async (username:string, password: string) => {
    try {
        const response = await api.post("/auth/login", { username, password });
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}