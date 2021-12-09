import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import { TodoItemController } from './controllers/todoitem.controller';
import { TodoListController } from './controllers/todolist.controller';
import { UserController } from './controllers/user.controller';
import { SecuredController } from './controllers/secured.controller';
import { Sequelize } from 'sequelize';
import { TodoList } from './models/todolist.model';
import { TodoItem } from './models/todoitem.model';
import { User } from './models/user.model';
import { Post } from './models/post.model';


import cors from 'cors';
import { AdminController } from './controllers/admin.controller';
import { ItemImage } from './models/itemImage.model';
import { PostController } from './controllers/post.controller';
import { Orders } from './models/orders.model';
import { Product } from './models/product.model';
import { ProductController } from './controllers/product.controller';
import { OrderController } from './controllers/order.controller';
import { Vote } from './models/vote.model';
import { VoteController } from './controllers/vote.controller';
import { Comment } from './models/comment.model';
import { CommentController } from './controllers/comment.controller';
const sequelize: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: false // can be set to true for debugging
});
const port = process.env.PORT || 3000;
Vote.initialize(sequelize);
Post.initialize(sequelize); // create the new table! // step 1
TodoItem.initialize(sequelize); // creates the tables if they dont exist
TodoList.initialize(sequelize);
User.initialize(sequelize);
ItemImage.initialize(sequelize);
Product.initialize(sequelize);
Orders.initialize(sequelize);
Comment.initialize(sequelize);
TodoItem.createAssociations();
TodoList.createAssociations();
ItemImage.createAssociations();
const fs = require('fs');
const dir = './build/uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const pass = 'Admin123!';
const name = 'admin';
User.create({
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
    phoneNumber: '0765840666'
}).then(() => {
    // console.log('Created admin user.');
}).catch(() => {
    // console.log('Admin user already in database');
}).finally(() => {
    // console.log('username:', name, ' password: ', pass);
});

sequelize.sync().then(() => {                           // create connection to the database
    if (require.main === module) {
        server.listen(port, () => {                                   // start server on specified port
            console.log(`server listening at http://localhost:${port}`);   // indicate that the server has started
        });
    }
});
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
export const server = express()
    .use(cors())
    .use(express.json())                    // parses an incoming json to an object
    .use(morgan('tiny'))                    // logs incoming requests
    .use(morgan('dev'))
    .use('/todoitem', TodoItemController)   // any request on this path is forwarded to the TodoItemController
    .use('/todolist', TodoListController)
    .use('/user', UserController)
    .use('/secured', SecuredController)
    .use('/admin', AdminController)
    // first of all you have to set the new port here
    .use('/post', PostController) // step 2 / insert new controller
    .use('/comment', CommentController)
    .use('/product', ProductController)
    .use('/orders', OrderController)
    .use('/vote', VoteController)
    .options('*', cors(options))
    .use('/uploads', express.static(__dirname + '/uploads'))
    // this is the message you get if you open http://localhost:3000/ when the server is running
    .get('/', (req, res) => res.send('<h1>Welcome to Jan and Alessios domain <span style="font-size:50px">&#128525;</span></h1>'));


