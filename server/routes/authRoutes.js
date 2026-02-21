const express = require('express');
const { register, login, refreshToken, getProfile, updateProfile } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/auth');
const { validate, registerSchema, loginSchema } = require('../middlewares/validate');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refreshToken);
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
