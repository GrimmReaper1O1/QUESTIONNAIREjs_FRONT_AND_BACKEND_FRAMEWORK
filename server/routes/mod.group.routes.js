import express from 'express';
import mdgCtrl from '../controllers/mod.group.controller.js';
const mDGCtrlRoutes = express.Router();


mDGCtrlRoutes.route('/update').put(mdgCtrl.update);
mDGCtrlRoutes.route('/insert').put(mdgCtrl.insert);
mDGCtrlRoutes.route('/select/:id').get(mdgCtrl.select);
mDGCtrlRoutes.route('/selectKey/:key').get(mdgCtrl.selectViaKey);
mDGCtrlRoutes.route('/delete').delete(mdgCtrl.del);



export default mDGCtrlRoutes