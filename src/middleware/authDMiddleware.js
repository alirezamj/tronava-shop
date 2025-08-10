export const ensureAuthenticate = (req, res, next) => {
    if(req.user) {
        return next();
    }
    res.redirect('/login');
};