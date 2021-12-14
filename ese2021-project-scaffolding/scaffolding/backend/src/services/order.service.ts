import {Orders} from '../models/orders.model';
import {User} from '../models/user.model';
import {Product} from '../models/product.model';


export class OrderService {
/**
 * @param order
 */

    public async createOrder(order: { userID: number, productIds: string, paymentMethod: string,
        homeAddress: string, streetNumber: number, zipCode: number, city: string,
        processingStatus: string, purchaseDate: string, products: string, subtotal: number}) {
            if (order.zipCode === null && order.city === null && order.streetNumber === null && order.homeAddress === null) {
                User.findByPk(order.userID).then(found => {
                    if (found != null) {
                        order.city = found.city;
                        order.zipCode = found.zipCode;
                        order.streetNumber = found.streetNumber;
                        order.homeAddress = found.homeAddress;
                    } else {
                        return Promise.reject('UserId not found');
                    }
                })
                    .catch(err => {
                        return Promise.reject(err.message);
                    });
            }
            return Orders.create({
                orderId: 0,
                userId: order.userID,
                productIds: order.productIds,
                city: order.city,
                homeAddress: order.homeAddress,
                paymentMethod: order.paymentMethod,
                processingStatus: order.processingStatus,
                streetNumber: order.streetNumber,
                zipCode: order.zipCode,
                purchaseDate: order.purchaseDate,
                products: order.products,
                subtotal: order.subtotal
            })
                .then(inserted => {
                return Promise.resolve(inserted);
            })
                .catch(err => {
                    return Promise.reject(err.message);
                });
    }

    public async updateOrder(orderId, body) {
        return Orders.findByPk(orderId)
            .then(found => {
                if (found != null) {
                    return found.update({processingStatus: body.processingStatus})
                        .then(updated => Promise.resolve(updated))
                        .catch(() => Promise.reject('update failed') );
                } else {
                    return Promise.reject('Order not found');
                }
            })
            .catch(() => Promise.reject('Couldnt update post'));
    }

    // fetchs all orders
    public async getAllOrders() {
            return Orders.findAll()
                .then(orders => {
                    if (orders) {
                        return Promise.resolve(orders);
                    } else {
                        return Promise.reject('orders not found');
                    }
                }).catch((err) => Promise.reject(err));
    }
    /**
    * @param user Id
    * @return All orders form this Id
    */

    public async getAllOrdersFrom(userID) {
        return Orders.findAll({where: {userId: userID}})
            .then(found => {
                if (found != null) {
                    return Promise.resolve(found);
                } else {
                    return Promise.reject('No Orders available');
                }
            }).catch(() => Promise.reject('Could not fetch Orders'));
    }
    /**
    * @param Id
    * @return if admin was found or not
    */

    private isAdmin(id) {
        User.findByPk(id)
            .then(found => {
                if (found != null) {
                    return found.admin;
                } else {
                    return Promise.reject('User not found');
                }

            })
            .catch( (err) => Promise.reject(err));
    }
}
