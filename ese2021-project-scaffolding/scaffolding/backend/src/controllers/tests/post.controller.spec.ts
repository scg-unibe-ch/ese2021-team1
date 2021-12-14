import {server, testingMode} from '../../server';
import chai, {assert} from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import {afterEach, before, describe} from 'mocha';
import {Post, PostAttributes} from '../../models/post.model';
import {User} from '../../models/user.model';

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
/*
afterEach(done => {
    const fs = require('fs');
    const filePath = './scaffolding/backend/db_test.sqlite';
    if (filePath != null) {
        fs.unlinkSync(filePath);
    }
    done();
});

 */
describe(' Post Controller', () => {
    let port = '/post';
    it('should create a Post and return it', async () => {

        const post = {
            title: 'Test',
            text: 'Test Text',
            category: 'Bitcoin',
            userName: 'TestUser',
            userID: 1
        };
        const payload = new FormData();
        payload.append('post', JSON.stringify(this.newPost));
        payload.append('file', this.selectedFile);

        return chai.request(server)
            .post(port)
            .send(post)
            .then(res => {
                chai.expect(res.body.title).to.eqls('Test');
                chai.expect(res.body.text).to.eql('Test Text');
                chai.expect(res.body.category).to.eql('Bitcoin');
            });
    });

    it('should update a post and return it', async () => {
        port += '/0';
        const newPost = {
            postId: 0,
            title: 'newTest',
            text: 'newTestText'
        };
        return chai.request(server)
            .post(port)
            .send(newPost)
            .then(res => {
                chai.expect(res.body.postId).to.eqls(0);
                chai.expect(res.body.title).to.eqls('newTest');
                chai.expect(res.body.text).to.eql('newTestText');
            });
    });
        it('gets Posts and returns them', async () => {
            port = '/post/2';
            return chai.request(server).get(port)
                .send('2')
                .then(res => {
                    chai.expect(res.body.length).to.equal(1);
                });

        });
        it('trys to get posts and should return no posts message', async () => {
            port = 'post/2';
            return chai.request(server)
                .get(port)
                .then(res => {
                    console.log(res.body);
                    chai.expect(res.body).to.eql('No posts available.');
                });
        });
});
