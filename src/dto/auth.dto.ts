import { CustomerLoginPayload } from './customer.dto';
import { VendorLoginPayload } from './vendor.dto';

interface Payloads {
    payload: CustomerLoginPayload | VendorLoginPayload;
    role: string;
}

export interface LoginInput {
    email: string;
    password: string;
};

export type AuthPayload = Payloads;