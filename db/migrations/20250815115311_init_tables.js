/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('refresh_token');
    })

    .createTable('roles', (table) => {
      table.integer('id').primary();
      table.string('name').unique().notNullable();
    })

    .createTable('permissions', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
    })

    .createTable('user_roles', (table) => {
      table
        .integer('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE');
      table.primary(['user_id', 'role_id']);
    })

    .createTable('role_permissions', (table) => {
      table
        .integer('role_id')
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE');
      table
        .integer('permission_id')
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE');
      table.primary(['role_id', 'permission_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('role_permissions')
    .dropTableIfExists('user_roles')
    .dropTableIfExists('permissions')
    .dropTableIfExists('roles')
    .dropTableIfExists('users');
};
