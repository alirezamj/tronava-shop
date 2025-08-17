import User from "../models/user.model.js";



export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
try {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).render('login', {
      error: 'User not registered or password did not match',
      email
    });
  }

  // 🔐 مقداردهی session با Passport
  req.login(user, (err) => {
    if (err) return next(err);


    if (user.role === 'admin') {
      return res.redirect('/admin/products');
    } else {
    return res.redirect('/');
    }
  });

  } catch (err) {
  console.error('Login error:', err);
  next(err);
  }
};  

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).render('register' , {
            error: 'Email is already registered',
            username,
            email
        });
    }

 try {
      const user = await User.create({ username, email, passwordHash: password});
        //automatic login with passport
      req.login(user, (err) => {
      if (err) {
        console.error('Login after register failed:', err);
        return next(err);
      }

        // const token = generateToken(user._id);

        //Temporary success response
        res.redirect('/?registered=true');
    });
  } catch (err) {
    console.error('Register error:' , err);
    res.status(500).render('register', {
        error: 'Server error.please try again later.',
        username,
        email
    });
  }
};


export const logOut = async (req, res) => {
      req.logout((err) => {
        if (err) return next(err);
        //if cookies used for JWT, you can delete that
        res.clearCookie('token');
        res.redirect('/');
    });
}