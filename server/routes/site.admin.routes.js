import express from 'express';
import sAmCtrl from '../controllers/site.admin.controller.js';
const sAmRoutes = express.Router();


sAmRoutes.route('/update_forum').put(sAmCtrl.updateLogin);
sAmRoutes.route('/update_login').put(sAmCtrl.updateForum);

sAmRoutes.route('/select').get(sAmCtrl.select);




export default sAmRoutes