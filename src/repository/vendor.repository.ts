import { UserTypes } from '../common/enums';
import { GenericException, NoRecordFoundException, UserNotFoundException } from '../common/errorHandler';
import { PaginationParams } from '../dto/paginatipn.dto';
import { CreateVendorInput, ReturnVendors, VendorFilterInputs } from '../dto/vendor.dto';
import { Vendor } from '../modals/vendor.modal';
import BaseRepository from './base';

export class VendorRepository extends BaseRepository {

    constructor() {
        super();
    };

    async createVendorRespository(vendor: CreateVendorInput): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.knx.db('user').insert(vendor).returning('id').then(result => {
                if (result.length > 0)
                    resolve(result[0]);
                else
                    reject(new GenericException('Insertion error'));
            }).catch(err => {
                reject(err);
            });
        });
    };

    async getVendorsRepository(pagination: PaginationParams, filters: VendorFilterInputs): Promise<ReturnVendors> {
        return new Promise((resolve, reject) => {
            const { offset, limit, order, sort } = pagination;
            const { name, owner_name, pin_code, address, phone, email } = filters;
            this.knx.db('user').select().offset(offset)
                .where((builder) => {
                    if (name)
                        builder.where('name', 'like', `%${name}%`);
                    if (owner_name)
                        builder.where('owner_name', 'like', `%${owner_name}%`);
                    if (pin_code)
                        builder.where('pin_code', pin_code);
                    if (address)
                        builder.where('address', 'like', `%${address}%`);
                    if (phone)
                        builder.where('phone', 'like', `%${phone}%`);
                    if (email)
                        builder.where('email', 'like', `%${email}%`);
                })
                .where('role', UserTypes.VENDOR)
                .limit(limit).orderBy(order, sort).then((result: Vendor[]) => {
                    if (result.length > 0) {
                        const vendorsNoPss = result.map(vendor => {
                            return {
                                ...vendor,
                                password: undefined
                            }
                        });
                        resolve({ totalCount: result.length, data: vendorsNoPss });
                    }
                    else
                        resolve({ totalCount: 0, data: [] });
                }).catch(err => {
                    reject(new GenericException(err.message));
                });
        });
    };

    async getVendorByIDRepository(id: number): Promise<Vendor> {
        return new Promise<Vendor>((resolve, reject) => {
            this.knx.db('user').select().where('id', id).where('role', UserTypes.VENDOR).first().then((result: Vendor) => {
                if (result)
                    resolve(result);
                else
                    reject(new UserNotFoundException('Vendor not found!'));
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };

    async getVendorByEmailRepository(email: string): Promise<Vendor> {
        return new Promise<Vendor>((resolve, reject) => {
            this.knx.db('user').select().where('email', email).where('role', UserTypes.VENDOR).first().then((result: Vendor) => {
                if (result)
                    resolve(result);
                else
                    reject(new UserNotFoundException('Vendor not found!'));
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };

    async checkEmailIfExists(email: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.knx.db('user').select().where('email', email).where('role', UserTypes.VENDOR).first().then((result: Vendor) => {
                if (result)
                    resolve(true);
                else
                    resolve(false);
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };

    async deleteVendorRepository(id: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.knx.db('user').where('id', id).where('role', UserTypes.VENDOR).del().returning('id').then((result) => {
                if (result.length > 0)
                    resolve(result[0]);
                else
                    reject(new UserNotFoundException('Vendor not found!'));
            }).catch(err => {
                reject(new GenericException(err.message));
            });
        });
    };
};

const vendorRepository = new VendorRepository();
export default vendorRepository as VendorRepository;
