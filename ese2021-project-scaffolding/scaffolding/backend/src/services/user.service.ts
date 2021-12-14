import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import equals = validator.equals;
import { Post } from '../models/post.model';


export class UserService {

    public async register(user: UserAttributes): Promise<UserAttributes> {
        const password = this.passwordGenerator(user.password);
        if (typeof password === 'string') {
            user.password = password;
        }
        // user already exists (email, userName)
        const userNameExists = await User.findOne({ where: { userName: user.userName }});
        const emailExists = await User.findOne({ where: { email: user.email }});
        if (userNameExists) { return Promise.reject('User name already exists.'); }
        if (emailExists) { return Promise.reject('Email address already exists.'); }
        return User.create({
            userId: null,
            userName: user.userName,
            password: user.password,
            admin: false,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            homeAddress: user.homeAddress,
            streetNumber: user.streetNumber,
            zipCode: user.zipCode,
            city: user.city,
            birthday: user.birthday,
            phoneNumber: user.phoneNumber,
            image: null
        })
            .then(inserted => {
                return Promise.resolve(inserted);
            })
            .catch(err => {
                return Promise.reject(err.message); // returns the detailed message that caused the error
            });
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = 'not_secure'; // changed for testing
        return User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        })
            .then(user => {
                if (!user || !user.userName) {
                    return Promise.reject({ message: 'Username/E-Mail not found' });
                }
                if (user.userName === 'admin') {
                    if (user.password === loginRequestee.password) {
                        const token: string = jwt.sign({ userName: user.userName, userId: user.userId, admin: user.admin }, secret, { expiresIn: '2h' });
                        return Promise.resolve({ user, token });
                    } else {
                        return Promise.reject({ message: 'Invalid Credentials.' });
                    }
                }
                if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the login request
                    const token: string = jwt.sign({ userName: user.userName, userId: user.userId, admin: user.admin }, secret, { expiresIn: '2h' });
                    return Promise.resolve({ user, token });
                } else {
                    return Promise.reject({ message: 'Invalid Credentials.' });
                }
            })
            .catch(err => {
                return Promise.reject(err.message);
            });
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }

    public getUser(id: string) {
        return User.findByPk(id);
    }

    /**
      * @param passwort string
      * @return boolean if the password is valid
      * @param sequelize
      */
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


    public async changePassword(body) {
        return User.findByPk(body.userId)
            .then(found => {
                if (found != null) {
                    const hashedPW = this.passwordGenerator(body.password);
                    if (typeof hashedPW === 'string') {
                        return found.update({ password: hashedPW })
                            .then(updated => Promise.resolve(updated))
                            .catch(() => Promise.reject('update failed'));
                    } else {
                        return Promise.reject(hashedPW); // errormessage from passwordGenerator
                    }
                } else {
                    return Promise.reject({ message: 'User not found.' });
                }
            }).catch(err => {
                return Promise.reject(err.message);
            });
    }


    private passwordGenerator(password: string) {
        const saltRounds = 12;
        switch (this.passwordCheck(password)) {
            case 1: return Promise.reject({ message: 'Doesnt contain capital/small letter' });
            case 2: return Promise.reject({ message: 'Doesnt contain number' });
            case 3: return Promise.reject({ message: 'Doesnt contain special character' });
            case 4: return Promise.reject({ message: 'Minimum of 8 characters' });
        }
        return bcrypt.hashSync(password, saltRounds);
    }

    // resets the password if entered the birthday correctly
    public async resetPassword(name: string, password: string, birthdayTest: string) {
        const hashedPW = this.passwordGenerator(password);
        if (typeof hashedPW === 'string') {
            return User.findAll({ where: { userName: name } })
                .then(user => {
                    if (equals(user[0].birthday, birthdayTest)) {
                        user[0].update({ password: hashedPW })
                            .then(updated => Promise.resolve(updated))
                            .catch(() => Promise.reject('Cant update password'));
                    }
                });
        } else {
            return Promise.reject(hashedPW);
        }
    }

    public async editDetails(body: any, path: string) {
        body.image = path;
        return User.findByPk(body.userId)
            .then(found => {
                if (found != null) {
                    return this.updateDetails(found, body)
                        .then(updated => {
                            return Promise.resolve(updated);
                        })
                        .catch((err) => {
                            return Promise.reject(err.message);
                        });
                } else {
                    return Promise.reject('Profile not found');
                }
            });
    }


    private async updateDetails(user: User, newUser: {
        userName, firstName, lastName, email, homeAddress, streetNumber,
        zipCode, city, birthday, phoneNumber, image
    }) {
        return user.update(
            {
                userName: newUser.userName,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                homeAddress: newUser.homeAddress,
                streetNumber: newUser.streetNumber,
                zipCode: newUser.zipCode,
                city: newUser.city,
                birthday: newUser.birthday,
                phoneNumber: newUser.phoneNumber,
                image: newUser.image
            }
        )
            .then(updated => {
                return Promise.resolve(updated);
            })
            .catch(() => {
                return Promise.reject('update failed');
            });
    }

    public async isAdmin(id: number) {
        return User.findByPk(id)
            .then(found => {
                if (found != null) {
                    return Promise.resolve(found.admin);
                } else {
                    return Promise.reject(found);
                }
            })
            .catch(() => Promise.reject('Cant find user'));
    }

    public async getUploads(userId: number) {
        return User.findByPk(userId)
            .then(found => {
                if (found != null) {
                    return Promise.resolve(this.countUploads(found));
                } else {
                    return Promise.reject('User not found');
                }
            })
            .catch(() => Promise.reject('Cant get uploads'));
    }

    public async getUpvotes(userId: number) {
        return User.findByPk(userId)
            .then(found => {
                if (found != null) {
                    return Promise.resolve(this.countUpvotes(found));
                } else {
                    return Promise.reject('User not found');
                }
            })
            .catch(() => Promise.reject('Cant get Upvotes'));
    }

    private async countUploads(user: User) {
        return Post.findAll({ where: { userName: user.userName } })
            .then(found => {
                if (found != null) {
                    return Promise.resolve(found.length);
                } else {
                    return Promise.resolve(0);
                }
            })
            .catch(() => Promise.reject('Post not found'));
    }

    private async countUpvotes(user: User) {
        let upvotes = 0;
        return Post.findAll({ where: { userName: user.userName } })
            .then(found => {
                if (found != null) {
                    for (let posts = 0; posts < found.length; posts++) {
                        upvotes += found[posts].like;
                    }
                    return Promise.resolve(upvotes);
                } else {
                    return Promise.reject('Post not found');
                }
            })
            .catch(() => Promise.reject('Cant count Upvotes'));
    }

    public async getUserView(userId: string | number) {
        const found = await User.findOne({
            where: {
            userId: userId
            }, attributes: ['userName', 'image']
        });
        console.log(found);
        if (found) { return Promise.resolve(found); }
        return Promise.reject('Could not fetch user view.');
    }
}
