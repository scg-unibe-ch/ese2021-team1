import express from 'express';
import { Router, Request, Response } from 'express';
import {VoteService} from '../services/vote.service';
import {PostService} from '../services/post.service';

const voteController: Router = express.Router();
const voteService = new VoteService();


voteController.post('/:id/up', (req: Request, res: Response) => {
    voteService.updateVote(Number(req.params.id), req.body, 1)
        .then(updated => {
            console.log(updated);
            res.send(updated);
        })
        .catch(err => res.send(err));
});


voteController.post('/:id/down', (req: Request, res: Response) => {
    voteService.updateVote(Number(req.params.id), req.body, -1)
        .then(updated => {
            console.log(updated);
            res.send(updated);
        })
        .catch(err => res.send(err));
});

export const VoteController: Router = voteController;
