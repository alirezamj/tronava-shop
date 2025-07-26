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
    try{
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).render('404', { message: ' Product not found'});
        }

        res.render('shop/product-details', { product });
    }catch (err) {
        console.error('Product details error:', err);
        res.status(500).render('500', { message: 'Server error'});

    }
}