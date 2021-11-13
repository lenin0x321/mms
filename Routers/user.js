const express = require('express');
const Router = express.Router();
const {register, login, logout, current_user} = require('../controllers/auth');
const {requiredSigin} = require('../middleware');
Router.post('/register',register);
Router.post('/login',login);
Router.get('/logout',logout);
Router.get('/current-user',requiredSigin,current_user);

module.exports = Router;