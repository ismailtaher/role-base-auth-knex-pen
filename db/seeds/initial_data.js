/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries in these tables
  await knex('role_permissions').del();
  await knex('permissions').del();
  await knex('roles').del();
  await knex('products').del();

  // insert products
  await knex('products').insert([
    { name: 'Tea', price: '200.00' },
    { name: 'Coffee', price: '300.00' },
    { name: 'Soda', price: '100.00' },
  ]);

  // insert roles
  await knex('roles').insert([
    { id: 5150, name: 'Admin' },
    { id: 1984, name: 'Editor' },
    { id: 2001, name: 'User' },
  ]);

  // insert permissions
  await knex('permissions').insert([
    { name: 'GET' },
    { name: 'POST' },
    { name: 'PUT' },
    { name: 'DELETE' },
  ]);

  // insert role_permissions
  await knex('role_permissions').insert([
    { role_id: 5150, permission_id: 1 },
    { role_id: 5150, permission_id: 2 },
    { role_id: 5150, permission_id: 3 },
    { role_id: 5150, permission_id: 4 },
    { role_id: 1984, permission_id: 1 },
    { role_id: 1984, permission_id: 2 },
    { role_id: 1984, permission_id: 3 },
    { role_id: 2001, permission_id: 1 },
  ]);
};
