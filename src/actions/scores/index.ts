import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import type { DeletedOrError, TypeOrError } from '@utils/types/action';
import type { ScoreModelType } from '@utils/types/models/score';
import type { CreateScoreData } from './types';

export const getScoreById = async (scoreID: string): TypeOrError<ScoreModelType> => {
    try {
        const response = await api.get("/scores/" + scoreID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getUserScores = async (userID: string): TypeOrError<ScoreModelType[]> => {
    try {
        const response = await api.get("/scores/user/" + userID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getBaseScores = async (userID: string): TypeOrError<ScoreModelType[]> => {
    try {
        const response = await api.get("/scores/base/" + userID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getTeamScores = async (userID: string): TypeOrError<ScoreModelType[]> => {
    try {
        const response = await api.get("/scores/team/" + userID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const createScore = async (data: CreateScoreData): TypeOrError<ScoreModelType> => {
    try {
        const response = await api.post("/scores/create", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateScoreById = async (scoreID: string, data: Partial<ScoreModelType>): TypeOrError<ScoreModelType> => {
    try {
        hasAdminPosition();
        const response = await api.patch("/scores/" + scoreID + "/update", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const deleteScoreById = async (scoreID: string): DeletedOrError => {
    try {
        hasAdminPosition();
        const response = await api.delete("/scores/" + scoreID + "/delete");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};