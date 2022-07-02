import { GenericException, NoRecordFoundException } from '../common/errorHandler';
import { AddFoodInput } from '../dto/food.dto';
import { Food } from '../modals/food.modal';
import BaseRepository from './base';

export class FoodRepository extends BaseRepository {

    constructor() {
        super();
    };

    async addFoodRepository(food: AddFoodInput) {
        return new Promise<number>((resolve, reject) => {
            this.knx.db('food').insert(food).returning('id').then(result => {
                if (result.length > 0)
                    resolve(result[0]);
                else
                    reject(new GenericException('Insertion error'));
            }).catch(err => {
                reject(err);
            });
        });
    };

    async getFoodsRepository(id: number) {
        return new Promise((resolve, reject) => {
            this.knx.db.select('*').from('food').where('vendor_id', id).then((result: Food[]) => {
                if (result.length > 0) {
                    resolve({ totalCount: result.length, data: result });
                }
                else
                    resolve({ totalCount: 0, data: [] });
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };
};

const foodRepository = new FoodRepository();
export default foodRepository as FoodRepository;
