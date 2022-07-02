import KnexDB from '../db/knex';

export default class BaseRepository {
    knx: typeof KnexDB;

    constructor() {
        this.knx = KnexDB;
    };
};
