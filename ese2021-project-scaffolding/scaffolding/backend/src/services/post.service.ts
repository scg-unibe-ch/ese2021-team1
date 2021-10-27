import {upload} from '../middlewares/fileFilter';
import {TodoItem} from '../models/todoitem.model';
import {ItemImage, ItemImageAttributes} from '../models/itemImage.model';
import {MulterRequest} from '../models/multerRequest.model';
import {Post} from '../models/post.model';

export class PostService {
    // this function (aka service) is responsible for converting the received object (parameter)
    // into the right Post format and store it in the database. It also has to give some
    // feedback back to the controller which then will send it to the front
    public async createPost(post: { title: string, content: string, labels: string[], userName: string }) {
        // in the parameter signature we can define and "type" the parameters that we get
        // whatever we do that is asynchronous, we can denote that with async
        return Post.create({ // we use the model's inherited methods (here create) to store the new post in the db -
            // prior to that we have to "convert" it to the correct format
            title: post.title,
            text: post.content,
            image: null,
            downvotes: 0,
            upvotes: 0,
            category: '',
            userName: post.userName
        })
        // now we want to check whether the creation was successful
        .then(inserted => {
            // return the inserted row (Post) to the controller
            return Promise.resolve(inserted);
        })
        .catch(err => {
            // return the error message
            return Promise.reject(err.message);
        });
    }

}
