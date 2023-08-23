export type CreateUserDTO = {
    email: string;
    password: string;
    passwordConfirm: string;
    userName: string;
    dateOfBirth: Date;
    phoneNumber: number;
    secretAsk: string;
    secretAns: string;
    avatar: string;
    device?: string;
};

export type SignInUserDTO = {
    email: string;
    password: string;
    device?: string;
};

export interface UpdateUserDTO extends CreateUserDTO {
    newPassword?: string;
    confirmNewPassword?: string;
}

export type FilterIngredientsDTO = {
    isDeleted?: boolean;
    includeDeleted?: boolean;
};
