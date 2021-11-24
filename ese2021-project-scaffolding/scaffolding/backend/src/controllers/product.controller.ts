import express, {Router, Request, Response} from 'express';
import { ProductService } from '../services/product.service';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/', (req: Request, res: Response) => {
    productService.createProduct(req.body)
        .then(post => res.json(post))
        .catch(err => res.json(err));
});

 productController.delete('/', (req: Request, res: Response) => {
    productService.deleteProduct(req.params.id)
        .then(deleted => res.json(deleted))
        .catch(err => res.json(err));
 });

 productController.put('/:id', (req: Request, res: Response) => {
     productService.updateProduct(req.params.id, req.body)
         .then(updated => res.json(updated))
         .catch(err => res.json(err));
 });

 productController.search('/', (req: Request, res: Response) => {
     productService.searchForCategorysProduct(req.body)
         .then(updated => res.json(updated))
         .catch(err => res.json(err));
 });

 // TODO: filter for categorys
// TODO: buy order

export const ProductController: Router = productController;
