import express from 'express';
import { Router, Request, Response } from 'express';
import {VoteService} from '../services/vote.service';
import {PostService} from '../services/post.service';

const voteController: Router = express.Router();
const voteService = new VoteService();
// change to: subscribe means the front gives +1 for either like or dislike --> when someone gives a vote
// unsubscribe means either -1 for like or dislike --> when someone takes a way his vote
// add check if a user already liked a post or disliked a post (only one should be valid per post
// TODO: @jan i anderne Wort die zwe methodene müess no komplett ahpasst wärde (u im frontend ou)



voteController.subscribe('/:id/post', (req: Request, res: Response) => {
    voteService.updateVote(req.body, 1)
        .then(updated => {
            console.log(updated);
            res.send(updated);
        })
        .catch(err => res.send(err));
});


/* voteController.unsubscribe('/:id/post', (req: Request, res: Response) => {
    PostService.updateVote(req.params.id, -1, user)
        .then(updated => {
            console.log(updated);
            res.send(updated);
        })
        .catch(err => res.send(err));
});
 */
export const VoteController: Router = voteController;
