import {Comment} from '../models/comment.model';

export class CommentService {
    public commentCreate(postId: number, text: string, userID: number) {
        return Comment.create({
                commentID: null,
                postID: postId,
                text: text,
                reported: 0,
                userID: userID
            }
        )
            .then(created => {
                return Promise.resolve(created);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
    public getAllComments(postId: number) {
        return Comment.findAll({where: {postID: postId}})
            .then(found => {
                if (found != null) {
                    return Promise.resolve(found);
                } else {
                    return Promise.reject('No Comments found');
                }
            })
            .catch(() => Promise.reject('Could not fetch Comments'));
    }
}
