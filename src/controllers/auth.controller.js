import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists || !(await userExists.matchPassword(password))) {
        return res.status(401).render('login' , {
            error: 'User not registered or password did not matched',
            email
        });
    };

 

    //💡 This will trigger the pre('save') hook in your model,
    //  automatically hashing the password before saving.



    //This uses your generateToken.js utility and 
    // the JWT_SECRET from .env.

    const token = generateToken(userExists._id);
    console.log(userExists._id);
    // res.json({ token, User });

    res.cookie('token', token, {
        httpOnly: true,          //Prevents access via Js on client
        secure: process.env.NODE_ENV === 'production', //Enforce HTTPS in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
  
 res.redirect('/');
    /*
 You can also control which user fields to include
 (e.g., omit passwordHash)


 res.status(201).json({
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  }
 });


    */
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
    // console.log('User saved:', user);

    const token = generateToken(user._id);

    //Temporary success response
    res.redirect('/?registered=true');
  } catch (err) {
    console.error('Register error:' , err);
    res.status(500).render('register', {
        error: 'Server error.please try again later.',
        username,
        email
    });
  }
};

