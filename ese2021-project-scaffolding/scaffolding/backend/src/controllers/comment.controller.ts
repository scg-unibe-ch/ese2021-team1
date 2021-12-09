import express, {Request, Response, Router} from 'express';
import {CommentService} from '../services/comment.service';


const commentController: Router = express.Router();
const commentService = new CommentService();

commentController.post('/:id', (req: Request, res: Response) => {
    commentService.commentCreate(req.body.postID, req.body.text)
        .then(updated => res.send(updated))
        .catch(err => res.send(err));
});
/*
commentController.get('/3/:post', (req: Request, res: Response) => {
    commentService.get3Comments(req.body.id)
        .then(updated => res.send(updated))
        .catch(err => res.send(err));
});
*/
commentController.get('/:id', (req: Request, res: Response) => {
    console.log(req);
    commentService.getAllComments(Number(req.params.id))
        .then(updated => {
            console.log(updated);
            res.send(updated);
        })
        .catch(err => res.send(err));
});

export const CommentController: Router = commentController;
