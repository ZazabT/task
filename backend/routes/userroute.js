const express = require('express');
const { signup, login, refreshToken, logout , verifyEmail ,getProfile  } = require('../controllers/usercontroller');
const router = express.Router();

// signup 
router.post('/signup', signup);
// login
router.post('/login', login);

// refreshtoken
router.post('/token', refreshToken);

//logout
router.post('/logout', logout);

// verify email
router.get('/verify/:token', verifyEmail);

// get profile
 router.get('/profile', getProfile);



module.exports = router;
