import express from 'express';
import { Router, Request, Response } from 'express';
import { PostService } from '../services/post.service';

const orderController: Router = express.Router();


const orderService = new OrderService();

orderController.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    orderService.createOrder()
        .then(order => res.json(order))
        .catch(err => res.json(err));
});
// this route is hit by the frontend on startup to fetch all orders from the database
orderController.get('/', (req: Request, res: Response) => {
    orderService.getAllOrders()
        .then(posts => res.json(posts))
        .catch(err => res.json(err));
});


orderController.put('/:id', (req: Request, res: Response) => {
    orderService.updateOrder(req.params.id, req.body)
        .then(updated => res.send(updated))
        .catch(err => res.send(err));
});



// you have to export the controller to use it in the server
export const PostController: Router = orderController;
