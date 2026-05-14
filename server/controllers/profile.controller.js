import fs from 'fs';
import querys from './../querys/querys.js';
const {insertIntoBio, selectBioViaId, updateBioViaId, deleteBio, selectFromModuleIndexTableViaUserIdAndLetter} = querys;

async function insert(req, res)  {
    const {penName, description, userId} = req.body;
    // ensure the try statement is necessary on insert by disabling database and attempting connection and insert or doing faulty insert.
    
    let result =  await insertIntoBio(penName, description, userId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};
async function del(req, res)  {
    const {id} = req.body;
    let result =  await deleteBio(id);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

};
async function update(req, res)  {
    const {penName, description, id} = req.body;
    let result =  await updateBioViaId(penName, description, id);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

};
async function select(req, res)  {
    const {userId, letter} = req.params;
    let result0 = await selectFromModuleIndexTableViaUserIdAndLetter(userId, letter);
    let result1 =  await selectBioViaId(userId);
    if((typeof result0.length !== 'undefined' && typeof result1.length !== 'undefined') && (result1.length > 0 )) {
    res.status(200).json({mods: result0, result: result1, message: 'bio successfull ' + (typeof result0.length === 'undefined'?'module not found':'module found')});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
};
async function selectMods(req, res)  {
    const {userId, letter} = req.params;
    console.log(userId, letter);
    let result0 = await selectFromModuleIndexTableViaUserIdAndLetter(userId, letter);
    console.log(result0);
    if((typeof result0.length !== 'undefined') && (result0.length > 0 )) {
    res.status(200).json({mods: result0, message: 'module found'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
};

export default {insert, del, update, select, selectMods};