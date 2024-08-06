const User = require('../models/user.model');
const Token = require('../models/token.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const accessTokenSecret = process.env.SECRET_KEY || 'accessSecretKey';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refreshSecretKey';

// Generate access token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '1h' });
};

// Generate email verification token
const generateEmailVerificationToken = (userId) => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '1h' });
};

// Create transporter for email
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

// Send verification email
const sendVerificationEmail = async (user, token) => {
  const url = `http://localhost:5173/verify/${token}`; 
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verify your email',
    html: `<h1>Email Verification</h1><p>Click <a href="${url}">here</a> to verify your email.</p>`
  });
};

// Generate refresh token
const generateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
  const token = new Token({ userId, token: refreshToken });
  await token.save();
  return refreshToken;
};

// Signup user
exports.signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    const emailVerificationToken = generateEmailVerificationToken(user._id);
    await sendVerificationEmail(user, emailVerificationToken);

    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Verify email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: "Please verify your email before logging in" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Refresh token
exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Token is required' });

  const storedToken = await Token.findOne({ token });
  if (!storedToken) return res.status(403).json({ message: 'Invalid refresh token' });

  jwt.verify(token, refreshTokenSecret, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const accessToken = generateAccessToken(user.userId);
    res.status(200).json({ accessToken });
  });
};


// profile
exports.getProfile = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, accessTokenSecret);
    const user = await User.findById(decoded.userId).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Logout
exports.logout = async (req, res) => {
  const { token } = req.body;
  await Token.findOneAndDelete({ token });
  res.status(204).json({ message: 'Logged out' });
};
