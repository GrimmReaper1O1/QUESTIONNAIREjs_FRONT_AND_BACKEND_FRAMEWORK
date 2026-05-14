import fs from 'fs';
import querys from './../querys/querys.js';
const {insertIntoModuleAdmins, deleteFromModuleAdmins, selectFromModuleAdmins} = querys;


async function insert(req, res)  {
    const {moduleId, userId} = req.body;
    // ensure the try statement is necessary on insert by disabling database and attempting connection and insert or doing faulty insert.
    
    let result = await insertIntoModuleAdmins(moduleId, userId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};


async function del(req, res)  {
    const {id} = req.body;
    let result =  await deleteFromModuleAdmins(id);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}

async function select(req, res)  {
    const {moduleId} = req.params;
    
    let result =  await selectFromModuleAdmins(moduleId);
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}
export default {insert, del, select};