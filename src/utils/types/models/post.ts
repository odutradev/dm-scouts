export type PostScopeType = "all" | "space" | "class" | "role" | "administrators";
export type PostType = "default" | "report" | "warn";

export interface PostModelType {
    space: {
        id: string;
        name: string;
    };
    class: {
        id: string;
        name: string;
    };
    creator: {
        id: string;
        avatar: string;
        name: string;
    };
    role: {
        id: string;
        name: string;
    };
    createAt: Date;
    lastUpdate?: Date;
    content?: string;
    title?: string;
    attachments: string[];
    type: PostType;
    scope: PostScopeType;
};

//bonfire-api version: 1.3.9