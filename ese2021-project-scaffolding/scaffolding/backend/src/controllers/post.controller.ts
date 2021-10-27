import express from 'express';
import { Router, Request, Response } from 'express';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import {MulterRequest} from '../models/multerRequest.model';

const postController: Router = express.Router();
const postService = new PostService();

postController.post('/', (req: Request, res: Response) => {
    console.log(req.body); // this object contains the new post that the frontend sent us
    // then we process to pass this post object to the appropriate service that we also have to create
    postService.createPost(req.body)
        // we await the creation of the new post and send it back if everything went ok
        .then(post => res.json(post))
        // else if something went wrong we catch it and send the appropriate feedback to the front
        .catch(err => res.json(err.message));
    //     .then(inserted => res.send(inserted))
    //     .catch(err => res.status(500).send(err));
});

// postController.post('/:id/post', (req: MulterRequest, res: Response) => {
//     postService.addImage(req)
//         .then(created => res.send(created))
//         .catch(err => res.status(500).send(err));
// });

// postController.get('/', (req: Request, res: Response) => {
//     postService.getAllPosts()
//         .then(allPost => res.send(allPost))
//         .catch(err => res.status(500).send(err));
// });

// postController.put('/:id/post', (req: Request, res: Response) => {
//         Post.findByPk(req.params.id)
//             .then(found => {
//                 if (found != null) {
//                     found.update(req.body).then(updated => {
//                         res.status(200).send(updated);
//                     });
//                 } else {
//                     res.sendStatus(404);
//                 }
//             })
//             .catch(err => res.status(500).send(err));
// });

// postController.delete('/:id', (req: Request, res: Response) => {
//     Post.findByPk(req.params.id)
//         .then(found => {
//             if (found != null) {
//                 found.destroy().then(() => res.status(200).send());
//             } else {
//                 res.sendStatus(404);
//             }
//         })
//         .catch(err => res.status(500).send(err));
// });

// you have to export the controller to use it in the server
export const PostController: Router = postController;
