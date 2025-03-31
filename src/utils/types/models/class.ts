export interface ClassModelType {
    name: string;
    space: {
        id: string;
        name: string;
    };
    status: "active" | "inactive";
    createAt: Date;
    lastUpdate?: Date;
    description?: string;
    images?: {
        profile?: string;
    };
    metrics: {
        users: number;
    };
};

//bonfire-api version: 1.3.9