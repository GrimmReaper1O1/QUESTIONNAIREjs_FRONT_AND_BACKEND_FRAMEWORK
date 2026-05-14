import fs from 'fs';
import querys from './../querys/querys.js';
const {insertIntoForum, deleteComment, updateForumComment, selectComments} = querys;


async function insert(req, res)  {
    const {adminModuleId, comment, commenterId} = req.body;
    // ensure the try statement is necessary on insert by disabling database and attempting connection and insert or doing faulty insert.
    
    let result =  await insertIntoForum(adminModuleId, comment, commenterId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};
async function del(req, res)  {
    const {id} = req.body;
    let result =  await deleteComment(id);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function update(req, res)  {
    const {id, comment} = req.body;
    let result =  await updateForumComment(id, comment);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function select(req, res)  {
    const {moduleId} = req.params;
    
    let result =  await selectComments(moduleId);
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}

export default {insert, del, update, select};