const knex = require('../db/db');

const getAllProducts = async () => {
  const products = await knex('products');
  return products;
};

const getProductById = async (id) => {
  const result = await knex('products').where({ id }).first();
  return result;
};

const createProduct = async (name, price) => {
  const result = await knex('products').insert({ name, price }).returning('*');
  return result;
};

const updateProduct = async (id, name, price) => {
  const result = await knex('products')
    .where({ id })
    .update({ name, price })
    .returning('*');
  return result;
};

const deleteProduct = async (id) => {
  await knex('products').where({ id }).delete();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
