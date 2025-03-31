export interface KeyModelType {
    _id: string;
    name: string;
    createAt?: Date;
    key?: string;
    lastUpdate?: Date;
    description?: string;
    keyType: "pix" | "favorite";
    slotType?: "normal" | "special";
    userID: string;
};

//bonfire-api version: 1.3.9