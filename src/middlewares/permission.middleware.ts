import { Request, NextFunction, Response } from 'express'
import { PermissionException } from '../common/errorHandler';


export function checkPermission(type: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!type.includes(user!.role)) {
            const error = new PermissionException();
            res.status(error.status || 500).send(error);
        } else {
            next();
        }
    }
};