import express, { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto/vendor.dto';
import { CreateCustomerInput } from '../dto/customer.dto';
import * as schemes from '../validators/vendor.validation';
import VendorServices from '../services/vendor.services';
import { WrongInputFormatException } from '../common/errorHandler';
import { DeleteResponse, FetchResponse } from '../common/responseHandler';
import { paginationHandler } from '../middlewares/requestHandler.middleware';
import { authendicateUser } from '../middlewares/auth.middleware';
import { checkPermission } from '../middlewares/permission.middleware';
import { UserTypes } from '../common/enums';

export class VendorController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    };

    async createVendorController(req: Request, res: Response, next: NextFunction) {
        const request = req.body;

        await schemes.default.create_vendor.validateAsync(request)
            .then((vendor: CreateVendorInput) => {
                VendorServices.createVendorServices(vendor).then((result) => {
                    res.json(result);
                }).catch((err) => {
                    next(err);
                });
            }).catch((err) => {
                next(new WrongInputFormatException(err.message));
            });
    };

    async getVendorsController(req: Request, res: Response, next: NextFunction) {
        const { pagination, filters } = req;
        // const asd = new Class( owner_name, pin_code, address, phone, email ) = req.query;

        VendorServices.getVendorsServices(pagination, filters).then((result: FetchResponse) => {
            res.status(200).json(result);
        }).catch((err) => {
            next(err);
        });
    };

    async getVendorsByIdController(req: Request, res: Response, next: NextFunction) {
        const request = req.params.id;

        await schemes.default.get_vendor_id.validateAsync(request)
            .then((id: number) => {
                VendorServices.getVendorByIDServices(id).then((result: FetchResponse) => {
                    res.status(result.status).json(result);
                }).catch((err) => {
                    next(err);
                });
            }).catch((err) => {
                next(new WrongInputFormatException(err.message));
            });
    };

    async deleteVendorController(req: Request, res: Response, next: NextFunction) {
        const request = req.params.id;

        await schemes.default.delete_vendor.validateAsync(request)
            .then((id: string) => {
                VendorServices.deleteVendorServices(id).then((result: DeleteResponse) => {
                    res.status(200).json(result);
                }).catch((err) => {
                    next(err);
                });
            }).catch((err) => {
                next(new WrongInputFormatException(err.message));
            });
    };

    routes() {
        this.router.post('/', authendicateUser, checkPermission([UserTypes.ADMIN]), this.createVendorController);
        this.router.get('/', authendicateUser, checkPermission([UserTypes.ADMIN]), paginationHandler, this.getVendorsController);
        this.router.get('/:id', authendicateUser, checkPermission([UserTypes.ADMIN]), this.getVendorsByIdController);
        this.router.delete('/:id', authendicateUser, checkPermission([UserTypes.ADMIN]), this.deleteVendorController);
    };
};

const vendorController = new VendorController();
export default vendorController.router;
