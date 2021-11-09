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
    //     .then(inserted => res.send(inserted))
    //     .catch(err => res.status(500).send(err));
});

// postController.post('/:id/post', (req: MulterRequest, res: Response) => {
//     postService.addImage(req)
//         .then(created => res.send(created))
//         .catch(err => res.status(500).send(err));
// });

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
// postController.put('/:id', (req: Request, res: Response) => {
//     postService.updatePost({id: req.params.id, data: req.body})
//         .then(post => res.json(post))
//         .catch(err => res.json(err));
        // Post.findByPk(req.params.id)
        //     .then(found => {
        //         if (found != null) {
        //             found.update(req.body).then(updated => {
        //                 res.status(200).send(updated);
        //             });
        //         } else {
        //             res.sendStatus(404);
        //         }
        //     })
        //     .catch(err => res.status(500).send(err));
// });

// postController.delete('/:id', (req: Request, res: Response) => {
//     postService.deletePost(req.params.id)
//         .then(result => res.json(result))
//         .catch(err => res.json(err));
    // Post.findByPk(req.params.id)
    //     .then(found => {
    //         if (found != null) {
    //             found.destroy().then(() => res.status(200).send());
    //         } else {
    //             res.sendStatus(404);
    //         }
    //     })
    //     .catch(err => res.status(500).send(err));
// });

// you have to export the controller to use it in the server
export const PostController: Router = postController;
