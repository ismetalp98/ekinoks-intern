require('dotenv').config();

class Config {
    APP_SECRET = process.env.APP_SECRET || '238745623hsdf';
    APP_PORT = process.env.PORT || 8000;
    PG_USER_NAME = process.env.PG_USER_NAME || 'postgres';
    PG_USER_PSS = process.env.PG_USER_PSS || 'alp123';
    PG_DB_NAME = process.env.PG_DB_NAME || 'postgres';
    PG_DB_PORT = parseInt(process.env.PG_DB_PORT as string, 10) || 5432;
    PG_HOST = process.env.PG_HOST || 'localhost';
    DATABASE_URL = process.env.DATABASE_URL || `postgres://${this.PG_USER_NAME}:${this.PG_USER_PSS}@localhost:${this.PG_DB_PORT}/${this.PG_DB_NAME}`;
};

const config = new Config();
export default config;
