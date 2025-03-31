export interface InvestmentModelType {
    type: "CDB" | "CDI" | "poupanca";
    yieldFrequency: "diario" | "semanal" | "mensal";
    riskLevel: "baixo" | "moderado" | "alto";
    spaceID: string;
    ownerID: string;
    maxInvestment?: number;
    minInvestment: number;
    attachments: string[];
    interestRate: number;
    isRecurring: boolean;
    penaltyRate: number;
    description: string;
    createdAt?: Date;
    lastUpdate?: Date;
    duration: number;
    name: string;
    _id: string;
};

//bonfire-api version: 1.3.9