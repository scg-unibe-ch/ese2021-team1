import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ifError} from "assert";

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        switch (this.passwordCheck(user.password)) {
            case 1 : return Promise.reject({message: 'Doesnt contain capital/small letter'});
            case 2 : return Promise.reject({message: 'Doesnt contain number'});
            case 3 : return Promise.reject({message: 'Doesnt contain special character'});
            case 4 : return Promise.reject({message: 'Minimum of 8 characters'});
        }
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        })
        .then(user => {
            if (user.userName === null) {
                return Promise.reject({message: 'Username/E-Mail not found '});
            }
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the login request
                const token: string = jwt.sign({ userName: user.userName, userId: user.userId, admin: user.admin }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'A wrong Password' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }

    private passwordCheck(password: string): number {
        const capital_small = new RegExp('^(?=.*[a-z])(?=.*[A-Z])+$');
        const number = new RegExp('^(?=.*\\d)+$');
        const specialCharacter = new RegExp('^(?=.*[-+_!@#$%^&*.,?])+$');
        const minimum = new RegExp('^(.{8,25})+$');
        if (capital_small.test(password)) {
            return 1;
        } else if (number.test(password)) {
            return 2;
        } else if (specialCharacter.test(password)) {
            return 3;
        } else if (minimum.test(password)) {
            return 4;
        }
        return 0;
    }
}
