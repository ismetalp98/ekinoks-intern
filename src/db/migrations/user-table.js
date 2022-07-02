exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('owner_name');
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('address').notNullable();
        table.string('password').notNullable();
        table.integer('pin_code');
        table.string('role').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};
