import jwt from 'jsonwebtoken';
import User from '../models/user.model';


//This checks for a valid token, verifies it,
//  and attaches the user to req

export const protect = async (req, res, next) => {
    //This grabs the Authorization header from
    //  the incoming request.
    const authHeader = req.headers.authorization;

    if( authHeader && authHeader.startsWith('Bearer ')){
        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-passwordHash');
            next();
        } catch (error){
            return res.status(401).json({ message: 'Not authorized, token failed'});

        }
     } else {
            res.status(401).json({ message: 'Not authorized, no token'});
        }
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: admins Only'});
    }
};