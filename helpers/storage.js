// const multer = require('multer');

// const storage = multer({
//   storage: multer.diskStorage({}),
//   limits: { fileSize: 500000 }
// });

// module.exports = storage.single('image')


const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body,'diskstorage callback')
    console.log(file)
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    console.log(file)
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname + Date.now() + '.' + fileType;
    //added timestamp for making a unique name of file. thats important
    // const fileName = file.originalname  + '.' + fileType;

    cb(null, fileName);
    console.log(file)
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single(
  'image'
);

module.exports = storage;


