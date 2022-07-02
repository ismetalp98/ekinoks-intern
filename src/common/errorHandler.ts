export class HttpException extends Error {
    message: string;
    status: number;
    constructor(message: string, status: number) {
        super();
        this.message = message;
        this.status = status;
    };
};

export class GenericException extends HttpException {
    constructor(message: string) {
        super(message || 'Internal error!', 500);
    };
}

export class UserNotFoundException extends HttpException {
    constructor(message?: string) {
        const errorMessage = message ? message : 'User not found';
        super(errorMessage, 404);
    };
};

export class NoRecordFoundException extends HttpException {
    constructor(message?: string) {
        const errorMessage = message ? message : 'No record found!';
        super(errorMessage, 404);
    };
};

export class UserAlreadyExistsException extends HttpException {
    constructor(message?: string) {
        const errorMessage = message ? message : 'User already exists';
        super(errorMessage, 409);
    };
};

export class InvalidCredentialsException extends HttpException {
    constructor(message?: string) {
        const errorMessage = message ? message : 'Invalid credentials!';
        super(errorMessage, 400);
    };
};

export class WrongInputFormatException extends HttpException {
    constructor(message?: string) {
        const errorMessage = message ? message : 'Wrong input format!';
        super(errorMessage, 400);
    };
};

export class PermissionException extends HttpException {
    constructor(message?: string) {
        const errorMessage = message ? message : 'You are not authorized to perform this action!';
        super(errorMessage, 500);
    };
};
