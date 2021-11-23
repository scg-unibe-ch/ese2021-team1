import {upload} from '../middlewares/fileFilter';
import {TodoItem} from '../models/todoitem.model';
import {ItemImage, ItemImageAttributes} from '../models/itemImage.model';
import {MulterRequest} from '../models/multerRequest.model';
import {Post} from '../models/post.model';
import {rejects} from 'assert';


export class PostService {

    // @jan, @alessio

    // this function (aka service) is responsible for converting the received object (see method parameter)
    // into the right Post format and store it in the database. It also has to give some
    // feedback back to the controller which then will send it to the front
    public async createPost(post: { title: string, content: string, image: Blob, labels: string[], userName: string}) {
        console.log(post);
        // in the parameter signature we can define and "type" the parameters that we get, for now I just made it as simple as possible
        return Post.create({ // we use the model's inherited methods (like create) to store the new post in the db
            // prior to that we have to "create" a valid post with the data we took from the front
            id: 0,
            title: post.title, // these attributes come from the object that the front sent us
            text: post.content,
            image: post.image,
            downvotes: 0,
            upvotes: 0,
            category: this.arrayToString(post.labels),
            userName: post.userName
        })
        // now we want to check whether the creation was successful
        .then(inserted => {
            // rif all ok, return the inserted row (Post) to the controller
            return Promise.resolve(inserted);
        })
        // else if an error occured
        .catch(err => {
            // return the error message
            return Promise.reject(err.message);
        });
    }

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

    private async updateBody(post: Post, newPost: { title: string, content: string, image: Blob, labels: string[] }) {
        if (newPost.image != null) {
            return post.update(
                {title: newPost.title, text: newPost.content, image: newPost.image, category: newPost.labels.toString()})
                .then(updated => Promise.resolve(updated))
                .catch(() => Promise.reject('update failed') );
        } else {
            return post.update({title: newPost.title, text: newPost.content, category: newPost.labels.toString()})
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
                        .catch(() => Promise.reject('failed to destroy'));
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

    public searchForCategorys (categorys: String []) {
        const counter = 0;
        let searchedForCategorys = null;
        return Post.findAll().then(found => {
            searchedForCategorys = new Array(found.length);
            for (let arrayLength = 0; arrayLength < found.length; arrayLength++) {
                for (let categoryLength = 0; categoryLength < categorys.length; categoryLength++) {
                const search = new RegExp('$' + categorys[categoryLength] + '$');
                if ( search.test(found[arrayLength].category)) {
                    searchedForCategorys[counter] = found[arrayLength];
                }
                }
            }
            return Promise.resolve(searchedForCategorys);
        })
            .catch(err => {
                return Promise.reject(err.message);
            });
    }
}
