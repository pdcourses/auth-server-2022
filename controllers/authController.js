const HTTPError = require('http-errors');
const {User, RefreshToken} = require('../db/models');
const authService = require('../services/authService');

exports.signin = async (req, res, next) => {
    try{
        const {
            body: {login, password}
        } = req;
        const userInstance = await User.findOne({
            where: {login},
        }); 
        if(userInstance && (await userInstance.comparePassword(password))){
            const data = await authService.createSession(userInstance);
            res.status(201).send({data});
            return;
        }
        next(HTTPError(403, 'Incorrect password or login'));   
    } catch(err){
        next(err);
    }
}

exports.signup = async (req, res, next) => {
    try{
        const {body} = req;
        const userInstance = await User.create(body);
        if(userInstance) {
            const data = await authService.createSession(userInstance);
            res.status(201).send({data});
            return;
        }
        next(HTTPError(401, 'Error with registration')); 
    }catch(err){
        next(err);
    }
}

exports.refresh = async (req, res, next) => {
    try{
        const{
            body: {refreshToken}
        } = req;
        const refreshTokenInstance = await RefreshToken.findOne({
            where: {token: refreshToken}
        });
        if(refreshTokenInstance && refreshTokenInstance.isUnexpired()){
            const data = await authService.refreshTokens(refreshTokenInstance);
            res.send({data});
            return;
        }
        next(HTTPError(401, 'Error with refresh session'));
    } catch(err){
        next(err);
    }
}