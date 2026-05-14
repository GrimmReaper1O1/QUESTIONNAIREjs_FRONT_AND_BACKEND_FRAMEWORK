import fs from 'fs';
import querys from './../querys/querys.js';
const {insertVote, updateUpVote, updateDownVote, selectVotes,  determineHighestVoteOnComp} = querys;

async function insert(req, res)  {
    const {moduleId} = req.body;
    // ensure the try statement is necessary on insert by disabling database and attempting connection and insert or doing faulty insert.
    
    let result = await insertVote(moduleId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};
async function del(req, res) {
    const {} = req.body;
    let result =  await deleteBio();
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function updateUp(req, res) {
    const {moduleId} = req.body;
    let result =  await updateUpVote(moduleId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function updateDown(req, res) {
    const {moduleId} = req.body;
    let result =  await updateDownVote(moduleId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function select(req, res) {
    const {moduleId} = req.params;
    
    let result =  await selectVotes(moduleId);
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}
async function leaderboards(req, res) {
    const { compId} = req.params;
    
    let result =  await determineHighestVoteOnComp( compId);
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}

export default {insert, del, updateUp, updateDown, select, leaderboards};