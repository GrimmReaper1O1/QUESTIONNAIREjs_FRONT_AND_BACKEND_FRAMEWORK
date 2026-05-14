
import multer from 'multer';
import path from 'path';
import fs from 'fs';
const filePath = 'path/to/file-to-delete.txt';
const unlink = (filePath) => {
fs.unlink(filePath, (err) => {
  if (err) {
    console.error('Error deleting file:', err);
    return;
  }
  console.log(`${filePath} was deleted successfully`);
});
}

console.log(process.cwd())

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
    // Use the original file name for simplicity
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });

// Define the route to handle the array of file uploads
// 'files' must match the 'name' attribute in your HTML input field
let fUMiddleware = (req, res, next) => {
  // req.files will contain an array of file objects
  console.log(req.files.file, req.body.type);
 
  if (req.files.file && req.files.file.length > 0 && (req.files.file[0].mimetype === 'image/jpeg' || req.files.file[0].mimetype === 'image/png' || req.files.file[0].mimetype === 'image/gif' || req.files.file[0].mimetype === 'image/webp' || req.files.file[0].mimetype === 'image/svg+xml' || req.files.file[0].mimetype === 'image/tiff' || req.files.file[0].mimetype === 'video/mp4' ||  req.files.file[0].mimetype === 'video/webm' || req.files.file[0].mimetype === 'audio/mpeg' || req.files.file[0].mimetype === 'audio/ogg')) {
    console.log(`Received ${req.files.file.length} files:`, req.files.file.map(f => f.filename));
if (req.body.type === 'video' && req.files.file[0].size < 150000000) {

console.log('got here one');
  next();

} else if (req.body.type === 'audio' && req.files.file[0].size < 10000000) {


  next();

} else if (req.body.type === 'appendix' && req.files.file[0].size < 20000000) {


  next();

} else {
unlink(uploadDir+'/'+req.files.file[0].originalname);
    res.status(400).send('File is the wrong size.');

}
    // res.status(200).send({
    //   message: 'Files uploaded successfully!',
    //   count: req.files.length,
    //   files: req.files
    // });
  } else {
    unlink(uploadDir+'/'+req.files.file[0].originalname);

    res.status(400).send('File is the wrong type.');
  }
}
export default fUMiddleware