const knex = require('../db/db');

const verifyPermissions = () => {
  return async (req, res, next) => {
    try {
      const roles = req.roles;
      const method = req.method.toUpperCase();

      if (!Array.isArray(roles) || roles.length === 0) {
        return res.sendStatus(403); // No roles means no access
      }

      const permission = await knex('role_permissions AS rp')
        .distinct('p.name as permission')
        .join('permissions as p', 'rp.permission_id', 'p.id')
        .whereIn('rp.role_id', roles);

      const permArray = permission.map((perm) => perm.permission);

      console.log(`User: ${req.user} Method: ${method}`);
      console.log(`User permissions:`, permArray);

      if (!permArray.includes(method)) {
        return res.sendStatus(403); // Forbidden
      }

      next();
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  };
};

module.exports = verifyPermissions;
