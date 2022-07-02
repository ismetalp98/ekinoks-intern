import { GenericException, NoRecordFoundException, UserNotFoundException } from '../common/errorHandler';
import { User } from '../modals/user.modal';
import { Vendor } from '../modals/vendor.modal';
import BaseRepository from './base';

export class AuthRepository extends BaseRepository {

    constructor() {
        super();
    };

    async getUserByEmailRepository(email: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.knx.db('user').select().where('email', email).first().then((result: Vendor) => {
                if (result)
                    resolve(result);
                else
                    reject(new UserNotFoundException('User not found!'));
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };
};

const authRepository = new AuthRepository();
export default authRepository as AuthRepository;
