import { VendorNoPss } from '../modals/vendor.modal';

export interface CreateVendorInput {
    name: string;
    owner_name: string;
    pin_code: number;
    address: string;
    phone: string;
    email: string;
    password: string;
    role: string;
};

export interface ReturnVendors {
    totalCount: number;
    data: VendorNoPss[];
}

export interface VendorLoginPayload {
    id: number;
    name: string;
    email: string;
};

export interface VendorLoginInput {
    email: string;
    password: string;
};

export interface VendorFilterInputs {
    name: string | undefined;
    owner_name: string | undefined;
    pin_code: number | undefined;
    address: string | undefined;
    phone: string | undefined;
    email: string | undefined;
};