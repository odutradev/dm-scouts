export interface CreateUserData {
    role: "normal" | "leadership"
    name: string;
    group: string;
    id: string;
};

export interface ConfigData {
    _id?: string;
    lastUpdate: Date;
    status: "active" | "inactive";
    maintenanceMode: boolean;
    allowTeamRegistration: boolean;
    allowBaseRegistration: boolean;
    allowScoreApplication: boolean;
    mode: "GJE" | "JDC";
    initialScore: number;
}