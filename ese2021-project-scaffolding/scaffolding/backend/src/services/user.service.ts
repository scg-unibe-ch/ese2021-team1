import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const password = this.passwordGenerator(user.password);
        if (typeof password === 'string') {
            user.password = password;
        }
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => {
            return Promise.reject(err.errors[0].message); // returns the detailed message that caused the error
        });
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        })
        .then(user => {
            if (!user || !user.userName) {
                return Promise.reject({message: 'Username/E-Mail not found '});
            }
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the login request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId, admin: user.admin }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'A wrong Password' });
            }
        })
        .catch(err => {
            return Promise.reject(err.message);
        });
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }

    private passwordCheck(password: string): number {
        const capital_small = new RegExp('^(?=.*[a-z])(?=.*[A-Z])+$');
        const number = new RegExp('^(?=.*\\d)+$');
        const specialCharacter = new RegExp('^(?=.*[-+_!@#$%^&*.,?])+$');
        const minimum = password.length >= 8;
        if (capital_small.test(password)) {
            return 1;
        } else if (number.test(password)) {
            return 2;
        } else if (specialCharacter.test(password)) {
            return 3;
        } else if (!minimum) {
            return 4;
        }
        return 0;
    }

    public async changePassword (body) {
        return User.findByPk(body.userId)
            .then(found => {
                if (found != null) {
                    this.updatePassword(body.userId, body.password);
                } else {
                    return Promise.reject({ message: 'User not found.'});
                }
            }).catch(err => {
                return Promise.reject(err.message);
            });
    }

    private async updatePassword(user: User, newUnhashedPassword: string) {
        const hashedPW = this.passwordGenerator(newUnhashedPassword);
        if (typeof hashedPW === 'string') {
            return user.update({password: hashedPW})
                .then(updated => Promise.resolve(updated))
                .catch(() => Promise.reject('update failed'));
        } else {
            return Promise.reject(hashedPW); // errormessage from passwordGenerator
        }
    }

    private passwordGenerator (password: string) {
         const saltRounds = 12;
         switch (this.passwordCheck(password)) {
             case 1 : return Promise.reject({message: 'Doesnt contain capital/small letter'});
             case 2 : return Promise.reject({message: 'Doesnt contain number'});
             case 3 : return Promise.reject({message: 'Doesnt contain special character'});
             case 4 : return Promise.reject({message: 'Minimum of 8 characters'});
         }
         return bcrypt.hashSync(password, saltRounds);
     }
}
