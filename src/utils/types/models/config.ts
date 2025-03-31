export interface ConfigModelType {
    _id: string;
    lastUpdate: Date;
    status: "active" | "inactive";
    maintenanceMode: boolean;
    allowTeamRegistration: boolean;
    allowBaseRegistration: boolean;
    allowScoreApplication: boolean;
    mode: "GJE" | "JDC";
    initialScore: number;
}
