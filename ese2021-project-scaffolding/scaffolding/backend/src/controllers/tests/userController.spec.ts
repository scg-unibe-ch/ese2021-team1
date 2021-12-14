import {server, testingMode} from '../../server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { before, describe } from 'mocha';
import {User, UserAttributes} from '../../models/user.model';



chai.use(chaiHttp);
const expect = chai.expect;

// NEEDED TO AVOID RACING CONDITIONS BETWEEN SEQUELIZE AND MOCHA/CHAI
before(done => {
    // @ts-ignore
    testingMode = true;
    server.on('serverStarted', () => {
        done();
    });
});

// COMPLETE TEST FOR USER_CONTROLLER/LOGIN
describe('User Controller', () => {
    let port = '/user/login';
    it('Login endpoint returns admin data', async () => {
        return chai.request(server).post(port)
            .send({ userName: 'admin', password: 'Admin123!' })
            .then(res => {
                chai.expect(res.body.user.email).to.eql('admin@gmail.com');
            });
    });
    it('Login endpoint returns wrong password feedback', async () => {
        return chai.request(server).post(port)
            .send({ userName: 'admin', password: 'WrongPass' })
            .then(res => {
                chai.expect(res.body).to.eql('Invalid Credentials.');
            });
    });
    it('Login endpoint should return user not found feedback', async () => {
        return chai.request(server).post(port)
            .send({ userName: 'iDoNotExist', password: 'whatever' })
            .then(res => {
                chai.expect(res.body).to.eql('Username/E-Mail not found');
        });
    });
    it('Register endpoint should return new user', async () => {
        port = '/user/register';
        const user: UserAttributes = {
            firstName: 'Test',
            lastName: 'User',
            email: 'testUser@gmail.com',
            homeAddress: 'testhome',
            streetNumber: 1,
            zipCode: 1122,
            city: 'testtest',
            birthday: '11.11.1111',
            phoneNumber: '0765840677',
            userId: 999,
            userName: 'TestUser',
            password: 'TestUser123!',
            admin: false,
            image: null
        };
        return chai.request(server).post(port)
            .send(user)
            .then(res => {
                console.log(res.body);
                chai.expect(res.body.email).to.eql('testUser@gmail.com');
            });
    });
    it('Existing Username should be already in the system', async () => {
        port = '/user/register';
        const userAdmin: UserAttributes = {
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@gmail.com',
            homeAddress: 'Irgendwostrasse',
            streetNumber: 1,
            zipCode: 1001,
            city: 'Bern',
            birthday: '12.12.1990',
            phoneNumber: '0765840666',
            userId: 9999,
            userName: 'admin',
            password: 'Admin123!',
            admin: true,
            image: null
        };
        return chai.request(server).post(port)
            .send(userAdmin)
            .then(res => {
                console.log(res.body);
                chai.expect(res.body).to.eql('User name already exists.');
            });
    });
    it('Existing Email should alread be in the system', async () => {
        port = '/user/register';
        const userAdmin: UserAttributes = {
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@gmail.com',
            homeAddress: 'Irgendwostrasse',
            streetNumber: 1,
            zipCode: 1001,
            city: 'Bern',
            birthday: '12.12.1990',
            phoneNumber: '0765840666',
            userId: 9999,
            userName: 'adminTwo',
            password: 'Admin123!',
            admin: true,
            image: null
        };
        return chai.request(server).post(port)
            .send(userAdmin)
            .then(res => {
                chai.expect(res.body).to.eql('Email address already exists.');
            });
    });
    it('Returns a user from the databank', async () => {
        port = '/user/1';
        const id = {
            id: 1
        };
        return chai.request(server).get('/user/1')
            .send(id)
            .then(res => {
                chai.expect(res.body.userId).to.eql(1);
            });
    });
    it('Change the password', async () => {
        port = '/user/1';

        const password = {
            userId: 1,
            password: 'Test12345!'
        };
        return chai.request(server).put('/user/1')
            .send(password)
            .then(res => {
                chai.expect(res.body.userId).to.eql(1);
            });
    });
    it('Fetch how many uploads a user has', async () => {
        port = '/user/profile';
        const user = {
            id: 1
        };
        return chai.request(server).get('/user/profile')
            .send(user)
            .then(res => {
                console.log(res.body);
                chai.expect(res.body).to.eql({});
            });
    });
});

