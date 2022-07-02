exports.up = function (knex) {
    return knex.schema
        .createTable('user', function (table) {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('owner_name');
            table.string('email').notNullable();
            table.string('phone').notNullable();
            table.string('address').notNullable();
            table.string('password').notNullable();
            table.integer('pin_code');
            table.string('role').notNullable();
        }
            .createTable('food', function (table) {
                table.increments('id');
                table.string('name').notNullable();
                table.string('details').notNullable();
                table.integer('price').notNullable();
                table.integer('vendor_id').notNullable();
                table.primary(['id', 'vendor_id']);
                table.foreign('vendor_id').references('user.id');
            })
        );
};

exports.down = function (knex) {
    return knex.schema.dropTable('food')
        .dropTable('user');
};
