import multer from "multer";
import {cloudinary} from "../config/cloudinary";



class UploadFiles {

    private static commonOptions = {
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 5, // 5MB
        },
    };

    private static allowedMimeTypes = [
        'image/svg',
        'image/svg+xml',
        'image/webp',
        'image/jpeg',
        'image/jpg',
        'image/png',
    ];

    private static fileFilter(
        allowedFieldName: string,
        req: Express.Request,
        file: Express.Multer.File,
        callback: multer.FileFilterCallback,
    ) {
        console.log('Fieldname:', file.fieldname);

        // Проверка имени поля
        if (file.fieldname !== allowedFieldName) {
            return callback(new Error(`Invalid fieldname: expected '${allowedFieldName}'`));
        }

        // Проверка типа файла
        if (this.allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(
                new multer.MulterError(
                    'LIMIT_UNEXPECTED_FILE',
                    'Only JPEG, PNG, SVG, or WebP images are allowed!'
                )
            );
        }
    }

    // Загрузка одного файла
    public static uploadSingle(fieldName: string) {
        return multer({
            ...this.commonOptions,
            fileFilter: (req, file, callback) =>
                this.fileFilter(fieldName, req, file, callback),
        }).single(fieldName);
    }

    // Загрузка нескольких файлов
    public static uploadMultiple(fieldName: string, maxCount: number) {
        return multer({
            ...this.commonOptions,
            fileFilter: (req, file, callback) =>
                this.fileFilter(fieldName, req, file, callback),
        }).array(fieldName, maxCount);
    }

    // Extend Express's Request interface to include 'files'

    public static deleteImage = async (publicId: string) => {
        try {
            const result = await cloudinary.uploader.destroy(publicId);
            return result;  // Результат возвращает информацию об удалении
        } catch (error) {
            console.error("Error deleting image from Cloudinary:", error);
        }
    };

}

export interface MulterRequest extends Request {
    files: Express.Multer.File[]; // Type files explicitly
}


export default UploadFiles;