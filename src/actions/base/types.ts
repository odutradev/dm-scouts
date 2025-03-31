export interface CreateBaseData {
    description?: string; 
    leaderID?: string;
    name: string;
    branch: "wolfcub" | "scout" | "senior" | "pioneer" | "all";
    number?: string;
    group?: string;
    type: "fixed" | "mobile" | "secret" | "special"; 
    local: string; 
};