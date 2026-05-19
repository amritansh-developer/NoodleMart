const Product = require("../models/productModel");

// GET all products
exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

// GET product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;

  Product.getById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(results[0]);
  });
};

// CREATE product
exports.createProduct = (req, res) => {
  const { name, price, image, description } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  Product.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  });
};

// UPDATE product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  Product.update(id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  });
};

// DELETE product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  });
};
