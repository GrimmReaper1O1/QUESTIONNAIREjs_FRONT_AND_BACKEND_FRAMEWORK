import express from 'express';
import votesCtrl from '../controllers/votes.controller.js';
const votesRoutes = express.Router();

votesRoutes.route('/down').put(votesCtrl.updateDown);
votesRoutes.route('/up').put(votesCtrl.updateUp);
votesRoutes.route('/insert').post(votesCtrl.insert);
votesRoutes.route('/select/:moduleId').get(votesCtrl.select);
votesRoutes.route('/leaderboards/:compId').get(votesCtrl.select);
votesRoutes.route('/delete').delete(votesCtrl.del);



export default votesRoutes