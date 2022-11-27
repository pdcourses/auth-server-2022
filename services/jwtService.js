/*
jsonwebtoken (callback)
- sign(payload, key, [options, callback])
- verify(token, key, [options, callback])
- decode(token, key, [options, callback])
*/
const {
  ACCESS_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXP,
  REFRESH_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_EXP,
} = process.env;

const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const util = require('util');

const sign = util.promisify(jwt.sign);

const signAccessToken = (payload) => {
    sign(payload, 
        ACCESS_TOKEN_SECRET_KEY, 
        {expiresIn: ACCESS_TOKEN_EXP}
    );
};

const signRefreshToken = (payload) => {
    sign(payload, 
        REFRESH_TOKEN_SECRET_KEY, 
        {expiresIn: REFRESH_TOKEN_EXP}
    );
};

const signTokenPair = async payload => {
    return(
        {
        access: await signAccessToken(payload),
        refresh: await signRefreshToken({})
    }
    );
}

module.exports = {signAccessToken, signRefreshToken, signTokenPair};





