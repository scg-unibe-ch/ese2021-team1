import {Post} from '../models/post.model';
import {Comment} from '../models/comment.model';


export class PostService {

   /**
     * @author jan
     * @autor Alessio
     */
     W;
    // this function (aka service) is responsible for converting the received object (see method parameter)
    // into the right Post format and store it in the database. It also has to give some
    // feedback back to the controller which then will send it to the front
    public async createPost(post: any, imagePath: string) {
        // in the parameter signature we can define and "type" the parameters that we get, for now I just made it as simple as possible
        return Post.create({ // we use the model's inherited methods (like create) to store the new post in the db
            // prior to that we have to "create" a valid post with the data we took from the front
            id: 0,
            title: post.title, // these attributes come from the object that the front sent us
            text: post.content,
            image: imagePath, // will not be set if no image was received
            dislike: 0,
            like: 0,
            communityScore: 0,
            category: post.labels,
            userName: post.userName
        }).then(inserted => {
            Promise.resolve(inserted);
            // else if an error occured
        })
        .catch(err => {
            // return the error message
            return Promise.reject(err.message);
        });
    }
    /**
      * @param id
      * @param pst
      * @return validation if post is updated or not
      */

    public async updatePost(id, post) {
        return Post.findByPk(id)
            .then(found => {
                if (found != null) {
                    return this.updateBody(found, post)
                        .then(updated => Promise.resolve(updated))
                        .catch((err) => Promise.reject(err.message) );
                } else {
                    return Promise.reject(' Post not found');
                }
            });
    }

    private async updateBody(post: Post, newPost: { title: string, content: string, image: Blob}) {
        if (newPost.image != null) {
            return post.update(
                {title: newPost.title, text: newPost.content})
                .then(updated => Promise.resolve(updated))
                .catch(() => Promise.reject('update failed') );
        } else {
            return post.update(
                {title: newPost.title, text: newPost.content})
                .then(updated => Promise.resolve(updated))
                .catch(() => Promise.reject('update failed') );
        }
    }

    public async deletePost(id) {
        return Post.findByPk(id)
            .then((found => {
                if (found != null) {
                    found.destroy()
                        .then(destroyed => Promise.reject(destroyed))
                        .catch(() => Promise.reject('failed to destroy post'));
                } else {
                    return Promise.reject('Post not found');
                }
            }));
    }

        // this service returns all posts from the database
        public async getAllPosts() {
            return Post.findAll()
                .then(posts => {
                    if (posts) {
                        return Promise.resolve(posts);
                    } else {
                        return Promise.reject('No posts available.');
                    }
                })
                .catch(() => Promise.reject('Could not fetch posts.'));
        }

        private arrayToString (array: String[]): string {
            let stringArray = '';

            for (let i = 0; i < array.length; i++) {
                stringArray += array[i] + ', ';
            }
            return stringArray;
        }


    // TODO: search for category -> done?
/**
  * @param Sring[]
  * @param sequelize
  * @param processingStatus
  */
    public searchForCategorysPost2 (categorys: String []) {
        let counter = 0;
        let searchedForCategorys = null;
        return Post.findAll().then(found => {
            searchedForCategorys = new Array(found.length);
            for (let arrayLength = 0; arrayLength < found.length; arrayLength++) {
                for (let categoryLength = 0; categoryLength < categorys.length; categoryLength++) {
                const search = new RegExp('$' + categorys[categoryLength] + '$');
                // @ts-ignore
                    if ( search.test(found[arrayLength].category)) {
                    searchedForCategorys[counter] = found[arrayLength];
                    counter++;
                }
                }
            }
            return Promise.resolve(searchedForCategorys);
        })
            .catch(err => {
                return Promise.reject(err.message);
            });
    }

    public reportPost(id: number) {
        return Post.findByPk(id)
            .then(found => {
                if (found != null) {
                    found.update({reported: found.reported++})
                        .then (updated => Promise.resolve(updated))
                        .catch((err) => Promise.reject(err));
                }
            })
            .then(updated => Promise.resolve(updated))
            .catch((err) => Promise.reject(err));

    }

    public comment(commentId: number, postId: number, text: string) {
        return Comment.create( {
            postID: postId,
            commentID: commentId,
            text: text,
            reported: 0
            }
        )
            .then(created => Promise.reject(created))
            .catch(err => Promise.reject(err));
    }

    public getAllComments(postId: number) {
        return Comment.findByPk(postId)
            .then(found => {
                if (found != null) {
                    return Promise.resolve(found);
                } else {
                    return Promise.reject('No Comments found');
                }
            })
            .catch(() => Promise.reject('Could not fetch Comments'));
    }

/*
    public async searchForCategorysPost(categorys: String[]) {
        let searchdForCategorys = null;
        let counter = 0;
        return Post.findAll()
            .then(found => {
                searchdForCategorys = new Array(found.length);
                if (found != null) {
                    for (let foundLength = 0; foundLength < found.length; foundLength++) {
                        for (let categorysLengt = 0; categorysLengt < categorys.length; categorysLengt++) {
                            for (let foundCategorysLength = 0; foundCategorysLength < found[foundLength].category.length;
                                 foundCategorysLength++) {
                                if (categorys[categorysLengt] === found[foundLength].category[foundCategorysLength]) {
                                    searchdForCategorys[counter] = found[foundLength];
                                    counter++;
                                    break;
                                }
                            }
                        }
                    }
                    return Promise.resolve(searchdForCategorys);
                } else {
                    return Promise.reject('Cant find Posts');
                }
            })
            .catch(() => Promise.reject('Cant search for category'));
    }*/
}
