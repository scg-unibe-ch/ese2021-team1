
import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { verifyToken } from '../middlewares/checkAuth';
import { upload } from '../middlewares/fileFilter';
/**
* @param userController
* @param userService
*/
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

userController.get('/', // you can add middleware on specific requests like that
    (req: Request, res: Response) => {
        userService.getAll().then(users => res.send(users)).catch(err => res.status(500).send(err));
    }
);

userController.get('/:id',
    (req: Request, res: Response) => {
        userService.getUser(req.params.id).then(user => res.send(user)).catch(err => res.status(500).send(err));
    }
);

// change the password
userController.put('/:id', (req: Request, res: Response) => {
    userService.changePassword(req.body)
        .then( changed => res.send(changed))
        .catch(err => res.send(err));
    }
);

// reset the password with the birthday
userController.patch('/', (req: Request, res: Response) => {
   userService.resetPassword(req.body.name, req.body.password, req.body.birthday)
       .then( changed => res.json(changed))
       .catch( err => res.json(err));
});

// edit personal details
userController.patch('/:id', upload.single('file'), (req: Request, res: Response) => {
    userService.editDetails(JSON.parse(req.body.profile), req.file?.filename)
        .then(changed => res.json(changed))
        .catch(err => res.json(err));
});

userController.get('/admin', (req: Request, res: Response) => {
    userService.isAdmin(req.body.id)
        .then(admin => res.send(admin))
        .catch(err => res.send(err));
});

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

userController.get('/view/:id', (req: Request, res: Response) => {
    userService.getUserView(req.params.id)
        .then(user => res.send(user))
        .catch(err => res.send(err.message));
});

export const UserController: Router = userController;
