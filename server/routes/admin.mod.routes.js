import express from 'express';
import amModCtrl from './../controllers/admin.mod.controller.js';
const amModCtrlRoutes = express.Router();



amModCtrlRoutes.route('/insert').put(amModCtrl.insert);
amModCtrlRoutes.route('/select/:moduleId').get(amModCtrl.select);
amModCtrlRoutes.route('/delete').delete(amModCtrl.del);



export default amModCtrlRoutes