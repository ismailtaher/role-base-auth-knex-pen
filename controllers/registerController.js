const bcrypt = require('bcrypt');
const knex = require('../db/db');
const {
  findUserByUsername,
  createUser,
  assignRoleToUser,
} = require('../model/userModel');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and Password are required!' });

  // check for duplicate usernames in database
  const duplicateUser = await findUserByUsername(user);
  if (duplicateUser) return res.sendStatus(409); // Conflict

  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // To create a user and assign it a role in user_roles table as well we need to use a Transaction

    // transaction
    await knex.transaction(async (trx) => {
      // Insert the new user in 'users' table
      const newUserId = await createUser(user, hashedPwd, trx);
      // Assign the new user a role of 2001 i.e. User in 'user_roles'
      await assignRoleToUser(newUserId, 2001, trx);
    });

    res
      .status(201)
      .json({ success: `New user ${user} created with User role!` });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
