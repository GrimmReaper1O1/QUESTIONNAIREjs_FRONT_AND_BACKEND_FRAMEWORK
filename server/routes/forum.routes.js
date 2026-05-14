import express from 'express';
import forumCtrl from '../controllers/forum.controller.js';
const compCtrlRoutes = express.Router();


compCtrlRoutes.route('/update').put(forumCtrl.update);
compCtrlRoutes.route('/insert').put(forumCtrl.insert);
compCtrlRoutes.route('/select/:moduleId').get(forumCtrl.select);
compCtrlRoutes.route('/delete').delete(forumCtrl.del);



export default compCtrlRoutes