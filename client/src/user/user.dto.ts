export interface UserDto {
    id?: string;
    email: string;
    username: string;
}

export interface UserUpdateDto {
    id: string;
    username?: string;
    password?: string;
}