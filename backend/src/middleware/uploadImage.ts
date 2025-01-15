import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5,// 5MB
    },
    fileFilter(req, file, callback) {
        console.log("Filedname: ", file.fieldname);
        if (file.fieldname !== "photo") {
            return callback(new Error("Invalid fieldname"));
        }

        const allowedMimeTypes = ['image/svg', 'image/svg+xml', 'image/webp', 'image/jpeg', 'image/jpg', 'image/png'];

        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only JPEG and PNG images are allowed!'));
        }
    }
});

export default upload;