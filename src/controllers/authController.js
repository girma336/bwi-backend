const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { cloudinary } = require('./../utils/cloudinary')


const signToken = (id) => {
  const token = jwt.sign({ id }, 'new-girma-secret-role-based', {
    expiresIn: '90d',
  });
  return token;
};


exports.signup = async (req, res) => {
  console.log(req.body)
  try {

    const { email, phone, password, name } = req.body;

    let profile_image = '';
    if (req.file) {
      profile_image = await cloudinary.uploader.upload(req.file.path);
    }
    if (!email && !phone) {
      return res.status(400).json({ message: 'Please provide at least one of email or phone number.' });
    }
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email or Phone Number already exists' });
    }

    const newUser = await UserModel.create({ email, phone, password, profile_image: profile_image.secure_url, name });

    return res.status(201).json({
      message: 'User registered successfully',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    const user = await UserModel.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Incorrect email/phone or password' });
    }
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in.' });
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: 'fail', message: 'You are not logged in! Please log in to get access.' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await UserModel.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({ success: 'fail', message: 'The user belonging to this token does not exist.' });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ success: 'fail', message: 'Invalid token.' });
  }
};

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to get all user account.' });
    }

    next();
  }
}