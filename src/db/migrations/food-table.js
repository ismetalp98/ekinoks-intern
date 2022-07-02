exports.up = function (knex) {
    return knex.schema.createTable('food', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('details').notNullable();
        table.integer('price').notNullable();
        table.integer('vendor_id').notNullable();
        table.primary(['id', 'vendor_id']);
        table.foreign('vendor_id').references('user.id');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('food');
};
