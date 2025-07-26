import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';





export const adminProtect = async (req , res, next) => {
    try{
       const token = req.cookies.token;

       if(!token) {
        return res.redirect('/login');
       }

       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       console.log('Decoded JWT ID:', decoded.id);
       const user = await User.findById(decoded.id);
       console.log('Loaded use:', user);

       if (!user || user.role !== 'admin') {
        return res.status(403).send('Access denied: Admins only');
       }

       req.user = user;     // optional: pass user info to downstream handlers
       next();
    }catch (err) {
      console.error('Admin auth error:', err);
      res.status(401).redirect('/logic');
    }
};