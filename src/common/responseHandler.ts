export class HttpResponse {
    message: string;
    status: number;
    data: any;
    constructor(message: string, status: number, data?: any) {
        this.message = message;
        this.status = status;
        this.data = data;
    };
};

export class FetchResponse extends HttpResponse {
    constructor(message: string, data: any, status?: number) {
        super(message, status || 200, data);
    };
};

export class InsertionResponse extends HttpResponse {
    constructor(message: string, status: number, data: any) {
        super(message, status, data);
    };
};

export class DeleteResponse extends HttpResponse {
    constructor(message: string, data: any) {
        super(message, 200, data);
    };
};

export class LoginResponse extends HttpResponse {
    constructor(message: string, status: number, data: any) {
        super(message, status, data);
    };
};
