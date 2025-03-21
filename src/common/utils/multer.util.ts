import { Request } from "express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { mkdirSync, unlinkSync } from "fs";
import { BadRequestException } from "@nestjs/common";
import { UploadMessage } from "../enum/message.enum";

export type MulterFile = Express.Multer.File;

export const multerDestination = (fieldName: string) => {
    return (req: Request, file: MulterFile, callback: (error: Error | null, destination: string) => void): void => {
        let path = join('public', 'uploads', fieldName);
        
        mkdirSync(path, { recursive: true });
        callback(null, path);
    }
}

export const multerFilename = (req: Request, file: MulterFile, callback: (error: Error | null, destination: string) => void): void => {
    const ext = extname(file.originalname).toLowerCase();

    if (!isValidImageFormat(ext)) {
        const filePath = join("public", "uploads", "user_profile", file.originalname);

        try {
            unlinkSync(filePath);
        } catch (error) {
            console.warn("file not found", error);
        }
        return callback(new BadRequestException(UploadMessage.INVALID_IMAGE_FORMAT), "");
    } else {
        const filename = `${Date.now()}${ext}`;
        callback(null, filename);
    }
}


export const isValidImageFormat = (ext: string) => {
    return ['.png', '.jpg', '.jpeg'].includes(ext);
}

export const multerStorage = (folderName: string) => {
    return diskStorage({
        destination: multerDestination(folderName),
        filename: multerFilename
    })
}

export const multerStorageAttchment = (folderName: string) => {
    return diskStorage({
        destination(req, file, callback) {
            const path = join("public", "uploads", folderName);
            mkdirSync(path, { recursive: true });
            callback(null, path);
        },
        filename(req, file, callback) {
            const filename = `${Date.now()}${extname(file.originalname).toLowerCase()}`;
            callback(null, filename);
        },
    })
}
