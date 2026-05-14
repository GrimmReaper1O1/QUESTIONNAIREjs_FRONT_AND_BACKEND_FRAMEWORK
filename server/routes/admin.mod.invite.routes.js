import express from 'express';
import aMMIvCtrl from '../controllers/admin.mod.invite.controller.js';
const aMMIvCtrlRoutes = express.Router();


aMMIvCtrlRoutes.route('/update').put(aMMIvCtrl.update);
aMMIvCtrlRoutes.route('/insert').put(aMMIvCtrl.insert);
aMMIvCtrlRoutes.route('/select/:userId').get(aMMIvCtrl.select);
aMMIvCtrlRoutes.route('/delete').delete(aMMIvCtrl.del);



export default aMMIvCtrlRoutes