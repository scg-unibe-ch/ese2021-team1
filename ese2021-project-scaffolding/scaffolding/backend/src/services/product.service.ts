import {Product} from '../models/product.model';
import {Post} from '../models/post.model';

export class ProductService {
    public async createProduct(product: {title: string, image: Blob, description: string, category: string,
        available: boolean, price: number, discount: number}) {
        let standardDiscount: number;
        if (product.discount === null) {
            standardDiscount = 1;
        } else {
            standardDiscount = product.discount;
        }
        return Product.create( {
            id: 0,
            title: product.title,
            image: product.image,
            description: product.description,
            category: product.category,
            available: product.available,
            price: product.price,
            discount: standardDiscount,
            deleted: false
        })
            .then(inserted => { return Promise.resolve(inserted);
            })
            .catch(err => {
                return Promise.reject(err.message);
            });
    }

    public async deleteProduct(id) {
        return Product.findByPk(id)
            .then((found => {
                if (found != null) {
                    found.update({deleted: true})
                        .then(updated => Promise.resolve(updated))
                        .catch(() => Promise.reject('failed to delete '));
                } else {
                    return Promise.reject('Post not found');
                }
            }));
    }

    public async updateProduct(id, product) {
        return Product.findByPk(id)
            .then(found => {
                if (found != null) {
                    return this.updateBody(found, product)
                        .then(updated => Promise.resolve(updated))
                        .catch((err) => Promise.reject(err.message));
                } else {
                    return Promise.reject('Product not found');
                }
            });
    }

    private async updateBody(product: Product, newProduct: {title: string, image: Blob, description: string, category: string,
        available: boolean, price: number, discount: number}) {
        let standardDiscount: number;
        if (newProduct.discount === null) {
            standardDiscount = 1;
        } else {
            standardDiscount = product.discount;
        }
        return product.update({
            title: newProduct.title,
            image: newProduct.image,
            description: newProduct.description,
            category: newProduct.category,
            available: newProduct.available,
            price: newProduct.price,
            discount: standardDiscount})
            .then(updated => Promise.reject(updated))
            .catch(() => Promise.reject('Product update failed'));
    }

    // TODO: buy order

    public searchForCategorysProduct (categorys: String []) {
        let counter = 0;
        let searchedForProducts = null;
        return Product.findAll().then(found => {
            searchedForProducts = new Array(found.length);
            for (let arrayLength = 0; arrayLength < found.length; arrayLength++) {
                for (let categoryLength = 0; categoryLength < categorys.length; categoryLength++) {
                    const search = new RegExp('$' + categorys[categoryLength] + '$');
                    if ( search.test(found[arrayLength].category)) {
                        searchedForProducts[counter] = found[arrayLength];
                        counter++;
                    }
                }
            }
            return Promise.resolve(searchedForProducts);
        })
            .catch(err => {
                return Promise.reject(err.message);
            });
    }

    public getAllProducts () {
        return Product.findAll({where: {deleted: false}})
            .then(product => {
                if (product != null) {
                    return Promise.resolve(product);
                } else {
                    return Promise.reject(product);
                }
            })
            .catch( () => Promise.reject('Cannot find products'));
    }
}
