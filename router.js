const express = require('express');
const authRouter = require('./routes/auth.js');

const router = express.Router();

router.use('/auth', authRouter);
// router.use('/users', userRouter);
// router.use('/chats', chatRouter);

module.exports = router;