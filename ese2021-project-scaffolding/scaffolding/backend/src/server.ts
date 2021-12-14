import express from 'express';
import morgan from 'morgan';
import { UserController } from './controllers/user.controller';
import { SecuredController } from './controllers/secured.controller';
import { Sequelize } from 'sequelize';
import { User } from './models/user.model';
import { Post } from './models/post.model';

import cors from 'cors';
import { AdminController } from './controllers/admin.controller';
import { PostController } from './controllers/post.controller';
import { Orders } from './models/orders.model';
import { Product } from './models/product.model';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';
import { Vote } from './models/vote.model';
import { VoteController } from './controllers/vote.controller';
import { Comment } from './models/comment.model';
import { CommentController } from './controllers/comment.controller';
import {PReview} from './models/p_review.model';
import {ReviewController} from './controllers/p_review.controller';

// enable if in testing mode
export let testingMode = false;
export let listener: any = null;

export const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: testingMode ? 'db_test.sqlite' : 'db.sqlite',
    logging: false // can be set to true for debugging
});

const port = process.env.PORT || 3000;

Vote.initialize(sequelize);
Post.initialize(sequelize); // create the new table! // step 1
User.initialize(sequelize);
Product.initialize(sequelize);
Orders.initialize(sequelize);
Comment.initialize(sequelize);
PReview.initialize(sequelize);

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE,SEARCH,SUBSCRIBE,UNSUBSCRIBE,RESET,EDIT,COMMENT',
    origin: `http://localhost:${port}`,
    preflightContinue: false,
};

sequelize.sync({ force: false }).then(async () => {
    const fs = require('fs');
    const dir = './build/uploads';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    // set default image for default posts
    const oldPath = './src/public/images/default_bitcoin.jpg';
    const newPath = './build/uploads/default_bitcoin.jpg';
    fs.copyFile(oldPath, newPath, error => {
        if (error) { // noop
            console.log(error.message);
        }
    });
    listener = server.listen(port, async () => {
        const pass = 'Admin123!';
        const name = 'admin';
        const adminExists = await User.findOne({ where: { userName: name }});
        if (!adminExists) {
            await User.create({
                userId: null,
                userName: name,
                password: pass,
                admin: true,
                firstName: 'Admin',
                lastName: 'Admin',
                email: 'admin@gmail.com',
                homeAddress: 'Irgendwostrasse',
                streetNumber: 1,
                zipCode: 1001,
                city: 'Bern',
                birthday: '12.12.1990',
                phoneNumber: '0765840666',
                image: 'default_bitcoin.jpg'
            });
        }

        const getRandCategory = (index: number) => {
            const res = index % 4;
            switch (res) {
                case 1:
                    return 'Ethereum';
                case 2:
                    return 'Cardano';
                case 3:
                    return 'Polkadot';
                default:
                    return 'Bitcoin';
            }
        };

        for (let i = 0; i < 12; i++) {
            Post.create({
                id: null,
                userName: 'admin',
                title: 'Post ' + i,
                text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
                like: i % 5,
                dislike: i % 2,
                communityScore: i % 22,
                image: 'default_bitcoin.jpg',
                userID: 1,
                category: getRandCategory(i),
                reported: i % 1
            });
        }
        server.emit('serverStarted');
        console.log(`server listening at http://localhost:${port}`);   // indicate that the server has started
    });
});
export const server = express()
    .use(cors())
    .use(express.json())                    // parses an incoming json to an object
    .use(morgan('tiny'))                    // logs incoming requests
    .use(morgan('dev'))
    .use('/user', UserController)
    .use('/secured', SecuredController)
    .use('/admin', AdminController)
    // first of all you have to set the new port here
    .use('/post', PostController) // step 2 / insert new controller
    .use('/comment', CommentController)
    .use('/product', ProductController)
    .use('/orders', OrderController)
    .use('/vote', VoteController)
    .use('/review', ReviewController)
    .options('*', cors(options))
    .use('/uploads', express.static(__dirname + '/uploads'))
    // this is the message you get if you open http://localhost:3000/ when the server is running
    .get('/', (req, res) => res.send('<h1>Welcome to Jan and Alessios domain <span style="font-size:50px">&#128525;</span></h1>'));
