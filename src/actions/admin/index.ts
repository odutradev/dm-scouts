import { manageActionError, hasAdminPosition } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { DeletedOrError, TypeOrError } from '@utils/types/action';
import type { UserModelType } from '@utils/types/models/user';
import type { ConfigData, CreateUserData } from './types';
import useSystemStore from '@stores/system';


export const createUser = async (data: CreateUserData): TypeOrError<UserModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/admin/users/create", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAllUsers = async (): TypeOrError<UserModelType[]> => {
    try {
        hasAdminPosition();
        const response = await api.get("/admin/users");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateUserById = async (data: Partial<UserModelType>): TypeOrError<UserModelType> => {
    try {
        hasAdminPosition();
        const userID = data._id || "none";
        const response = await api.patch("/admin/users/" + userID + "/update" , data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};
export const updateUserPasswordById = async (userID: string, password: string): TypeOrError<UserModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch("/admin/users/" + userID + "/update/password" , { password });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getUserById = async (userID: string): TypeOrError<UserModelType> => {
    try {
        hasAdminPosition();
        const response = await api.get("/admin/users/" + userID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteUserById = async (userID: string): DeletedOrError => {
    try {
        hasAdminPosition();
        const response = await api.delete("/admin/users/delete/" + userID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateConfig = async (data: Partial<ConfigData>): TypeOrError<ConfigData> => {
    try {
        hasAdminPosition();
        const response = await api.patch("/admin/config/update", data);
        const { updateSystem } = useSystemStore.getState();
        updateSystem({ config: response.data });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getConfig = async (): TypeOrError<ConfigData> => {
    try {
        const response = await api.get("/users/config");
        const { updateSystem } = useSystemStore.getState();
        updateSystem({ config: response.data });
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};