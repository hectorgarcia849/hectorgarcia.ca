let multer = require('multer');
let fs = require('fs');

let storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    let tempDestination = './temp';
    let stat = null;
    try {
      stat = fs.statSync(tempDestination);
    } catch (err) {
      fs.mkdirSync(tempDestination);
    }
    if (stat && !stat.isDirectory()) {
      throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
    }
    cb(null, tempDestination);
  },
  filename: function (req, file, cb) {
    const parts = file.originalname.split('.');
    let name = parts[0];
    let ext = parts[1];
    cb(null, name + '_' + Date.now() + '.' + ext);
  }
});

let upload = multer({ dest: './temp', storage: storage,   limits: {
    fieldNameSize: 100,
    fileSize: 60000000
  }
});

let multipleFileUploader = upload.array("file");

module.exports = {multipleFileUploader};
