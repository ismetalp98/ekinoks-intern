import { Response, Request, NextFunction } from 'express';
import { HttpException } from '../common/errorHandler';
import { HttpResponse } from '../common/responseHandler';

export function responseHandlerMiddleware (err: HttpResponse | HttpException, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 400).send(err);
}