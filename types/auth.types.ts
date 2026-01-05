export interface CreateUserDTO {
    username: string;
    password: string;
    email: string;
    address_main?: string;
    address_dong?: string;
}

export interface UserWithoutPassword {
    user_id: number;
    username: string;
    email: string;
    temperature: number;
    address_main?: string;
    address_dong?: string;
}
export interface LoginDTO {
    id: string;
    password: string;
}
export interface AuthResponse {
    user: UserWithoutPassword;
    token: string;
}
export interface JWTPayload {
    id: string;
    type?: 'access' | 'password_reset';
}

export interface AuthRequest extends Request {
    user?: JWTPayload;
}

export interface PasswordResetRequest extends Request {
    user?: JWTPayload & { type: 'password_reset' };
}
