import { manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { DeletedOrError, TypeOrError } from '@utils/types/action';
import type { ClassModelType } from '@utils/types/models/class';
import type { UserModelType } from '@utils/types/models/user';
import type { CreateClasseData } from './types';

export const getClassById = async (classID: string): TypeOrError<ClassModelType> => {
    try {
        const response = await api.get("/classes/" + classID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getClassUsersById = async (classID: string): TypeOrError<UserModelType[]> => {
    try {
        const response = await api.get("/classes/" + classID + "/users");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getSpaceClassesById = async (spaceID: string): TypeOrError<ClassModelType[]> => {
    try {
        const response = await api.get("/classes/space/" + spaceID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createClasse = async (data: CreateClasseData): TypeOrError<ClassModelType> => {
    try {
        const response = await api.post("/classes/create", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateClasseById = async (classID: string, data: Partial<CreateClasseData>): TypeOrError<ClassModelType> => {
    try {
        const response = await api.patch("/classes/update/" + classID, data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteClasseById = async (classID: string): DeletedOrError => {
    try {
        const response = await api.delete("/classes/delete/" + classID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};