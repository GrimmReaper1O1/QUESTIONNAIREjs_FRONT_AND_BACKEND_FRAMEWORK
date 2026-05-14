import fs from 'fs';
import querys from './../querys/querys.js';
const {insertIntoInvites, deleteInvite, updateInvites, selectInvites} = querys;


async function insert(req, res)  {
    const {authorId, invitedAuthor, moduleId} = req.body;
    // ensure the try statement is necessary on insert by disabling database and attempting connection and insert or doing faulty insert.
    
    let result =  await insertIntoInvites(authorId, invitedAuthor, moduleId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};
async function del(req, res)  {
    const {inviteId} = req.body;
    let result =  await deleteInvite(inviteId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function update(req, res)  {
    const {} = req.body;
    let result =  await updateInvites();
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function select(req, res)  {
    const {userId} = req.params;
    
    let result =  await selectInvites(userId);
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}

export default {insert, del, update, select};