import { server } from '../../server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { before, describe } from 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

// COMPLETE TEST FOR USER_CONTROLLER/LOGIN
describe('User Controller', () => {
    const port = "/user/login"
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
    it("Login endpoint should return user not found feedback", async () => {
        return chai.request(server).post(port)
            .send({ userName: "iDoNotExist", password: "whatever" })
            .then(res => {
                chai.expect(res.body).to.eql("Username/E-Mail not found")
        })
    })
});

