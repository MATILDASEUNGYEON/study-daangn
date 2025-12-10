export interface CreateUserDTO{
    id: string;
    password: string;
    email: string;
    address_main ?: string;
    address_dong ?: string;
}
export type UserWithoutPassword = Omit<CreateUserDTO, 'password'>;
export interface LoginDTO{
    id: string;
    password: string;
}
export interface AuthResponse {
	user: UserWithoutPassword;
	token: string;
}
export interface JWTPayload {
	id: string;
	type?: "access" | "password_reset"; // 토큰 타입
}

export interface AuthRequest extends Request {
	user?: JWTPayload;
}

export interface PasswordResetRequest extends Request {
	user?: JWTPayload & { type: "password_reset" };
}
