const productModel = require('../model/product');

module.exports = {
    productdetailsget: async (req, res) => {
        try {
            const productId = req.query.productid.replace(/'/g, '');
            const product = await productModel.findOne({ _id: productId });
            res.render('user/productdetail', { product: product });
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};
