import {Vote} from '../models/vote.model';
import {Post} from '../models/post.model';

export class VoteService {

    private async;     public async createVote(id: number, userID: number, subscriptionType: number) {
    let likeSub, dislikeSub = false;
        if (subscriptionType === -1) { // dislike
        dislikeSub = true;

    } else {
        likeSub = true;
        }
    return Vote.create({
        postId: id,
        userId: userID,
        dislike: dislikeSub,
        like: likeSub,
    }).then(inserted => {

        return Promise.resolve(inserted);
    }).catch(err => {
        return Promise.reject(err);
    });
    }
// TODO muess ou no ahpasst wärde
    public async updateVote(body: { postid: number, userid: number, vote: number}, subscription: number) {
        const found = this.searchSub(body.postid, body.userid, body.vote); // search alg to find the vote in Vote table
        if (subscription === 1) { // --> subscription
            if (found != null) { // there is already a subscription
                return Promise.reject('You can\'t like and dislike the same post');
            } else { // there is none in the Vote table so we can create a new one
                return this.createVote(body.postid, body.userid, body.vote)
                .then(worked => {
                return Promise.resolve(worked);
                }).catch(err => {
                return Promise.reject(err);
                });
            }
        } else { // --> a UNsubscription
            found.destroy()
                .then(destroyed => Promise.reject(destroyed))
                .catch(() => Promise.reject('failed to destroy'));
                // .then(decrease => {
                    Post.findByPk(body.postid).then(foundToDecrease => {
                        if (foundToDecrease != null) {
                            if (body.vote === 1) { // like -1
                                foundToDecrease.update({like: (foundToDecrease.like--),
                                    communityScore: ((foundToDecrease.like - foundToDecrease.dislike) / 10)})
                                    .then(unSubedLike => Promise.resolve(unSubedLike))
                                    .catch(() => Promise.reject('failed to unsub the like'));
                            } else if (body.vote === -1) { // dislike -1
                                foundToDecrease.update({dislike: (foundToDecrease.dislike--),
                                    communityScore: ((foundToDecrease.like - foundToDecrease.dislike) / 10)})
                                    .then(unSubedDislike => Promise.resolve(unSubedDislike))
                                    .catch(() => Promise.reject('failed to unsub the dislike'));
                            }
                        } else {
                            Promise.reject('Post not found in posts table');
                        }
                    }).catch( err => Promise.reject('failed to unsub'));
                // })
                // .catch( err => Promise.reject(err));
        }
    }

    private searchSub(postid: number, userid: number, vote: number): any {
        Vote.findByPk(postid) // search by postid
            .then(foundpost => {
                if (foundpost != null) {
                    Vote.findByPk(userid) // search by userid
                        .then(founduser => {
                            if (founduser != null) {
                                 Promise.resolve(founduser);
                            } else {
                                 Promise.reject(founduser);
                            }
                    }).catch(err => Promise.reject(err));
                } else {
                    Promise.reject(foundpost);
                }
            })
            .catch(err => Promise.reject(err));

    }
                                /*
                        // subscription === 1 --> sub
                        // subscription === -1 --> unsub
                        // vote === 1 --> like
                        // vote === -1 --> dislike
                        if (subscription === -1) { // unsub

                        } else if (subscription === 1) {

                        }
                    }
                } else {
                    Promise.reject('PostId for dis/like not found');
                }
            }))
            .catch (() => Promise.reject('failed to dis/like'));
            })*/

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
