import {server, testingMode} from '../../server';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { before, describe } from 'mocha';
import {User, UserAttributes} from '../../models/user.model';
import {OrderAttributes} from '../../models/orders.model';



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

describe('Order Controller', () => {
   const port = '/orders';
   it('Create a order and returns it', async () => {
       const order = {
           userID: 1,
           city: 'TestCity',
           homeAddress: 'TestHome',
           orderId: 0,
           paymentMethod: 'PayPal',
           processingStatus: 'open',
           productIds: '1',
           products: '1',
           purchaseDate: '14.12.2021',
           streetNumber: 1,
           subtotal: 10,
           userId: 1,
           zipCode: 1111
       };
       return chai.request(server).post(port)
           .send(order)
           .then(res => {
               chai.expect(res.body.subtotal).to.eql(10);
           });
   });
});
