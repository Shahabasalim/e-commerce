const productModel = require('../model/product');
const cart=require('../model/cart')

module.exports = {
    productdetailsget: async (req, res) => {
        try {
            const productId = req.query.productid.replace(/'/g, '');
            const product = await productModel.findOne({ _id: productId });
            const userId=req.session.userId;
            const Cart=await cart.findOne({userId}).populate({path:"products.productId",model:"product"})
            // console.log(product);
            res.render('user/productdetail', { product: product,Cart });
        } catch (error) {
            console.error('Error fetching product details:', error);
            res.status(500).send('Internal Server Error');
        }
    }
};
