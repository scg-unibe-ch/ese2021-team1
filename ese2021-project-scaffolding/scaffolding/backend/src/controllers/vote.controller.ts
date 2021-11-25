import express from 'express';
import { Router, Request, Response } from 'express';
import {VoteService} from '../services/vote.service';
import {PostService} from '../services/post.service';

const voteController: Router = express.Router();
const voteService = new VoteService();


voteController.subscribe('/:id/post', (req: Request, res: Response) => {
    voteService.updateVote(req.body, 1)
        .then(updated => {
            console.log(updated);
            res.send(updated);
        })
        .catch(err => res.send(err));
});


voteController.unsubscribe('/:id/post', (req: Request, res: Response) => {
    voteService.updateVote(req.body, -1)
        .then(updated => {
            console.log(updated);
            res.send(updated);
        })
        .catch(err => res.send(err));
});

export const VoteController: Router = voteController;
