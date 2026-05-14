import fs from 'fs';
import querys from './../querys/querys.js';
const {updateSiteSettingsForumSwitch, updateSiteSettingsLoginSwitch, selectSiteSettings} = querys;

async function updateForum(req, res)  {
    const {} = req.body;
    let result = await updateSiteSettingsForumSwitch();
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function updateLogin(req, res)  {
    const {} = req.body;
    let result = await updateSiteSettingsLoginSwitch();
    if (result.affectedRows > 0) {
    res.status(200).json({message: 'success'})
    } else {
        res.status(500).json({message: 'failed'});
    }

}
async function select(req, res)  {
    const {} = req.body;
    
    let result = await selectSiteSettings();
    if(typeof result.length !== 'undefined' && result.length > 0) {
    res.status(200).json({result: result, message: 'successfull'});
    } else {
    res.status(404).json({message: 'Not found!'});
    }
}

export default {updateForum, updateLogin, select};