export interface ScoreModelType {
    _id: string;
    baseLeader: {
        id: string;
        name: string;
    };
    score: number;
    extraScore: number;
    extraScoreReason?: string;
    teamLeader: {
        id: string;
        name: string;
    };
    base: {
        id: string;
        name: string;
    };
    team: {
        id: string;
        name: string;
    };
    branch: "wolfcub" | "scout" | "senior" | "pioneer" | "all";
    local: string;
    createAt: Date;
    lastUpdate?: Date;
    observations?: string;
    inputIn?: Date;
    outputIn?: Date;
    images?: {
        profile?: string;
    };
    teamLeaderConfirm: boolean;
    type: "fixed" | "mobile" | "secret" | "special";
}
