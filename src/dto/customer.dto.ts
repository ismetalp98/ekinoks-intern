import { CustomerNoPss } from '../modals/customer.modal';

export interface CreateCustomerInput{
    name: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    role: string;
};

export interface ReturnCustomers{
    totalCount: number;
    data: CustomerNoPss[];
}

export interface CustomerLoginInput{
    email: string;
    password: string;
};

export interface CustomerLoginPayload{
    id: number;
    name: string;
    email: string;
};
