import express from 'express';
import { 
    getAllProducts,
    renderNewForm,
    createProduct,
    renderEditForm,
    deleteProduct,
    updateProduct,
 } from '../controllers/admin.product.controller.js';
import { adminProtect } from '../middleware/adminProtect.js';




const router = express.Router();


router.get('/admin/products', adminProtect, getAllProducts);                            //Read
router.get('/admin/products/new', adminProtect, renderNewForm);                       //Create(form)
router.post('/admin/products', adminProtect, createProduct);                         //Create
router.get('/admin/products/:id/edit', adminProtect, renderEditForm);                //Update(form)
router.post('/admin/products/:id', adminProtect, updateProduct);                   //Update
router.post('/admin/products/:id/delete', adminProtect, deleteProduct);           //Delete


export default router;
