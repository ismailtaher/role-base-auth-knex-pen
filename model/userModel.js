const knex = require('../db/db');
const pool = require('../config/db');

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
  const result = await pool.query(
    'SELECT role_id FROM user_roles WHERE user_id = $1',
    [userId]
  );
  return result.rows.map((row) => row.role_id);
};

const assignRefreshTokenToUser = async (userId, refreshToken) => {
  await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [
    refreshToken,
    userId,
  ]);
};

// refreshController & logoutController logic
const findUserByRefreshToken = async (refreshToken) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE refresh_token = $1',
    [refreshToken]
  );
  return result.rows[0];
};

// logoutController logic
const deleteRefreshToken = async (userId) => {
  await pool.query('UPDATE users SET refresh_token = NULL WHERE id = $1', [
    userId,
  ]);
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
