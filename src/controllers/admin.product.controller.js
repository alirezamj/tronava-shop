import Product from "../models/product.model.js";






export const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.render('admin/products', {products})
}



export const createProduct = async (req , res) => {
    const {title, description, price, imageUrl, category} = req.body;
    await Product.create({title, description, price, imageUrl, category});
    const products = await Product.find({});
    res.render('admin/products', {products});
}


export const updateProduct = async (req, res) => {
    try{
        const {title, description, price, imageUrl } = req.body;
        const { id } = req.params;

        await Product.findByIdAndUpdate(id, {
            title,
            description,
            price,
            imageUrl
        }, {new: true});
        const products =  await Product.find({});


        if(!products) {
            return res.status(404).send('Product not found');
        }
        res.render('admin/products', {products});
    }catch(err) {
        console.error('Update product error:' , err);
        res.status(500).send('Server error');
    }
}


export const deleteProduct = async (req, res) => {
    try{
        // const { id } = req.params.id;
      await Product.findByIdAndDelete(req.params.id);
      const products = await Product.find({});
console.log('Trying to delete product with ID:', req.params.id);
        if(!products) {
            return res.status(404).send('Product not found');
        }
        res.render('admin/products', {products});

    }catch (err) {
        console.error('Delete product error:', err);
        res.status(500).send('Server error');
    }
}


export const renderNewForm = (req , res) => {
    res.render('admin/new');
};

export const renderEditForm = async (req , res) => {
    try{
        const products = await Product.findById(req.params.id);
        if (!products) {
            return res.status(404).send('Product not found');
        }
        res.render('admin/edit', { products });
    }catch (err) {
        console.error('Edit form error:', err);
        res.status(500).send('Server error');
    }
};