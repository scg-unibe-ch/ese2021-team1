import {Vote} from '../models/vote.model';

export class VoteService {
// TODO muess ou no ahpasst wärde
    public async updateVote(id: number, user: number, vote: number) {
        return Vote.findByPk(id)
            .then((found => {
                if (found != null) {
                    if (vote === 1) {
                        found.update({like: (found.like++), communityScore: (found.communityScore++)})
                            .then(liked => Promise.resolve(liked))
                            .catch(() => Promise.reject('failed to like'));
                    } else if (vote === -1) {
                        found.update({dislike: (found.dislike++), communityScore: (found.communityScore--)})
                            .then(disliked => Promise.resolve(disliked))
                            .catch(() => Promise.reject('failed to dislike'));
                    }
                } else {
                    Promise.reject('PostId for dis/like not found');
                }
            }))
            .catch (() => Promise.reject('failed to dis/like'));
    }
/*
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
    } */

}
