import express from 'express';
import reviewCtrl from '../controllers/review.controller.js';
const reviewCtrlRoutes = express.Router();


reviewCtrlRoutes.route('/insert').put(reviewCtrl.insert);
reviewCtrlRoutes.route('/select/:moduleId').get(reviewCtrl.select);
reviewCtrlRoutes.route('/delete').delete(reviewCtrl.del);



export default reviewCtrlRoutes