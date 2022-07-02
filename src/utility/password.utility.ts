import bcrypt from 'bcrypt';

export class PasswordUtility {
    public static generatePassword (password: string) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    };

    public static comparePassword(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    };
};
