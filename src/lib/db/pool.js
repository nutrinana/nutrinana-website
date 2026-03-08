import { Pool } from "pg";

/**
 * PostgreSQL connection pool.
 *
 * Configured to use SSL in production environments.
 *
 * @util db
 *
 * @returns {Pool} The PostgreSQL connection pool.
 */
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
