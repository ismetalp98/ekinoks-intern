import { UserTypes } from '../common/enums';
import { InvalidCredentialsException, UserAlreadyExistsException } from '../common/errorHandler';
import { FetchResponse, InsertionResponse, LoginResponse } from '../common/responseHandler';
import { AuthPayload } from '../dto/auth.dto';
import { CreateCustomerInput } from '../dto/customer.dto';
import { PaginationParams } from '../dto/paginatipn.dto';
import { VendorLoginInput } from '../dto/vendor.dto';
import CustomerRepository from '../repository/customer.repository';
import { AuthUtilities } from '../utility/auth.utility';
import { PasswordUtility } from '../utility/password.utility';

export class CustomerServices {

    constructor() { };

    async createCustomerServices(customer: CreateCustomerInput): Promise<InsertionResponse> {
        return new Promise<InsertionResponse>((resolve, reject) => {
            CustomerRepository.checkEmailIfExists(customer.email).then((result: boolean) => {
                if (result) {
                    reject(new UserAlreadyExistsException('Customer with this email is allready exists!'));
                } else {
                    const hashedPassword = PasswordUtility.generatePassword(customer.password);
                    const newCustomer: CreateCustomerInput = {
                        ...customer,
                        password: hashedPassword,
                        role: UserTypes.CUSTOMER
                    };
                    CustomerRepository.createCustomerRepository(newCustomer).then((result) => {
                        resolve(new InsertionResponse('Customer created succesfuly', 201, result));
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }).catch((err) => {
                resolve(err);
            });
        });
    };

    async getCustomersServices(pagination: PaginationParams): Promise<FetchResponse> {
        return new Promise<FetchResponse>((resolve, reject) => {
            CustomerRepository.getCustomersRepository(pagination).then((result) => {
                resolve(new FetchResponse('Customers fetch succesfuly', result));
            }).catch((err) => {
                reject(err);
            });
        });
    };
};

const customerServices = new CustomerServices();
export default customerServices as CustomerServices;
