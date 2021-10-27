import {upload} from '../middlewares/fileFilter';
import {TodoItem} from '../models/todoitem.model';
import {ItemImage, ItemImageAttributes} from '../models/itemImage.model';
import {MulterRequest} from '../models/multerRequest.model';
import {Post} from '../models/post.model';

export class PostService {

    public addImage(req: MulterRequest): Promise<ItemImageAttributes> {
        return TodoItem.findByPk(req.params.id)
            .then(found => {
                if (!found) {
                    return Promise.reject('Product not found!');
                } else {
                    return new Promise<ItemImageAttributes>((resolve, reject) => {
                        upload.single('image')(req, null, (error: any) => {
                            ItemImage.create({ fileName: req.file.filename, todoItemId: found.todoItemId })
                                .then(created => resolve(created))
                                .catch(() => reject('Could not upload image!'));
                        });
                    });
                }
            })
            .catch(() => Promise.reject('Could not upload image!'));
    }


    public getImageItem(imageId: number): Promise<ItemImage> {
        return ItemImage.findByPk(imageId)
            .then(image => {
                if (image) {
                    return Promise.resolve(image);
                } else {
                    return Promise.reject('image not found!');
                }
            })
            .catch(() => Promise.reject('could not fetch the image!'));
    }


    public getAllPosts(): Promise<Post[]> {
        return Post.findAll()
            .then(post => {
                if (post) {
                    return Promise.resolve(posts); // TODO: is it post or the table posts from post.model.ts that we should return?
                } else {
                    return Promise.reject('posts not found');
                }
            })
            .catch(() => Promise.reject('could not fetch the posts'));
    }

    // TODO: when createPost is called, call addImage to add the image too (or find a way to add it in here directly)
    public createPost(title, text, category, userId): Promise<Post> {
        return Post.create().then(post => {
            if (title != null) {
                if (category != null) {
                    if (userId != null) {
                        post.title = title;
                        post.text = text;
                        post.category = category;
                        post.userId = userId;
                        post.created_at = Date.now();
                        return Promise.resolve(post);
                    } else {
                        return Promise.reject('userID of the user is missing');
                    }
                } else {
                    return Promise.reject('category is missing');
                }
            } else {
                return Promise.reject('post title is missing');
            }
        }).catch(() => Promise.reject('some fields may be empty'));
    }


    public updatePost(): Promise<Post[]> {
        return null;
    }

    public deletePost(postID): Promise {
        return Post.findByPk(postID)
            .then()
            .catch();
    }
}
