import express, { Request, Response, NextFunction } from 'express';
import { LoginInput } from '../dto/auth.dto';
import * as schemes from '../validators/login.validation';
import AuthServices from '../services/auth.services';
import { WrongInputFormatException } from '../common/errorHandler';

export class LoginController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    async loginController(req: Request, res: Response, next: NextFunction) {
        const request = req.body;

        await schemes.default.login_user.validateAsync(request)
            .then((vendor: LoginInput) => {
                AuthServices.loginServices(vendor).then((result) => {
                    res.status(200).json(result);
                }).catch((err: any) => {
                    next(err);
                });
            }).catch((err: any) => {
                next(new WrongInputFormatException(err.message));
            });
    };

    routes() {
        this.router.post('/', this.loginController);
    };
};

const loginController = new LoginController();
export default loginController.router;
