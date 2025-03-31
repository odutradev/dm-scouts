export interface TeamModelType {
    name: string;
    group: number;
    leader: {
        id: string;
        name: string;
    };
    status: "active" | "inactive";
    branch: "wolfcub" | "scout" | "senior" | "pioneer";
    local: string;
    createAt: Date;
    lastUpdate?: Date;
    description?: string;
    images?: {
        profile?: string;
    };
}
