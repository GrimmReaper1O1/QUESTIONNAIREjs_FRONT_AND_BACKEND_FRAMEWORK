import moduleCtrl from './../controllers/mod.controller.js';
import express from 'express';

const moduleCtrlRouter = express.Router();


moduleCtrlRouter.route('/save').post(moduleCtrl.writeModule);
moduleCtrlRouter.route('/read/:name').get(moduleCtrl.readModule);
moduleCtrlRouter.route('/search/:searchVal/:type/:enabled/:numOfRows/:offset').get(moduleCtrl.searchForModule);



export default moduleCtrlRouter;