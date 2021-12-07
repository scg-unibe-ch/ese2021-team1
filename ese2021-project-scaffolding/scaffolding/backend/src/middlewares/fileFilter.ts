import multer from 'multer';
/**
* @param storage stores where images are stored
* @param fileFilter
* @param upload format
*/

// This is a middleware to handle the incoming files and images.

const storage = multer.diskStorage({
    // where the images are stored
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads');
    },
    // what the image is called.
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// only certain data types are allowed
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('wrong format'), false);
    }
};

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});



