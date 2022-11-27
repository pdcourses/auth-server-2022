module.exports = {
    JSW_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY || 'pd2022supersecretkey',
    TOKEN_TIME: process.env.ACCESS_TOKEN_EXP || 60 * 60,
    REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_EXP || '30 days',
};