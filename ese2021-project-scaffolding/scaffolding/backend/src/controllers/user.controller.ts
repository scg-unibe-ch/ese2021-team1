
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';

const userController: Router = express.Router();
const userService = new UserService();

userController.post('/register',
    (req: Request, res: Response) => {
        userService.register(req.body).then(registered => res.send(registered)).catch(err => res.json(err));
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        userService.login(req.body).then(login => res.send(login)).catch(err => res.json(err));
    }
);

userController.get('/', verifyToken, // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

userController.get('/:uploads', (req: Request, res: Response) => {
    userService.getUploads(req.body.id)
        .then(uploads => res.send(uploads))
        .catch(err => res.send(err));
});

userController.get('/:upvotes', (req: Request, res: Response) => {
    userService.getUpvotes(req.body.id)
        .then(upvotes => res.send(upvotes))
        .catch(err => res.send(err));
});

export const UserController: Router = userController;
