
import { FetchResponse, InsertionResponse } from '../common/responseHandler';
import { AddFoodInput } from '../dto/food.dto';
import FoodRepository from '../repository/food.repository';

export class FoodServices {

    constructor() { };

    async addFoodServices(food: AddFoodInput) {
        return new Promise((resolve, reject) => {
            FoodRepository.addFoodRepository(food).then((result) => {
                resolve(new InsertionResponse('Food added succesfuly', 201, result));
            }).catch((err) => {
                reject(err);
            });
        });
    };

    async getFoodsServices(id: number) {
        return new Promise<FetchResponse>((resolve, reject) => {
            FoodRepository.getFoodsRepository(id).then((result) => {
                resolve(new FetchResponse('Food fetch succesfuly', result));
            }).catch((err) => {
                reject(err);
            });
        });
    };
};

const FoodServicesInstance = new FoodServices();
export default FoodServicesInstance as FoodServices;
