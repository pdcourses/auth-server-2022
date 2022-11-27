const express = require('express');
const authController = require('../controllers/authController.js');

authRouter = express.Router();

// login
authRouter.post('/signin', authController.signin);

// registration
authRouter.post('/signup', authController.signup);

// update tokens
authRouter.post('/refresh', authController.refresh);

module.exports = authRouter;

