import express from 'express';
import { Router, Request, Response } from 'express';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import {MulterRequest} from '../models/multerRequest.model';




const posterController: Router = express.Router();
const postService = new PostService();


posterController.post('/', (req: Request, res: Response) => {
    Post.create(req.body)
        .then(inserted => res.send(inserted))
        .catch(err => res.status(500).send(err));
});

posterController.post('/:id/post', (req: MulterRequest, res: Response) => {
    postService.addImage(req)
        .then(created => res.send(created))
        .catch(err => res.status(500).send(err));
});

posterController.get('/', (req: Request, res: Response) => {
    postService.getAllPosts()
        .then(allPost => res.send(allPost))
        .catch(err => res.status(500).send(err));
});

posterController.put('/:id/post', (req: Request, res: Response) => {
        Post.findByPk(req.params.id)
            .then(found => {
                if (found != null) {
                    found.update(req.body).then(updated => {
                        res.status(200).send(updated);
                    });
                } else {
                    res.sendStatus(404);
                }
            })
            .catch(err => res.status(500).send(err));
});

posterController.delete('/:id', (req: Request, res: Response) => {
    Post.findByPk(req.params.id)
        .then(found => {
            if (found != null) {
                found.destroy().then(() => res.status(200).send());
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => res.status(500).send(err));
});
