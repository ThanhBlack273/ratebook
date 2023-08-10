export interface User {
    id: number;
    email: string;
    password: string;
    userName: string;
    dateOfBirth: Date;
    phoneNumber: number;
    secretAsk: string;
    secretAns: string;
    avatar: string;
    device?: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
