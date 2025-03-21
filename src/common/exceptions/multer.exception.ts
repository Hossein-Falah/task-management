import { MulterError } from "multer";
import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from "@nestjs/common";
import { UploadMessage } from "../enum/message.enum";

@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
    catch(exception: MulterError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        console.log(exception.code);
        
        if (exception.code === "LIMIT_FILE_SIZE") {
            throw new BadRequestException(UploadMessage.FILE_SIZE_EXCEEDED);
        }

        response.status(400).json({
            statusCode: 400,
            message: exception.message
        });
    }
}
