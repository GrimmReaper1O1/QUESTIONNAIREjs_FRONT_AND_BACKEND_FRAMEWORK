import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
const authRoutes = express.Router();


authRoutes.route('/signout').post(authCtrl.signout);

export default authRoutes