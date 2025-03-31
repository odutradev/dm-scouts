import axios from "axios";

import useUserStore from "@stores/user";

export const manageActionError = (error: unknown, log?: boolean) => {
    if (log) console.log(error);
    if (axios.isAxiosError(error) && error.response) {
        return { error: error.response.data.message || 'Erro desconhecido' };
    }
    if (error instanceof Error) return { error: error.message };
    return { error: 'Erro na requisição' };
};

export const hasAdminPosition = (): void => {
    const token = localStorage.getItem("token");
    const { user } = useUserStore.getState();
    
    if (!token || !user || user.role != "admin"){
        throw new Error("Usuario não é um administrador");
    };

    return;
};