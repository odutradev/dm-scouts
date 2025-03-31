import { manageActionError, hasAdminPosition } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { CreateSpaceData, CreateUserData, UpdateSpaceModuleData } from './types';
import type { DeletedOrError, TypeOrError } from '@utils/types/action';
import type { SpaceModelType } from '@utils/types/models/space';
import type { UserModelType } from '@utils/types/models/user';


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
        const response = await api.patch("/admin/users/update/" + userID , data);
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

export const createSpace = async (data: CreateSpaceData): TypeOrError<SpaceModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/admin/spaces/create", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteSpaceById = async (spaceID: string): TypeOrError<DeletedOrError> => {
    try {
        hasAdminPosition();
        const response = await api.delete("/admin/spaces/delete/" + spaceID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateSpaceById = async (data: Partial<SpaceModelType>): TypeOrError<SpaceModelType> => {
    try {
        hasAdminPosition();
        const spaceID = data._id || "none";
        const response = await api.patch("/admin/spaces/update/" + spaceID , data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAllSpaces = async (): TypeOrError<SpaceModelType[]> => {
    try {
        hasAdminPosition();
        const response = await api.get("/admin/spaces");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateSpaceModuleById = async ({ data, module="none" }: UpdateSpaceModuleData): TypeOrError<SpaceModelType> => {
    try {
        hasAdminPosition();
        const spaceID = data._id || "none";
        const response = await api.patch("/spaces/" + spaceID + "/modules/config/" + module , data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};