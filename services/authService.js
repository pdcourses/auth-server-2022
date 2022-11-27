const {
    ACCESS_TOKEN_SECRET_KEY,
    ACCESS_TOKEN_EXP,
    REFRESH_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_EXP,
    DEVICES_LIMIT
  } = process.env;
  
  const jwt = require("jsonwebtoken");
  const { v4: uuidV4 } = require("uuid");
  const _ = require('lodash');
  const {Sequelize} = ('../models');
  const jwtService = require('./jwtService.js');
  
  function prepatedUser (user) {
    const userData = user.get();
    return _.omit(userData, ['password']);
  } 

  async function createTokenPair(user){
    return{
        accessToken: await jwtService.sign(
            {
                userId: user.get('id'),
                userRole: user.get('role')
            }, 
            ACCESS_TOKEN_SECRET_KEY, 
            {expiresIn: ACCESS_TOKEN_EXP},

        ),
        refreshToken: {
            token: uuidV4(),
            expiresIn: Sequelize.literal(`CURRENT_TIMESTAMP + '${REFRESH_TOKEN_EXP}'::interval`)
        }
    }
  }

  exports.refreshTokens = async (tokens) => {
    const userInstance = await tokens.getUser();
    const {accessToken, refreshToken} = await createTokenPair(userInstance);
    await tokens.update(refreshToken);
    return{
        user: prepatedUser(userInstance),
        tokenPair: {
            accessToken,
            refreshToken: refreshToken.token
        }
    }
  };
  
  exports.createSession = async (userInstance) => {
    const {accessToken, refreshToken} = await createTokenPair(userInstance);
    if((await userInstance.countRefreshTokens()) >= DEVICES_LIMIT) {
        const [
            oldestUserRefreshTokenInstance,            
        ] = await userInstance.getRefreshTokens({
            order: [['updatedAt', 'ASC']]
        });
        await oldestUserRefreshTokenInstance.update(refreshToken);
    } else{
        await userInstance.createRefreshToken(refreshToken)
    }
    return{
        user: prepatedUser(userInstance),
        tokenPair: {
            accessToken,
            refreshToken: refreshToken.token
        }
    }
  }



  