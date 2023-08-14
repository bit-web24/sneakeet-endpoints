const Product = require('../models/Product');

const displayAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.render('products', { products });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const displayCreateProductForm = async (req, res) => {
  try {
    res.render('new-product');
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, brand, price, description, category, sizes, colors, imgs, availability } = req.body;

    // Convert the availability field to a boolean
    const isAvailable = availability === 'on';

    // Split colors and sizes strings into arrays and trim whitespace
    const colorArray = colors.split(',').map(color => color.trim());
    const sizeArray = sizes.split(',').map(size => size.trim());

    const newProduct = new Product({
      name,
      brand,
      price,
      description,
      category,
      sizes: sizeArray,
      colors: colorArray,
      imgs,
      availability: isAvailable,
    });

    await newProduct.save();
    res.redirect('/admin/products');
  } catch (error) {
    res.status(500).json({ error });
  }
};

const displayProduct = async (req, res) => {
  try {
    const productId = req.params._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.render('product-details', { product });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const displayEditProductForm = async (req, res) => {
  try {
    const productId = req.params._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.render('edit-product', { product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.description = req.body.description;
    product.category = req.body.category;

    const colorArray = req.body.colors.split(',').map(color => color.trim());
    const sizeArray = req.body.sizes.split(',').map(size => size.trim());
    product.sizes = sizeArray;
    product.colors = colorArray;

    product.imgs = req.body.imgs;

    const isAvailable = req.body.availability === 'on';
    product.availability = isAvailable;

    product.updatedAt = Date.now();

    await product.save();

    res.redirect('/admin/products');
  } catch (error) {
    res.status(500).json({ error });
  }
};

const displayDeleteProductForm = async (req, res) => {
  try {
    const productId = req.params._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.render('delete-product', { product });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params._id;

    await Product.findByIdAndDelete(productId);

    res.redirect('/admin/products');
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  displayAllProducts,
  displayCreateProductForm,
  createProduct,
  displayProduct,
  displayEditProductForm,
  updateProduct,
  displayDeleteProductForm,
  deleteProduct,
};
