const knex = require('../db/db');

// registerController logic
const findUserByUsername = async (username) => {
  const user = await knex('users').where({ username }).first();
  return user;
};

const createUser = async (username, hashedPassword, trx) => {
  const [id] = await trx('users')
    .insert({ username: username, password: hashedPassword })
    .returning('id');
  return typeof id === 'object' ? id.id : id;
};

const assignRoleToUser = async (userId, roleId, trx) => {
  await trx('user_roles').insert({ user_id: userId, role_id: roleId });
};

// authController logic
const getUserRoles = async (userId) => {
  const roles = await knex('user_roles')
    .select('role_id')
    .where({ user_id: userId });
  return roles.map((row) => row.role_id);
};

const assignRefreshTokenToUser = async (userId, refreshToken) => {
  await knex('users')
    .where({ id: userId })
    .update({ refresh_token: refreshToken });
};

// refreshController & logoutController logic
const findUserByRefreshToken = async (refreshToken) => {
  const user = knex('users').where({ refresh_token: refreshToken }).first();
  return user;
};

// logoutController logic
const deleteRefreshToken = async (userId) => {
  await knex('users').where({ id: userId }).update({ refresh_token: null });
};

module.exports = {
  findUserByUsername,
  createUser,
  assignRoleToUser,
  getUserRoles,
  assignRefreshTokenToUser,
  findUserByRefreshToken,
  deleteRefreshToken,
};
