import express from 'express';
import profileCtrl from '../controllers/profile.controller.js';
const profileRoutes = express.Router();


profileRoutes.route('/update').put(profileCtrl.update);
profileRoutes.route('/insert').put(profileCtrl.insert);
profileRoutes.route('/select/:userId/:letter').get(profileCtrl.select);
profileRoutes.route('/select_mods/:userId/:letter').get(profileCtrl.selectMods);
profileRoutes.route('/delete').delete(profileCtrl.del);



export default profileRoutes