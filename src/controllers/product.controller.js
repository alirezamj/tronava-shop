import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const showProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.render('products', {title: 'All Products', products});
    }catch (err) {
            console.error('❌ Error loading products:', err);
    res.status(500).send('Something went wrong');

    }
};


export const getProductDetails = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).render('404', { message: ' Invalid product ID'});
    }
    try{
        console.log("Looking for product with ID:", id);
         const product = await Product.findById(id);

        if(!product) {
            return res.status(404).render('404', { message: ' Product not found'});
        }

        res.render('shop/product-details', { product });
    }catch (err) {
        console.error('Product details error:', err);
        res.status(500).render('500', { message: 'Server error'});

    }
}