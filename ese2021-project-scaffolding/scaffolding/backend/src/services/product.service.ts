import {Product} from '../models/product.model';

export class ProductService {
    public async createProduct(product: {title: string, image: Blob, description: string, category: string,
        available: boolean, price: number, discount: number}) {
        return Product.create( {
            id: 0,
            title: product.title,
            image: product.image,
            description: product.description,
            category: product.category,
            available: product.available,
            price: product.price,
            discount: product.discount
        })
            .then(inserted => { return Promise.resolve(inserted);
            })
            .catch(err => {
                return Promise.reject(err.message);
            });
    }

}
