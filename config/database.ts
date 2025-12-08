
import {Pool} from "pg";
import {config} from "../config";

export const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
});
pool.on("connect", () => {
    console.log("Database connected successfully");
});
pool.on("error", (err: Error) => {
    console.error("Unexpected database error:", err);
    process.exit(-1);
});