const multer = require('multer');

// * allocate storage to buffer memory *
const storage = multer.memoryStorage();

// * accept only txt and csv file types *
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/plain' || file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

// * accept files only up to 5 MB *
const maxSize = 1024 * 1024 * 5;


const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: fileFilter
});


module.exports = upload;