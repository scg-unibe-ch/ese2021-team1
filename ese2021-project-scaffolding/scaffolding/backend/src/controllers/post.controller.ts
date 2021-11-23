import express from 'express';
import { Router, Request, Response } from 'express';
import { PostService } from '../services/post.service';

const postController: Router = express.Router();
const postService = new PostService();

// this route is hit by the frontend when a user wants to create a new post
postController.post('/', (req: Request, res: Response) => {
    console.log(req.body); // this object contains the new post that the frontend sent us
    // we pass this post object to the appropriate service that we also have to create
    postService.createPost(req.body)
        // we await the creation of the new post and send it back to the front if everything went ok
        .then(post => res.json(post))
        // else if something went wrong we catch it and send the appropriate feedback to the front
        .catch(err => res.json(err));
});


// this route is hit by the frontend on startup to fetch all posts from the database
postController.get('/', (req: Request, res: Response) => {
    postService.getAllPosts()
        .then(posts => res.json(posts))
        .catch(err => res.json(err));
});


postController.put('/:id', (req: Request, res: Response) => {
   postService.updatePost(req.params.id, req.body)
       .then(updated => res.send(updated))
       .catch(err => res.send(err));
});

postController.delete('/:id', (req: Request, res: Response) => {
    postService.deletePost(req.params.id)
        .then(updated => res.send(updated))
        .catch(err => res.send(err));
});

postController.search('/', (req: Request, res: Response) => {
    postService.searchForCategorys(req.body)
        .then(updated => res.send(updated))
        .catch(err => res.send(err));
});

// TODO: addImage controller
// TODO: search for category -> done?

// you have to export the controller to use it in the server
export const PostController: Router = postController;
