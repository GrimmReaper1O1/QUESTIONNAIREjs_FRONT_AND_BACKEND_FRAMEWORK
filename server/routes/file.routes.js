import Express from 'express';
import fUMiddleware from '../middleware/storeFile.middleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import iFController from '../controllers/insertFile.controller.js';

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), '../../inetpub/wwwroot/main/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Files will be saved in the 'uploads' directory
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
let truthy = false
let index = file.originalname.indexOf('.');
let temp = file.originalname;
let name = file.originalname.slice(0, index);
let extension = file.originalname.slice(index);
console.log(index, temp, extension);
let count = 0;
do {
    
  if (fs.existsSync(uploadDir+'/'+temp)) {
      
      temp = name+'dup969'+count+extension;
      count++          
    
    } else {
      truthy = true;
      file.originalname = temp;
    }

  } while(!truthy);
  console.log(file.originalname);
    // Use the original file name for simplicity
    cb(null, file.originalname); 
  }
});

const upload = multer({storage: storage});


const fURoutes = Express.Router();


fURoutes.post('/upload', upload.fields([{name:'file', maxCount: 1}, {name: 'info', maxCount: 1}, {name: 'type', maxCount: 1}, {name: 'position', maxCount: 1}, {name: 'subjectId', maxCount: 1}]), fUMiddleware, iFController.iFController);
fURoutes.delete('/delete', iFController.deleteFile);

export default fURoutes