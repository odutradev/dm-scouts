export interface BaseModelType {
    name: string;
    number: number;
    branch: "wolfcub" | "scout" | "senior" | "pioneer" | "all";
    leader: {
        id: string;
        name: string;
    };
    local: string; 
    status: "active" | "inactive";
    createAt: Date;
    lastUpdate?: Date;
    description?: string;
    images?: {
        profile?: string;
    };
    type: "fixed" | "mobile" | "secret" | "special"; 
}
