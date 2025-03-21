import { BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"
import { UploadMessage } from "../enum/message.enum";
import { multerStorage, multerStorageAttchment } from "../utils/multer.util"

export const UploadFile = (fieldName: string, folderName: string) => {
    return class UploadUtility extends FileInterceptor(fieldName, {
        storage: multerStorage(folderName),
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: (req, file, callback) => {
            if (file.size > 1024 * 1024 * 5) {
                return callback(new BadRequestException(UploadMessage.FILE_SIZE_EXCEEDED), false);
            }
            callback(null, true);
        }
    }) { }
}

export const UploadFileAttchment = (fieldName: string, folderName: string) => {
    return class UploadUtility extends FileInterceptor(fieldName, {
        storage: multerStorageAttchment(folderName),
        limits: {
            fileSize: 1024 * 1024 * 5
        }
    }) {}
}
