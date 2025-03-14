export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    provider: string;
    providerId: string | null;
    createdAt: Date;
    updatedAt: Date;
};
