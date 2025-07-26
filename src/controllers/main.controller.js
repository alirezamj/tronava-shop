export const showHome = (req, res) => {
    const registered = req.query.registered === 'true';
    res.render('home', { title: 'Welcome to Tronava shop',
        registered
    });
};
