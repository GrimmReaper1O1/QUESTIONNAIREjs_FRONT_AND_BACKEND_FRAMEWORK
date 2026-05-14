import fs from 'fs';
import querys from './../querys/querys.js';
const {} = querys;


const iFController = async (req, res, next) => {
    let result;
        console.log(req.body);

    if (req.body.type === 'appendix') {
        result = await querys.insertAppendix(req.files.file[0].originalname, req.body);
    } else  if (req.body.type === 'video') {
        result = await querys.insertVideo(req.files.file[0].originalname, req.body);
    } else  if (req.body.type === 'audio') {
        result = await querys.insertAudio(req.files.file[0].originalname, req.body);
    }
    console.log(result);
    if (result.affectedRows > 0) {
res.status(200).send({
      message: 'Files uploaded successfully!',
      count: req.files.length,
      files: req.files
})} else {
    fs.unlink('../htdocs/main/uploads/'+req.files.file[0].originalname, err => {
        console.log('there was a problem deleting the file');
    })
    res.status(500).json({message: 'There was a problem with the insertion.'});
}


};
const deleteFile = async (req, res, next) => {
    let result = querys.deleteFile(req.body);
    fs.unlink('../htdocs/main/uploads/'+req.body.filename, err => {
        console.log('There was a problem deleting the file');
    });

    console.log(result)
    if (result.affectedRows > 0) {
    res.status(200).json({message:'The information was deleted successfully'});
    } else {
    res.status(404).json({message:'The information cannot be found'});
    }
}
export default {iFController, deleteFile}