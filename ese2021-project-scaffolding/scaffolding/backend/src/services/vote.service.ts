import {Vote} from '../models/vote.model';
import {Post} from '../models/post.model';

export class VoteService {


/**
* @param number
* @param userName
* @param subscriptionType
*/
    public async createVote(id: number, userName: string, subscriptionType: number) {
    let likeSub = false;
    let dislikeSub = false;
    switch (subscriptionType) {
        case -1: {
            dislikeSub = true;
            break;
        }
        case 1: {
            likeSub = true;
            break;
        }
        /*default: {
            console.log();
        }*/
    }
    return Vote.create({
        voteId: 0,
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

    public async updateVote(postid: number, body: { userName: string, vote: number}) {

        return Vote.findOne({where: {userName: body.userName, postId: postid}})
            .then(async found => {
        if (found != null) {
            if ((found.like === true && body.vote === 1) || (found.dislike === true && body.vote === -1)) {
                console.log();
                // UNsubscription
                found.destroy() // first destroy the subscription in the Vote table
                    .then(destroyed => {
                            // then decrease like/dislike on the post
                            this.upDownVote(postid, body.vote, -1);
                            return Promise.reject(destroyed);
                        }
                    ).catch((err) => Promise.reject('failed to destroy ' + err));
            } else {
                return Promise.reject('You can\'t like and dislike the same post');
            }
        } else { // there is no sub in the Vote table so we can create a new one -> subscription
            await this.upDownVote(postid, body.vote, 1);
            try {
                const worked = await this.createVote(postid, body.userName, body.vote);
                return Promise.resolve(worked);
            } catch (err_1) {
                return Promise.reject(err_1);
            }
        }
            })
            .catch(err => Promise.reject(err));

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
}
