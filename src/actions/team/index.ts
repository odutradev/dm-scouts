import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { DeletedOrError, TypeOrError } from '@utils/types/action';
import type { TeamModelType } from '@utils/types/models/team';
import type { CreateTeamData } from './types';

export const getTeamById = async (teamID: string): TypeOrError<TeamModelType> => {
    try {
        const response = await api.get("/teams/" + teamID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};
export const getTeamByCode = async (code: string): TypeOrError<TeamModelType> => {
    try {
        const response = await api.get("/teams/code/" + code);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getUserTeams = async (userID: string): TypeOrError<TeamModelType[]> => {
    try {
        const response = await api.get("/teams/user/" + userID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getAllTeams = async (): TypeOrError<TeamModelType[]> => {
    try {
        const response = await api.get("/teams/");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createTeam = async (data: CreateTeamData): TypeOrError<TeamModelType> => {
    try {
        hasAdminPosition();
        const response = await api.post("/teams/create", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateTeamById = async (teamID: string, data: Partial<TeamModelType>): TypeOrError<TeamModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch("/teams/" + teamID + "/update", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteTeamById = async (teamID: string): DeletedOrError => {
    try {
        hasAdminPosition();
        const response = await api.delete("/teams/" + teamID + "/delete");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};