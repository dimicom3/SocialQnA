export interface AuthLoginDto {
    email: string;
    password: string; 
}

export interface AuthRegisterDto {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}