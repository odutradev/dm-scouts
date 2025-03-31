export interface YieldingType {
    value: number;
    addeAt?: Date;
};

export interface LogType {
    description: string;
    date: Date;
};

export interface WalletModelType {
    name?: string;
    createdAt?: Date;
    lastUpdate?: Date;
    userID: string;
    spaceID: string;
    investmentID: string;
    availableValue: number;
    yielding: YieldingType[];
    logs: LogType[];
    _id: string;
};

//bonfire-api version: 1.3.9