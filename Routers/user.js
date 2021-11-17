const express = require('express');
const Router = express.Router();
const {register, login, logout, current_user} = require('../controllers/auth');
const {createstudent, studentlogin, all} = require('../controllers/student');
const {info,addmarks,getmarks} = require('../controllers/mark');
const {requiredSigin} = require('../middleware');
Router.post('/register',register);
Router.post('/login',login);
Router.get('/logout',logout);
Router.get('/current-user',requiredSigin,current_user);
Router.post('/create-student',requiredSigin,createstudent);
Router.get('/all',all);
Router.post('/info/:_id',info);
Router.post('/create-mark/:_id',addmarks);
Router.post('/getmark/:_id',getmarks);
module.exports = Router;