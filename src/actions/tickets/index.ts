import { hasAdminPosition, manageActionError } from '@utils/functions/action';
import api from '@utils/functions/api.ts';

import { TicketModelType } from '@utils/types/models/ticket';
import type { TypeOrError } from '@utils/types/action';
import type { AddTicketData, CreateTicketData } from './types';

export const createTicket = async (data: CreateTicketData): TypeOrError<TicketModelType> => {
    try {
        const response = await api.post("/tickets/create", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getUserTickets = async (): TypeOrError<TicketModelType[]> => {
    try {
        const response = await api.get("/tickets/user");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getTicketById = async (ticketID: string): TypeOrError<TicketModelType> => {
    try {
        const response = await api.get("/tickets/" + ticketID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const addTicketMessage = async (ticketID: string, data: AddTicketData): TypeOrError<TicketModelType> => {
    try {
        const response = await api.patch("/tickets/" + ticketID + "/messages/add", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getSystemTickets = async (): TypeOrError<TicketModelType[]> => {
    try {
        hasAdminPosition();
        const response = await api.get("/tickets/system");
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const getSpaceTickets = async (spaceID: string): TypeOrError<TicketModelType[]> => {
    try {
        const response = await api.get("/tickets/space/" + spaceID);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};

export const updateTicket = async (ticketID: string, data: Partial<TicketModelType>): TypeOrError<TicketModelType> => {
    try {
        const response = await api.patch("/tickets/" + ticketID + "/update", data);
        return response.data;
    } catch (error) {
        return manageActionError(error);
    }
};