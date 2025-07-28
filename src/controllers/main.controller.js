export const showHome = (req, res) => {
    const registered = req.query.registered === 'true';
    const user = req.user;       // ✅ Grab user from the request

    res.render('home', { title: 'Welcome to Tronava shop',
        registered,
        user
    });
};
