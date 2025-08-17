





export const adminProtect = async (req , res, next) => {

  //ایا کاربر لاگین کرده یا نه
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect('/login');
  }

  //بررسی نقش کاربر
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).send('Access denied: Admins only');
  }

  //عبور از این middleware
  next();
};


