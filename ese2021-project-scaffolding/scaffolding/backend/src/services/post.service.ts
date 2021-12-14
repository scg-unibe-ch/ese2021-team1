import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { canTreatArrayAsAnd } from 'sequelize/types/lib/utils';


export class PostService {

    /**
      * @author jan
      * @author Alessio
      */
    // this function (aka service) is responsible for converting the received object (see method parameter)
    // into the right Post format and store it in the database. It also has to give some
    // feedback back to the controller which then will send it to the front
    public async createPost(post: any, imagePath: string) {
        // in the parameter signature we can define and "type" the parameters that we get, for now I just made it as simple as possible
        return Post.create({ // we use the model's inherited methods (like create) to store the new post in the db
            // prior to that we have to "create" a valid post with the data we took from the front
            id: null,
            title: post.title, // these attributes come from the object that the front sent us
            text: post.content,
            image: imagePath, // will not be set if no image was received
            dislike: 0,
            like: 0,
            communityScore: 0,
            category: post.labels,
            userName: post.userName,
            reported: 0,
            userID: post.userID
        }).then(inserted => {
            return Promise.resolve(inserted);
            // else if an error occured
        })
            .catch(err => {
                // return the error message
                return Promise.reject(err.message);
            });
    }

    // demonstration of how async functions can be tested
    public async doThis(param: number) {
        const posts = await Post.findAll();
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
                        .catch((err) => Promise.reject(err.message));
                } else {
                    return Promise.reject(' Post not found');
                }
            });
    }

    private async updateBody(post: Post, newPost: { title: string, content: string, image: Blob }) {
        if (newPost.image != null) {
            return post.update(
                { title: newPost.title, text: newPost.content })
                .then(updated => Promise.resolve(updated))
                .catch(() => Promise.reject('update failed'));
        } else {
            return post.update(
                { title: newPost.title, text: newPost.content })
                .then(updated => Promise.resolve(updated))
                .catch(() => Promise.reject('update failed'));
        }
    }

    public async deletePost(id) {
        return Post.findByPk(id)
            .then((found => {
                if (found != null) {
                    found.destroy()
                        .then(destroyed => Promise.resolve(destroyed))
                        .catch(() => Promise.reject('failed to destroy post'));
                } else {
                    return Promise.reject('Post not found');
                }
            }));
    }

    // this service returns all posts from the database
    public async getAllPosts(infinityIndex: number) {
        return Post.findAll()
            .then(posts => {
                if (posts) {
                    // get only the specified range of posts
                    posts = posts.reverse();
                    posts = posts.slice(infinityIndex - 5, infinityIndex);
                    return Promise.resolve(posts);
                } else {
                    return Promise.reject('No posts available.');
                }
            })
            .catch(e => {
                return Promise.reject('Could not fetch posts.');
            });
    }
    public async getPost(id: number) {
        console.log('Hallo');
        return Post.findByPk(id)
            .then(post => {
                if (post != null) {
                    return Promise.resolve(post);
                } else {
                    return Promise.reject('No post available.');
                }
            })
            .catch(e => {
                return Promise.reject('Could not fetch post.');
            });
    }

    public async getMyPosts(userID: number) {
        return Post.findAll({ where: { userID: userID } })
            .then(found => {
                if (found != null) {
                    return Promise.resolve(found);
                } else {
                    return Promise.reject('No Posts available');
                }
            }).catch(() => Promise.reject('hei could not fetch posts'));
    }

    /**
      * @param Sring[]
      * @param sequelize
      * @param processingStatus
      */
    public reportPost(id: number) {
        return Post.findByPk(id)
            .then(found => {
                if (found != null) {
                    found.update({ reported: found.reported + 1 })
                        .then(updated => Promise.resolve(updated))
                        .catch(() => Promise.reject('could not update report'));
                } else {
                    return Promise.reject('post not found');
                }
            })
            .then(updated => Promise.resolve(updated))
            .catch((err) => Promise.reject(err));

    }

}
