import { UserTypes } from '../common/enums';
import { GenericException, NoRecordFoundException, UserNotFoundException } from '../common/errorHandler';
import { CreateCustomerInput, ReturnCustomers } from '../dto/customer.dto';
import { PaginationParams } from '../dto/paginatipn.dto';
import { Customer } from '../modals/customer.modal';
import BaseRepository from './base';

export class CustomerRespository extends BaseRepository {

    constructor() {
        super();
    };

    async createCustomerRepository(customer: CreateCustomerInput): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.knx.db('user').insert(customer).returning('id').then(result => {
                if (result.length > 0)
                    resolve(result[0]);
                else
                    reject(new GenericException('Insertion error'));
            }).catch(err => {
                reject(err);
            });
        });
    };

    async getCustomersRepository(pagination: PaginationParams): Promise<ReturnCustomers> {
        return new Promise((resolve, reject) => {
            const { offset, limit, order, sort } = pagination;
            this.knx.db('user').select('*').where('role', UserTypes.CUSTOMER).offset(offset).limit(limit).orderBy(order, sort).then((result: Customer[]) => {
                if (result.length > 0) {
                    const customerNoPss = result.map(customer => {
                        return {
                            ...customer,
                            password: undefined,
                            owner_name: undefined,
                            pin_code: undefined
                        }
                    });
                    resolve({ totalCount: result.length, data: customerNoPss });
                }
                else
                    resolve({ totalCount: 0, data: [] });
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };

    async getCustomerByEmailRepository(email: string): Promise<Customer> {
        return new Promise<Customer>((resolve, reject) => {
            this.knx.db('user').select().where('email', email).where('role', UserTypes.CUSTOMER).first().then((result: Customer) => {
                if (result)
                    resolve(result);
                else
                    reject(new UserNotFoundException('Customer not found!'));
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };

    async checkEmailIfExists(email: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.knx.db('user').select().where('email', email).where('role', UserTypes.CUSTOMER).first().then((result: Customer) => {
                if (result)
                    resolve(true);
                else
                    resolve(false);
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };
};

const customerRepository = new CustomerRespository();
export default customerRepository as CustomerRespository;
