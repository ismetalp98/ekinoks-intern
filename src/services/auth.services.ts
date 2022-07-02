import { InvalidCredentialsException } from '../common/errorHandler';
import { LoginResponse } from '../common/responseHandler';
import { AuthPayload, LoginInput } from '../dto/auth.dto';
import { PasswordUtility } from '../utility/password.utility';
import { AuthUtilities } from '../utility/auth.utility';
import AuthRepository from '../repository/auth.repository';

export class VendorServices {

    constructor() { };

    async loginServices(user: LoginInput): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            AuthRepository.getUserByEmailRepository(user.email).then((result: any) => {
                if (PasswordUtility.comparePassword(user.password, result.password)) {
                    const payload: AuthPayload = {
                        payload: {
                            id: result.id,
                            email: result.email,
                            name: result.name,
                        },
                        role: result.role
                    };
                    
                    const signature = AuthUtilities.generateSignature(payload);
                    resolve(new LoginResponse(`${result.role} logged in succesfuly`, 200, signature));
                } else {
                    reject(new InvalidCredentialsException());
                }
            }).catch((err: any) => {
                reject(err);
            })
        });
    };
};

const VendorServicesInstance = new VendorServices();
export default VendorServicesInstance as VendorServices;

