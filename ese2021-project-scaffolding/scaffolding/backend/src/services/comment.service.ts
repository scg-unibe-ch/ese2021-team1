import {Comment} from '../models/comment.model';

export class CommentService {
    public commentCreate(postId: number, text: string) {
        return Comment.create({
                commentID: null,
                postID: postId,
                text: text,
                reported: 0
            }
        )
            .then(created => {
                return Promise.resolve(created);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
/*
    public get3Comments(postId: number) {
        return Comment.findByPk(postId)
            .then(found => {
                if (found != null) {
                    Comment.findAll({where: {found.commentID: {lte: 4}; }
                    }).then(found2 => Promise.resolve(found2));
                } else {
                    return Promise.reject('No Comments found');
                }
            })
            . catch (() => Promise.reject('Could not fetch Comments'));
    }
*/
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
