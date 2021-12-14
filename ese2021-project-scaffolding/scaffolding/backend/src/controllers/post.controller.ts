import express from 'express';
import { Router, Request, Response } from 'express';
import { upload } from '../middlewares/fileFilter';
import { PostService } from '../services/post.service';
import {VoteService} from '../services/vote.service';
import {NUMBER} from 'sequelize';

/**
* @param postController
* @param postService
* @param voteService
*/
const postController: Router = express.Router();
const postService = new PostService();
const voteService = new VoteService();

// this route is hit by the frontend when a user wants to create a new post
postController.post('/', upload.single('file'), (req: Request, res: Response) => {
    // we pass this post object to the appropriate service that we also have to create
    postService.createPost(JSON.parse(req.body.post), req.file?.filename)
        // we await the creation of the new post and send it back to the front if everything went ok
        .then(post => {
            res.json(post);
        })
        // else if something went wrong we catch it and send the appropriate feedback to the front
        .catch(err => {
            res.json(err);
        });
});

// this route is hit by the frontend on startup to fetch all posts from the database
postController.get('/:postIndex', (req: Request, res: Response) => {
    postService.getAllPosts(Number(req.params.postIndex))
        .then(posts => res.json(posts))
        .catch(err => res.json(err));
});

postController.get('/myPosts/:userId', (req: Request, res: Response) => {
    postService.getMyPosts(Number(req.params.userId))
        .then(posts => res.json(posts))
        .catch(err => res.json(err));
});

postController.get('/detail/:id', (req: Request, res: Response) => {
    postService.getPost(Number(req.params.id))
        .then(post => res.send(post))
        .catch(err => res.send(err));
});


postController.put('/:id', (req: Request, res: Response) => {
    postService.updatePost(req.params.id, req.body)
        .then(updated => res.send(updated))
        .catch(err => res.send(err));
});

postController.delete('/:id', (req: Request, res: Response) => {
    postService.deletePost(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(err => res.send(err));
});
postController.put('/:id/report', (req: Request, res: Response) => {
    postService.reportPost(Number(req.params.id))
        .then(updated => res.send(updated))
        .catch(err => res.send(err));
});
// you have to export the controller to use it in the server
export const PostController: Router = postController;
