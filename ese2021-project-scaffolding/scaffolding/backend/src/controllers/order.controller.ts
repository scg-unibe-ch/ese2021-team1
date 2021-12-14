import express from 'express';
import { Router, Request, Response } from 'express';
import {OrderService} from '../services/order.service';
/**
* @param orderController
* @param orderService
*/
const orderController: Router = express.Router();
const orderService = new OrderService();

orderController.post('/', (req: Request, res: Response) => {
    orderService.createOrder(req.body)
        .then(order => res.send(order))
        .catch(err => res.send(err));
});


// get all the orders for the requested User
orderController.get('/:id', (req: Request, res: Response) => {
   orderService.getAllOrdersFrom(Number(req.params.id))
       .then(orders => res.json(orders))
       .catch(err => res.json(err));
});

orderController.get('/', (req: Request, res: Response) => {
    orderService.getAllOrders()
        .then(orders => res.json(orders))
        .catch(err => res.json(err));
});



orderController.put('/:id', (req: Request, res: Response) => {
    orderService.updateOrder(req.params.id, req.body)
        .then(updated => res.send(updated))
        .catch(err => res.send(err));
});



// you have to export the controller to use it in the server
export const OrderController: Router = orderController;
