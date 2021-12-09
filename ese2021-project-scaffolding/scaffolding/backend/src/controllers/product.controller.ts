import express, {Router, Request, Response} from 'express';
import { ProductService } from '../services/product.service';
/**
* @param productController
* @param productService
*/
const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/', (req: Request, res: Response) => {
    productService.createProduct(req.body)
        .then(product => res.json(product))
        .catch(err => res.json(err));
});

 productController.delete('/:id', (req: Request, res: Response) => {
     console.log('Correct');
    productService.deleteProduct(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(err => res.send(err));
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

 productController.get('/', (req: Request, res: Response) => {
     // productService.searchForCategorysProduct(req.body)
         // .then(updated => res.json(updated))
         // .catch(err => res.json(err));
     productService.getAllProducts()
         .then(updated => res.json(updated))
         .catch(err => res.json(err));
 });




export const ProductController: Router = productController;
