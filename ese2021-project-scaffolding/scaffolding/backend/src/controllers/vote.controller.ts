import express from 'express';
import { Router, Request, Response } from 'express';
import {VoteService} from '../services/vote.service';
import {PostService} from '../services/post.service';
/**
* @param voteController
* @param voteService
*/
const voteController: Router = express.Router();
const voteService = new VoteService();


voteController.post('/:id/up', (req: Request, res: Response) => {
    voteService.updateVote(Number(req.params.id), req.body)
        .then(updated => {
            res.send(updated);
        })
        .catch(err => res.send(err.message));
});


voteController.post('/:id/down', (req: Request, res: Response) => {
    voteService.updateVote(Number(req.params.id), req.body)
        .then(updated => {
            res.send(updated);
        })
        .catch(err => res.send(err.message));
});

voteController.get('/:id/:userName', (req: Request, res: Response) => {
    voteService.getLastVote(Number(req.params.id), req.params.userName)
        .then(found => {
            res.send(found);
        })
        .catch(err => res.send(err.message));
});

export const VoteController: Router = voteController;
