import { manageActionError } from '@utils/functions/action';
import { setAuthToken } from '@utils/functions/headers';
import useUserStore from '@stores/user/index.ts';
import api from '@utils/functions/api.ts';

import type{ UserModelType } from '@utils/types/models/user';
import type { TypeOrError } from '@utils/types/action';
import type { AuthData } from './types';

export const signIn = async (data: AuthData): TypeOrError<UserModelType> => {
    try {
        const response = await api.post("/users/auth/signin", data);
        setAuthToken(response.data?.token);
        return await getUser();
    } catch (error) {
        return manageActionError(error);
    }
};

export const signUp = async (data: AuthData): TypeOrError<UserModelType> => {
    try {
        const response = await api.post("/users/auth/signup", data);
        setAuthToken(response.data?.token);
        return await getUser();
    } catch (error) {
        return manageActionError(error);
    }
};

export const getUser = async (): TypeOrError<UserModelType> => {
    try {
        const response = await api.get("/users/auth/me");
        const user = response.data;
        if (user){
            const { setUser } = useUserStore.getState();
            setUser(user);
        };
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateProfile = async (data: Partial<UserModelType>): TypeOrError<UserModelType> => {
    try {
        const response = await api.patch("/users/profile/update", data);
        const user = response.data;
        if (user){
            const { setUser } = useUserStore.getState();
            setUser(user);
        };
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};