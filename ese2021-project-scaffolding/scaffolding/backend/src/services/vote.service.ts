import {Vote} from '../models/vote.model';
import {Post} from '../models/post.model';

export class VoteService {

    public async createVote(id: number, userName: string, subscriptionType: number) {
    let likeSub, dislikeSub = false;
    if (subscriptionType === -1) { // dislike
        dislikeSub = true;
    } else {
        likeSub = true;
    }
    return Vote.create({
        postId: id,
        userName: userName,
        dislike: dislikeSub,
        like: likeSub,
        }).then(inserted => {
            return Promise.resolve(inserted);
        }).catch(err => {
            return Promise.reject(err);
        });
    }
    // TODO: return new like/dislike/communityScore count
    public async updateVote(postid: number, body: { userName: string, vote: number}, subscription: number) {
        const found = this.searchSub(postid, body.userName); // search alg to find the vote in Vote table
        // fallunterscheidung:
        // subscription
        if (subscription === 1) {
            // there is already a subscription
            if (found != null) {
                return Promise.reject('You can\'t like and dislike the same post');
            } else { // there is no sub in the Vote table so we can create a new one
                await this.upDownVote(postid, body.vote, 1);
                return this.createVote(postid, body.userName, body.vote)
                .then(worked => {
                return Promise.resolve(worked);
                }).catch(err => {
                return Promise.reject(err);
                });
            }
        } else { // UNsubscription
            found.destroy() // first destroy the subscription in the Vote table
                .then(destroyed => {
                        // then decrease like/dislike on the post
                        this.upDownVote(postid, body.vote, -1);
                        Promise.reject(destroyed);
                    }
                ).catch (() => Promise.reject('failed to destroy') );
        }
    }
    private async upDownVote(postid: number, vote: number, increase: number) {
        Post.findByPk(postid).then(foundToDeIncrease => {
            if (foundToDeIncrease != null) {
                if (vote === 1) { // like -1
                    foundToDeIncrease.update({like: (foundToDeIncrease.like += increase),
                        communityScore: ((foundToDeIncrease.like - foundToDeIncrease.dislike) / 10)})
                        .then(unSubedLike => Promise.resolve(unSubedLike))
                        .catch(() => Promise.reject('failed to unsub the like'));
                } else if (vote === -1) { // dislike -1
                    foundToDeIncrease.update({dislike: (foundToDeIncrease.dislike += increase),
                        communityScore: ((foundToDeIncrease.like - foundToDeIncrease.dislike) / 10)})
                        .then(unSubedDislike => Promise.resolve(unSubedDislike))
                        .catch(() => Promise.reject('failed to unsub the dislike'));
                }
            } else {
                Promise.reject('Post not found in posts table');
            }
        }).catch(() => Promise.reject('failed to unsub'));
    }


    private searchSub(postid: number, userName: string): any {
        Vote.findByPk(postid) // search by postid
            .then(foundpost => {
                if (foundpost != null) {
                    Vote.findOne({ where: { userName: userName }} ) // search by userid
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

}
