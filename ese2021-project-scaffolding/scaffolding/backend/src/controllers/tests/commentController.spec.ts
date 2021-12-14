import chaiHttp from 'chai-http';
import {before, describe} from 'mocha';
import {server, testingMode} from '../../server';
import {UserAttributes} from '../../models/user.model';
import chai from 'chai';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

// NEEDED TO AVOID RACING CONDITIONS BETWEEN SEQUELIZE AND MOCHA/CHAI
before(done => {
    // @ts-ignore
    testingMode = true;
    server.on('serverStarted', () => {
        done();
    });
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
    chai.request(server).post('/user/register')
        .send(user);
    const post = {
        title: 'Test',
        content: 'TestTest',
        labels: 'TestLabel',
        userName: 'TestUser',
        userID: 1
    };
    chai.request(server).post('/post')
        .send(post);
});


describe('Comment Controller', () => {
    const port = '/comment/2';

    it('Create a Comment', async () => {
        const post = {
            postID: 1,
            text: 'this is a comment',
            userID: 2
        };
       return chai.request(server).post(port)
           .send(post)
           .then(res => {
               chai.expect(res.body.text).to.eql('this is a comment');
           });
    });

    it('fetch the comments', async () => {
        const user = {
            id: 1
        };
        return chai.request(server).get('/comment/1')
            .send(user)
            .then(res => {
                chai.expect(res.body.length).to.eql(1);
            });
    });
});
