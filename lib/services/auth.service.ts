import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { pool } from '@/config/database';
import {
    CreateUserDTO,
    UserWithoutPassword,
    LoginDTO,
    AuthResponse,
} from '@/types/auth.types';
import { config } from '@/config';
import { encryptToken } from '@/utils/encryption';
const SALT_ROUNDS = 10;

export const createUser = async (
    userData: CreateUserDTO,
): Promise<UserWithoutPassword> => {
    const { username, password, email, address_main, address_dong } = userData;

    const idCheck = await pool.query(
        'SELECT username FROM users WHERE username = $1',
        [username],
    );
    if (idCheck.rows.length > 0) {
        throw new Error('이미 사용 중인 아이디입니다.');
    }

    const emailCheck = await pool.query(
        'SELECT username FROM users WHERE email = $1',
        [email],
    );
    if (emailCheck.rows.length > 0) {
        throw new Error('이미 가입된 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query(
        `INSERT INTO users (username, password, email, address_main, address_dong,temperature)
            VALUES ($1, $2, $3, $4, NOW(), 36.5)
            RETURNING user_id,username, email, address_main, address_dong, created_at, last_login`,
        [
            username,
            hashedPassword,
            email,
            address_main || null,
            address_dong || null,
        ],
    );

    return result.rows[0];
};

export const loginUser = async (loginData: LoginDTO): Promise<AuthResponse> => {
    const { id, password } = loginData;

    const result = await pool.query(
        `
    SELECT 
      user_id,
      username,
      password,
      email,
      address_main,
      address_dong
    FROM users
    WHERE username = $1
    `,
        [id],
    );

    if (result.rows.length === 0) {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
    }

    await pool.query(
        'UPDATE users SET last_login = NOW() WHERE username = $1',
        [user.username],
    );

    const signOptions: SignOptions = {
        expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
    };

    const jwtToken = jwt.sign(
        { user_id: user.user_id, username: user.username, type: 'access' },
        config.jwt.secret,
        signOptions,
    );

    const encryptedToken = encryptToken(jwtToken);

    return {
        user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            address_main: user.address_main,
            address_dong: user.address_dong,
            temperature: user.temperature,
        },
        token: encryptedToken,
    };
};

// export const getIdByUser = async (id: string): Promise<{ user_id: number } | null> => {
//     const result = await pool.query(`SELECT user_id from users WHERE username= $1`, [id]);
//     if (result.rows.length === 0) {
//         return null;
//     }
//     const user = result.rows[0];
//     return user;
// };

export const getIdByUser = async (username: string): Promise<number | null> => {
    const result = await pool.query(
        `SELECT user_id FROM users WHERE username = $1`,
        [username],
    );

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0].user_id;
};

export const getUsernameById = async (
    user_id: number,
): Promise<string | null> => {
    const result = await pool.query(
        `SELECT username from users WHERE user_id= $1`,
        [user_id],
    );
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    return user.username;
};

export const getUserInfo = async (
    user_id: number,
): Promise<UserWithoutPassword | null> => {
    const result = await pool.query(`SELECT * from users WHERE user_id=$1`, [
        user_id,
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
