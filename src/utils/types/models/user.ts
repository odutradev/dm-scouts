export interface UserModelType {
    _id?: string;
    id: string;
    order?: number;
    name: string;
    role: "normal" | "admin" | "leadership";
    status: "loggedIn" | "registered" | "blocked";
    createAt?: Date;
    lastUpdate?: Date;
    group?: string;
    firstSignup?: Date;
    lastGetUser?: Date;
    description?: string;
    password?: string;
    email?: string;
}
