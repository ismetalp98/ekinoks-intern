import { Knex, knex } from 'knex';
import config from '../config';

export class KnexDB {
    constructor() {
        console.log('knex db init');
    };

    config: Knex.Config = {
        client: 'pg',
        connection: {
            host: config.PG_HOST,
            port: config.PG_DB_PORT,
            user: config.PG_USER_NAME,
            password: config.PG_USER_PSS,
            database: config.PG_DB_NAME
        },
        migrations: {
            directory: __dirname + '/migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: __dirname + '/seeds',
        },
    };

    db = knex(this.config);

    init() {
        return new Promise((resolve, reject) => {
            try {
                const result = JSON.stringify(this.db.migrate.latest());
                console.log('Migration completed' + result);
                // this.db.seed.run();
                resolve(true);
            } catch (error) {
                const rollback = JSON.stringify(this.db.migrate.rollback());
                console.log('Migration error' + error);
                console.log('Migration error' + rollback);
                reject(false);
            }
            resolve(true);
        });
    };
};

const knexdb = new KnexDB();
export default knexdb;