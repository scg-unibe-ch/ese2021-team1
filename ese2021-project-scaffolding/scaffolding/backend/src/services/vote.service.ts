import {Vote} from '../models/vote.model';

export class VoteService {
    public static async createVote(postId: number) {
        return Vote.create({
            postId: postId,
            dislike: 0,
            like: 0,
            communityScore: 0
        }).then(inserted => {
            return Promise.resolve(inserted);
        }).catch(err => {
            return Promise.reject(err);
    });
}

    public like(id) {
        return Vote.findByPk(id)
            .then((found => {
                if (found != null) {
                    found.update( {like: (found.like++), communityScore: (found.communityScore++)})
                        .then(liked => Promise.resolve(liked))
                        .catch(() => Promise.reject('failed to like'));
                } else {
                    Promise.reject('PostId for like not found');
                }
            }))
            .catch(() => Promise.reject('failed to like'));
    }

    public dislike(id) {
        return Vote.findByPk(id)
            .then((found => {
                if (found != null) {
                    found.update( {dislike: (found.dislike++), communityScore: (found.communityScore--)})
                        .then(disliked => Promise.resolve(disliked))
                        .catch(() => Promise.reject('failed to dislike'));
                } else {
                    Promise.reject('PostId for dislike not found');
                }
            }))
            .catch(() => Promise.reject('failed to dislike'));
    }

}
