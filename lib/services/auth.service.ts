
import bcrypt from 'bcrypt';
import jwt, {SignOptions} from "jsonwebtoken";
import { pool } from '@/config/database';
import { CreateUserDTO,UserWithoutPassword,LoginDTO,AuthResponse} from '@/types/auth.types';
import { config } from '@/config';
import {encryptToken} from "@/utils/encryption";
const SALT_ROUNDS = 10;

export const createUser = async (userData: CreateUserDTO): Promise<UserWithoutPassword> => {
    const { id, password,email, address_main, address_dong} = userData;

    const idCheck = await pool.query("SELECT username FROM users WHERE username = $1", [id]);
    if (idCheck.rows.length > 0) {
        throw new Error("이미 사용 중인 아이디입니다.");
    }

    const emailCheck = await pool.query("SELECT username FROM users WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
        throw new Error("이미 가입된 이메일입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query(
        `INSERT INTO users (username, password, email, address_main, address_dong)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING username, email, address_main, address_dong, created_at, last_login`,
        [
            id,
            hashedPassword,
            email,
            address_main || null,
            address_dong || null
        ]
    );

    return result.rows[0];
};

export const loginUser = async( loginData: LoginDTO):Promise<AuthResponse>=>{
    const {id,password} = loginData;

    const result = await pool.query("SELECT * FROM users WHERE username = $1", [id]);
    if (result.rows.length === 0) {
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
    await pool.query("UPDATE users SET last_login = NOW() WHERE username = $1", [user.username]);

    const signOptions: SignOptions = {
        expiresIn: config.jwt.expiresIn as jwt.SignOptions["expiresIn"],
    };

    const jwtToken = jwt.sign({id: user.username, type: "access"}, config.jwt.secret, signOptions);

    const encryptedToken = encryptToken(jwtToken);

    const {password: _, ...userWithoutPassword} = user;

    // 프론트엔드에서 사용하는 필드명(id)으로 매핑
    return {
        user: {
            id: userWithoutPassword.username,
            email: userWithoutPassword.email,
            address_main: userWithoutPassword.address_main,
            address_dong: userWithoutPassword.address_dong,
        },
        token: encryptedToken,
    };

}

export const getIdByUser = async (id: string): Promise<{ user_id: number } | null> => {
    const result = await pool.query(`SELECT user_id from users WHERE username= $1`, [id]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    return user;
};