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
