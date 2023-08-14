const express = require('express');
const router = express.Router();
const admin = require('../controllers/Admin');

// GET /admin/products - Display all products
router.get('/products', admin.displayAllProducts);

// GET /admin/products/new - Display the form to create a new product
router.get('/products/new', admin.displayCreateProductForm);

// POST /admin/products - Create a new product
router.post('/products', admin.createProduct);

// GET /admin/products/:id - Display a specific product
router.get('/products/:_id', admin.displayProduct);

// GET /admin/products/:id/edit - Display the form to edit a product
router.get('/products/:_id/edit', admin.displayEditProductForm);

// PUT /admin/products/:id - Update a specific product
router.put('/products/:_id', admin.updateProduct);

// GET /admin/products/:id/edit - Display the form to edit a product
router.get('/products/:_id/delete', admin.displayDeleteProductForm);

// DELETE /admin/products/:id - Delete a specific product
router.delete('/products/:_id', admin.deleteProduct);

module.exports = router;
