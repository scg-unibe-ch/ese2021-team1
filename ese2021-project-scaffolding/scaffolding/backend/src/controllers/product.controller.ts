import express, {Router, Request, Response} from 'express';
import { ProductService } from '../services/product.service';
import { upload } from '../middlewares/fileFilter';

/**
* @param productController
* @param productService
*/
const productController: Router = express.Router();
const productService = new ProductService();

productController.post('/',  upload.single('file'), (req: Request, res: Response) => {

    productService.createProduct(JSON.parse(req.body.product), req.file?.filename)
        .then(product => res.json(product))
        .catch(err => res.json(err));
});

 productController.delete('/:id', (req: Request, res: Response) => {
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
     productService.getAllProducts()
         .then(updated => res.json(updated))
         .catch(err => res.json(err));
 });

 productController.get('/:id', (req: Request, res: Response) => {
     productService.getProduct(Number(req.params.id))
         .then(got => res.json(got))
         .catch(err => res.json(err));
 });



export const ProductController: Router = productController;
