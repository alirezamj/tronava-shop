import { body, validationResult } from "express-validator";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


export const validateProfile = [
    body('name').trim().notEmpty().withMessage('نام الزامی است'),
    body('email').isEmail().withMessage('ایمیل معتبر نیست'),
    body('password').trim().notEmpty().withMessage('no password'),
]


export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('کاربر یافت نشد');

    const { username, email } = req.body;

    if (username && username.trim() !== '') {
      user.username = username;
    }

    if (email && email.trim() !== '') {
      user.email = email;
    }


    await user.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.error('خطا در ویرایش اطلاعات:', err.message);
    res.status(500).send('خطای سرور');
  }
};



export const renderEditForm = (req, res) => {
    console.log('user data:', req.username);
    res.render('user/edit-Profile', { user: req.user});
};


export const changePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = req.user;


  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).send('همه ی فیلد ها الزامی است');
  }

  if ( newPassword !== confirmPassword) {
    return res.status(400).send('رمز جدید و تکرار ان یکسان نیستند');
  }


  try{
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch){
      return res.status(401).send('رمز فعلی اشتباه است');
    }

    user.passwordHash = newPassword;
    await user.save();
    return res.redirect('/dashboard').send('رمز با موفقیت تغییر کرد');
  }catch (err) {
    console.error(err);
    res.status(500).send('خطا در تغییر رمز');
  }
}