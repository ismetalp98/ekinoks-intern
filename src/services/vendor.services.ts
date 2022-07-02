import { UserTypes } from '../common/enums';
import { GenericException, UserAlreadyExistsException } from '../common/errorHandler';
import { DeleteResponse, FetchResponse, InsertionResponse } from '../common/responseHandler';
import { PaginationParams } from '../dto/paginatipn.dto';
import { CreateVendorInput, VendorFilterInputs } from '../dto/vendor.dto';
import { Vendor } from '../modals/vendor.modal';
import VendorRepository from '../repository/vendor.repository';
import { PasswordUtility } from '../utility/password.utility';

export class VendorServices {

    constructor() { };

    async createVendorServices(vendor: CreateVendorInput): Promise<InsertionResponse> {
        return new Promise<InsertionResponse>((resolve, reject) => {
            VendorRepository.checkEmailIfExists(vendor.email).then((result: boolean) => {
                if (result) {
                    reject(new UserAlreadyExistsException('Vendor with this email is allready exists!'));
                } else {
                    const hashedPassword = PasswordUtility.generatePassword(vendor.password);
                    const newVendor: CreateVendorInput = {
                        ...vendor,
                        password: hashedPassword,
                        role: UserTypes.VENDOR
                    };
                    VendorRepository.createVendorRespository(newVendor).then((result) => {
                        resolve(new InsertionResponse('Vendor created succesfuly', 201, result));
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }).catch((err) => {
                resolve(err);
            });
        });
    };

    async getVendorsServices(pagination: PaginationParams, filters: VendorFilterInputs): Promise<FetchResponse> {
        return new Promise<FetchResponse>((resolve, reject) => {
            VendorRepository.getVendorsRepository(pagination, filters).then((result) => {
                resolve(new FetchResponse('Vendors fetch succesfuly', result));
            }).catch((err) => {
                reject(err);
            });
        });
    };

    async getVendorByIDServices(id: number): Promise<FetchResponse> {
        return new Promise<FetchResponse>((resolve, reject) => {
            VendorRepository.getVendorByIDRepository(id).then((result: Vendor) => {
                //password not in vendorData
                const { password, ...vendorData } = result;
                resolve(new FetchResponse('Vendors fetch succesfuly', vendorData));
            }).catch((err) => {
                reject(err);
            });
        });
    };

    async getVendorByEmailServices(email: string): Promise<FetchResponse> {
        return new Promise<FetchResponse>((resolve, reject) => {
            VendorRepository.getVendorByEmailRepository(email).then((result: Vendor) => {
                resolve(new FetchResponse('Vendors fetch succesfuly', result));
            }).catch((err) => {
                reject(new GenericException(err.message));
            });
        });
    };

    async deleteVendorServices(id: string): Promise<DeleteResponse> {
        return new Promise<DeleteResponse>((resolve, reject) => {
            VendorRepository.deleteVendorRepository(id).then((result: number) => {
                resolve(new DeleteResponse('Vendor deleted succesfuly', result));
            }).catch((err) => {
                reject(err);
            });
        });
    };
};

const VendorServicesInstance = new VendorServices();
export default VendorServicesInstance as VendorServices;
