export interface Vendor {
    id: number;
    name: string;
    owner_name: string;
    pin_code: number;
    address: string;
    phone: string;
    email: string;
    password: string;
    role: string;
};

export interface VendorNoPss {
    id: number;
    name: string;
    owner_name: string;
    pin_code: number;
    address: string;
    phone: string;
    email: string;
    role: string;
};
