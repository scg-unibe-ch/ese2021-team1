import express, {Request, Response, Router} from 'express';
import {PReviewService} from '../services/p_review.service';

const p_reviewController: Router = express.Router();
const previewService = new PReviewService();

p_reviewController.post('/:id', (req: Request, res: Response) => {
    previewService.CreatePReview(req.body)
        .then(created => {
            console.log(created);
            res.send(created);
        }).catch(err => res.send(err));
});
/*
p_reviewController.post('/:id', (req: Request, res: Response) => {
    previewService.deletePReview(Number(req.params.id), req.body)
        .then(deleted => {
            res.send(deleted);
        }).catch(err => res.send(err));
});
*/
p_reviewController.get( '/:id', (req: Request, res: Response) => {
    previewService.getAllReviews(Number(req.params.id))
        .then(fetched => {
            res.send(fetched);
        }).catch(err => res.send(err));
});

export const ReviewController: Router = p_reviewController;
