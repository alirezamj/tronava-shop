import express from 'express';
import { ensureAuthenticate } from '../middleware/authDMiddleware.js';
import { 
    updateProfile,
    renderEditForm,
    changePassword
 } from '../controllers/userControllers.js';

const router = express.Router();


router.get('/', ensureAuthenticate, (req, res) => {
    res.render('user/dashboard', {
        user: req.user,
    });
});

router.get('/edit', ensureAuthenticate, renderEditForm);

router.post('/edit', ensureAuthenticate, updateProfile);

router.get('/change-password' , ensureAuthenticate,  (req, res) => {
    res.render('user/change-password', {
        user: req.user,
    });
});

router.post('/change-password', ensureAuthenticate, changePassword );


export default router;