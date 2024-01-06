import UniqueEntityID from "../../shared/domain/id";

export interface UserDto {
    id: string;
    username: string;
    email: Email;
    password: string;
    birthMonth: number;
    birthYear: number;
    birthDay: number;
    isEmailVerified?: boolean;
    isAdminUser?: boolean;
    isDeleted?: boolean;
};

export interface UserPrismaDto {
    username: string;
    email: Email;
    birthMonth: number;
    birthYear: number;
    birthDay: number;
    isEmailVerified?: boolean;
    isAdminUser?: boolean;
    isDeleted?: boolean;
};