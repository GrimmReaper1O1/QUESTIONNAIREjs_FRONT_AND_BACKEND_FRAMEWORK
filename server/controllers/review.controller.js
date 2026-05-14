import fs from 'fs';
import querys from './../querys/querys.js';
const {insertReview, deleteReviewPastNuTen, selectReviews} = querys;

async function insert(req, res)  {
    const {string, userId, star} = req.body;
    // ensure the try statement is necessary on insert by disabling database and attempting connection and insert or doing faulty insert.
    
    let result = await insertReview(string, userId, star);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};
async function del(req, res)  {
    const {moduleId} = req.body;
    let result = await deleteReviewPastNuTen(moduleId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function select(req, res)  {
    const {moduleId} = req.params;
    
    let result = await selectReviews(moduleId);
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}

export default {insert, del, select};