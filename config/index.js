"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'daangn',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        encryptionKey: process.env.JWT_ENCRYPTION_KEY ||
            'your_32_character_encryption_key',
    },
    server: {
        port: parseInt(process.env.PORT || '3000'),
        env: process.env.NODE_ENV || 'development',
    },
};
