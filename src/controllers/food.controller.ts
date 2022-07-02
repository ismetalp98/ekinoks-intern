import express, { Request, Response, NextFunction } from 'express';
import * as foodSchemes from '../validators/food.validation';
import { AddFoodInput } from '../dto/food.dto';
import { authendicateUser } from '../middlewares/auth.middleware';
import FoodServices from '../services/food.services';
import { checkPermission } from '../middlewares/permission.middleware';
import { UserTypes } from '../common/enums';

export class FoodController {
    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    };

    async addFoodController(req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        const vendorId = req.body.vendor_id ? req.body.vendor_id : user!.payload.id;
        const request = { ...req.body, vendor_id: vendorId };

        await foodSchemes.default.add_food.validateAsync(request).then((food: AddFoodInput) => {
            FoodServices.addFoodServices(food).then((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                next(err);
            });
        });
    };

    async getFoodsController(req: Request, res: Response, next: NextFunction) {
        const user = req.user;
        const vendorId: number = req.params.id ? parseInt('' + req.params.id, 10) : user!.payload.id;
        // console.log(vendorId);
        FoodServices.getFoodsServices(vendorId).then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            next(err);
        });
    };

    routes() {
        this.router.post('/food', authendicateUser, checkPermission([UserTypes.VENDOR]), this.addFoodController);
        this.router.get('/food', authendicateUser, checkPermission([UserTypes.VENDOR]), this.getFoodsController);
        this.router.get('/vendor/:id/food', authendicateUser, checkPermission([UserTypes.ADMIN]), this.getFoodsController);
    };
};

const foodController = new FoodController();
export default foodController.router;
