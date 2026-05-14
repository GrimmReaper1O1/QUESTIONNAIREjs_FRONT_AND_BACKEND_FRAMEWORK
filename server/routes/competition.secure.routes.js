import express from 'express';
import compCtrl from '../controllers/competition.index.controller.js';
const compRoutes = express.Router();


compRoutes.route('/update').put(compCtrl.update);
compRoutes.route('/insert').put(compCtrl.insert);
compRoutes.route('/select/:id').get(compCtrl.select);
compRoutes.route('/selectall').get(compCtrl.selectAll)
compRoutes.route('/delete').delete(compCtrl.del);



export default compRoutes