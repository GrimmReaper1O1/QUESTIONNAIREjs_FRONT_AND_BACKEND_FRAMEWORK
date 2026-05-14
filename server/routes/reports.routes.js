import express from 'express';
import reportsCtrl from '../controllers/reports.controller.js';
const reportsCtrlRoutes = express.Router();

reportsCtrlRoutes.route('/inserttype').put(reportsCtrl.insertType);
reportsCtrlRoutes.route('/selecttype').get(reportsCtrl.selectType);
reportsCtrlRoutes.route('/insert').put(reportsCtrl.insert);
reportsCtrlRoutes.route('/count/:moduleId').get(reportsCtrl.count);
reportsCtrlRoutes.route('/select/:moduleId').get(reportsCtrl.select);


export default reportsCtrlRoutes