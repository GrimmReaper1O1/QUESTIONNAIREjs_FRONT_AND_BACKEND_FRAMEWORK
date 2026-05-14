import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
const authCtrlRouter = express.Router();

authCtrlRouter.route('/signin').post(authCtrl.signin);
authCtrlRouter.route('/signup').post(authCtrl.signup);


export default authCtrlRouter