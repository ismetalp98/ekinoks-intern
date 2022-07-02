require('dotenv').config();

class Config {
    APP_SECRET = process.env.APP_SECRET;
    APP_PORT = process.env.APP_PORT || 8000;
    PG_USER_NAME = process.env.PG_USER_NAME;
    PG_USER_PSS = process.env.PG_USER_PSS;
    PG_DB_NAME = process.env.PG_DB_NAME;
    PG_DB_PORT = parseInt(process.env.PG_DB_PORT as string, 10) || 5432;
    PG_HOST = process.env.PG_HOST;
    DATABASE_URL = process.env.DATABASE_URL || `postgres://${this.PG_USER_NAME}:${this.PG_USER_PSS}@localhost:${this.PG_DB_PORT}/${this.PG_DB_NAME}`;
};

const config = new Config();
export default config;
