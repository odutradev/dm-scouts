import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { DeletedOrError, TypeOrError } from '@utils/types/action';
import type { BaseModelType } from '@utils/types/models/base';
import type { CreateBaseData } from './types';

export const getBaseById = async (baseID: string): TypeOrError<BaseModelType> => {
    try {
        const response = await api.get("/bases/" + baseID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getUserBases = async (userID: string): TypeOrError<BaseModelType[]> => {
    try {
        const response = await api.get("/bases/user/" + userID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAllBases = async (): TypeOrError<BaseModelType[]> => {
    try {
        const response = await api.get("/bases/");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createBase = async (data: CreateBaseData): TypeOrError<BaseModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/bases/create", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateBaseById = async (baseID: string, data: Partial<BaseModelType>): TypeOrError<BaseModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch("/bases/" + baseID + "/update", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteBaseById = async (baseID: string): DeletedOrError => {
    try {
        hasAdminPosition();
        const response = await api.delete("/bases/" + baseID + "/delete");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};