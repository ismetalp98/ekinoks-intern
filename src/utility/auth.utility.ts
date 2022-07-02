import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../dto/auth.dto';
import config from '../config';
require('dotenv').config();

export class AuthUtilities {
    public static generateSignature(payload: AuthPayload) {
        const secret = config.APP_SECRET;
        return jwt.sign(payload, secret!, { expiresIn: '90d' });
    };

    public static validateSignature (req: Request) {
        const signature = req.get('Authorization');
        if (signature) {
            const secret = config.APP_SECRET;
            const payload = jwt.verify(signature.split(' ')[1], secret!) as AuthPayload;
            req.user = payload;
            return true;
        }
        return false;
    };
};
