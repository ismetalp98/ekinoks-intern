import { Request, NextFunction, Response } from 'express'
import { AuthPayload } from '../dto/auth.dto';
import { PaginationParams } from '../dto/paginatipn.dto';
import { VendorFilterInputs } from '../dto/vendor.dto';
import { AuthUtilities } from '../utility/auth.utility';

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
            pagination: PaginationParams;
            filters: VendorFilterInputs;
        }
    }
};

export function authendicateUser (req: Request, res: Response, next: NextFunction) {
    const signature = AuthUtilities.validateSignature(req);
    if (signature) {
        return next();
    } else {
        return res.json({ message: 'User not authorised' });
    }
};
