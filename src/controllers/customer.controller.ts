import express, { Request, Response, NextFunction } from 'express';
import { UserTypes } from '../common/enums';
import { WrongInputFormatException } from '../common/errorHandler';
import { CreateCustomerInput } from '../dto/customer.dto';
import { authendicateUser } from '../middlewares/auth.middleware';
import { checkPermission } from '../middlewares/permission.middleware';
import { paginationHandler } from '../middlewares/requestHandler.middleware';
import CustomerServices from '../services/customer.services';
import * as schemes from '../validators/customer.validation';

export class CustomerController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    };

    async createCustomerController(req: Request, res: Response, next: NextFunction) {
        const request = req.body;

        await schemes.default.create_customer.validateAsync(request)
            .then((vendor: CreateCustomerInput) => {
                CustomerServices.createCustomerServices(vendor).then((result) => {
                    res.json(result);
                }).catch((err) => {
                    next(err);
                });
            }).catch((err) => {
                next(new WrongInputFormatException(err.message));
            });
    };

    async getCustomersController(req: Request, res: Response, next: NextFunction) {
        const { pagination } = req;

        CustomerServices.getCustomersServices(pagination).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            next(err);
        });
    };

    routes() {
        this.router.post('/', this.createCustomerController);
        this.router.get('/', authendicateUser, checkPermission([UserTypes.ADMIN]) ,paginationHandler, this.getCustomersController);
    };
};

const customerController = new CustomerController();
export default customerController.router;
