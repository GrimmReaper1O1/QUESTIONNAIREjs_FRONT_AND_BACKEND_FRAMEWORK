import fs from 'fs';
import querys from './../querys/querys.js';
const {insertReportType, selectReportTypeRows, insertReport, countReports, selectReports} = querys;


async function insertType(req, res)  {
    const {type, message} = req.body;
    // ensure the try statement is necessary on insert by disabling database and attempting connection and insert or doing faulty insert.
    
    let result =  await insertReportType(type, message);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};
async function selectType(req, res)  {
    const {} = req.body;
    
    let result =  await selectReportTypeRows();
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}



async function insert(req, res)  {
    const {moduleId} = req.body;
    
    let result = insertReport(moduleId);
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }
};

async function count(req, res)  {
    const {moduleId} = req.body;
    
    let result = countReports(moduleId);
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}

async function select(req, res)  {
    const {moduleId} = req.body;
    
    let result = selectReports(moduleId);
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}


export default {insert, insertType,  selectType, count, select};