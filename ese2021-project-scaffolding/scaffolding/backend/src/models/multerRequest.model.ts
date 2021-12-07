import {Request} from 'express';
/**
* @param file
* @param fileValidationError
*/
export interface MulterRequest extends Request {
    file: any;
    fileValidationError: any;
}
