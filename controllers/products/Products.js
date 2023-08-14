const Product = require('../../models/Product');

const Products = {
    listProducts: async (req, res) => {
        const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
        const perPage = 10; // Number of products per page
        const skip = (page - 1) * perPage;

        try {
            const totalProducts = await Product.countDocuments(); // Get the total number of products
            const products = await Product.find().skip(skip).limit(perPage); // Fetch products for the requested page

            const totalPages = Math.ceil(totalProducts / perPage);

            res.json({
                products,
                currentPage: page,
                totalPages,
            });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    getProductById: async (req, res) => {
        const productId = req.params.product_id;
        try {
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            } else {
                return res.status(200).json({ product });
            }
        } catch (error) {
            res.status(500).json({ error });
        }
    },
};

module.exports = Products; 