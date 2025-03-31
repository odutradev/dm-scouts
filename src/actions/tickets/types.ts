import type { TicketModelType } from "@utils/types/models/ticket";

export type CreateTicketData = Omit<TicketModelType, "_id" | "messages" | "status" | "userID" | "createAt" | "lastUpdate">;

export interface AddTicketData {
    spaceID?: string;
    content: string;
};