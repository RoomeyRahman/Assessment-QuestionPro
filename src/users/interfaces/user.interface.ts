export interface IUser {
    readonly id: number;
    readonly email: string;
    readonly password: string;
    readonly isActive: boolean;
    readonly isDeleted: boolean;
}
