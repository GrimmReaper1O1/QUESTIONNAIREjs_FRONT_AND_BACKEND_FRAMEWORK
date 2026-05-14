import fs from 'fs';
import querys from './../querys/querys.js';
const {insertCompetition, deleteCompetition, updateCompetition, selectCompetitions} = querys;


async function insert(req, res)  {
    const {startDate, endDate, description, imageLocation, title, reward} = req.body;
    // ensure the try statement is necessary on insert by disabling database and attempting connection and insert or doing faulty insert.
    
    let result =  await insertCompetition(startDate, endDate, description, imageLocation, title, reward);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};
async function del(req, res)  {
    const {id} = req.body;
    let result =  await deleteCompetition(id);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function update(req, res)  {
    const {startDate, endDate, description, imageLocation, title, reward} = req.body;
    let result =  await updateCompetition(startDate, endDate, description, imageLocation, title, reward);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function selectAll(req, res)  {

    
    let result =  await selectCompetitions();
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}
async function select(req, res)  {
    const {id} = req.params;
    
    let result =  await selectCompetitions();
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}
export default {selectAll, insert, del, update, select};