import express, { Application , Request, Response } from 'express';
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
import {AdminController} from './controllers/admin.controller';
import {ItemImage} from './models/itemImage.model';
import { PostController } from './controllers/post.controller';
import {Orders} from './models/orders.model';
import {Product} from './models/product.model';
import {ProductController} from './controllers/product.controller';
import {OrderController} from './controllers/order.controller';
import {Vote} from './models/vote.model';
import {VoteController} from './controllers/vote.controller';

export class Server {
/**
  * @param server
  * @param sequelize
  * @param processingStatus
  */

    private server: Application;
    private sequelize: Sequelize;
    private port = process.env.PORT || 3000;

    constructor() {
        this.server = this.configureServer();
        this.sequelize = this.configureSequelize();
        Vote.initialize(this.sequelize);
        Post.initialize(this.sequelize); // create the new table! // step 1
        TodoItem.initialize(this.sequelize); // creates the tables if they dont exist
        TodoList.initialize(this.sequelize);
        User.initialize(this.sequelize);
        ItemImage.initialize(this.sequelize);
        Product.initialize(this.sequelize);
        Orders.initialize(this.sequelize);
        TodoItem.createAssociations();
        TodoList.createAssociations();
        ItemImage.createAssociations();




        this.sequelize.sync().then(() => {                           // create connection to the database
            this.server.listen(this.port, () => {                                   // start server on specified port
                console.log(`server listening at http://localhost:${this.port}`);   // indicate that the server has started
            });
        });
    }

    private configureServer(): Application {
        // options for cors middleware
        const options: cors.CorsOptions = {
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE,SEARCH',
            origin: `http://localhost:${this.port}`,
            preflightContinue: false,
        };

        return express()
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
            .use('/product', ProductController)
            .use('/orders', OrderController)
            .use('/vote', VoteController)
            .options('*', cors(options))
            .use('/uploads', express.static(__dirname + '/uploads'))
            // this is the message you get if you open http://localhost:3000/ when the server is running
            .get('/', (req, res) => res.send('<h1>Welcome to the ESE-2021 Backend Scaffolding <span style="font-size:50px">&#127881;</span></h1>'));
    }
 /**
   * @param server
   * @param sequelize
   * @param processingStatus
   * @return initialisation of database
     */
    private configureSequelize(): Sequelize {
        return new Sequelize({
            dialect: 'sqlite',
            storage: 'db.sqlite',
            logging: false // can be set to true for debugging
        });
    }
}

const server = new Server(); // starts the server
const fs = require('fs');
const dir = './build/uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
