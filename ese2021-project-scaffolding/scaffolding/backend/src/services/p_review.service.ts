import {PReview} from '../models/p_review.model';

export class PReviewService {
    public async CreatePReview(productID: number,
                               body: {userId: number, title: string, image: string, text: string, stars: number, pros: string, cons: string}) {
        return PReview.create({
            p_reviewId: 0,
            userId: body.userId,
            productId: productID,
            title: body.title,
            image: body.image,
            text: body.text,
            stars: body.stars,
            pros: body.pros,
            cons: body.cons,
            reported: false,
        }).then(inserted => {
            return Promise.resolve(inserted);
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    public async deletePReview(productID: number, body: {reviewid: number}) {
        PReview.findOne({
            where: {
                p_reviewId: body.reviewid,
                productId: productID
            }})
            .then(found => {
                if (found != null) {
                    found.destroy()
                        .then(destroyed => Promise.reject(destroyed))
                        .catch(() => Promise.reject('failed to destroy review'));
                } else {
                    return Promise.reject('Review not found');
                }
            }).catch(err => Promise.reject(err));
    }

    public async getAllReviews(productID: number) {
        return PReview.findAll({
            where: {
                productId: productID
            }})
            .then(reviews => {
                if (reviews) {
                    return Promise.resolve(reviews);
                } else {
                    return Promise.reject('No reviews available');
                }
            })
            .catch(() => Promise.reject('Could not fetch reviews'));
    }
}
