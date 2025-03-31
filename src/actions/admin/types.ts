import type { SpaceModelType } from "@utils/types/models/space";

export interface CreateUserData {
    name: string;
    id: string;
    space?: {
        name: string;
        role: string;
        id: string;
    };
};

export interface CreateSpaceData {
    description?: string;
    ownerID: string;
    name: string;
};

export interface UpdateSpaceModuleData {
    data: Partial<SpaceModelType>;
    module: string;
};