import Express from 'express';
import qCtrl from '../controllers/question.controller.js';
const qCtrlRoutes = Express.Router();

qCtrlRoutes.route('/inputSubject').put(qCtrl.inputSubject);
qCtrlRoutes.route('/inputQuestions').put(qCtrl.inputQuestionJSON);
qCtrlRoutes.route('/subject').put(qCtrl.insertSubject);
qCtrlRoutes.route('/questionIds').put(qCtrl.insertQuestionIds);
qCtrlRoutes.route('/questionInformation').put(qCtrl.insertQuestionInformation);
qCtrlRoutes.route('/subjectUpdate').put(qCtrl.updateSubject);
qCtrlRoutes.route('/questionIdsUpdate').put(qCtrl.updateQuestionIds);
qCtrlRoutes.route('/questionInformationUpdate').put(qCtrl.updateQuestionInformation);
qCtrlRoutes.route('/subject').delete(qCtrl.deleteSubject);
qCtrlRoutes.route('/questionInformation').delete(qCtrl.deleteQuestionIds);
qCtrlRoutes.route('/questionIds').delete(qCtrl.deleteQuestionInformation);
qCtrlRoutes.route('/subject').post(qCtrl.selectSubject);
qCtrlRoutes.route('/subjectSearch').post(qCtrl.acquireSubjects);
qCtrlRoutes.route('/selectIds').post(qCtrl.selectQuesitonIds);
qCtrlRoutes.route('/selecteGroupedQuestionInfoId').post(qCtrl.postGetInformationGrouped);
qCtrlRoutes.route('/selectQuestionIdsWD').post(qCtrl.selectIdsByIdWithIdsAndDescription);
qCtrlRoutes.route('/subject').get(qCtrl.acquireSubjects);
qCtrlRoutes.route('/questionIds').get(qCtrl.acquireQuestionIds);
qCtrlRoutes.route('/questionInformation').get(qCtrl.acquireQuestionInformation);


export default qCtrlRoutes