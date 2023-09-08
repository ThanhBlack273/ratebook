export interface User {
    id: number;
    email: string;
    userName: string;
    avatar: string;
    device: string;
}

export interface IUpdateUserOutput {
    accessToken: string;
    user: {
        id: string;
        email: string;
        userName: string;
        dateOfBirth: string;
        phoneNumber: string;
        avatar: string;
    };
}

export interface IUpdateUserInput {
    email?: string;
    userName: string;
    phoneNumber: string;
    avatar: string;
    dateOfBirth: Date;
}
