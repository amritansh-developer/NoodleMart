// models/productModel.js
const db = require("../config/db");

const Product = {
  getAll: (callback) => {
    db.query("SELECT * FROM products", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM products WHERE id=?", [id], callback);
  },

  create: (data, callback) => {
    const { name, price, image, description } = data;
    db.query(
      "INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)",
      [name, price, image, description],
      callback
    );
  },

  update: (id, data, callback) => {
    const { name, price, image, description } = data;
    db.query(
      "UPDATE products SET name=?, price=?, image=?, description=? WHERE id=?",
      [name, price, image, description, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM products WHERE id=?", [id], callback);
  },
};

module.exports = Product;
