import {Orders} from '../models/orders.model';
import {User} from '../models/user.model';
import {Product} from '../models/product.model';


export class OrderService {
// TODO: testing for admin inside of creatingORDER
    public async createOrder(order: { userID: number, products: number[], paymentMethod: string,
        homeAddress: string, streetNumber: number, zipCode: number, city: string,
        processingStatus: string, purchaseDate: string}) {
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
                products: order.products,
                city: order.city,
                homeAddress: order.homeAddress,
                paymentMethod: order.paymentMethod,
                processingStatus: order.processingStatus,
                streetNumber: order.streetNumber,
                zipCode: order.zipCode,
                purchaseDate: order.purchaseDate
            })
                .then(inserted => {
                return Promise.resolve(inserted);
            })
                .catch(err => {
                    return Promise.reject(err.message);
                });
/*        } else {
            return Promise.reject('Admins aren\'t allowed to create orders!');
        }*/
    }

    public async updateOrder(orderId, order) {
        return Orders.findByPk(orderId)
            .then(found => {
                if (found != null) {
                    found.processingStatus = order.processingStatus;
                } else {
                    return Promise.reject(' Order not found');
                }
            })
            .catch(() => Promise.reject('Couldnt update post'));
    }

    // fetchs Order for admin to an user or an user for itself
    public async getAllOrders(ids: {requestee: number, requested: number}) {
        if (ids.requestee === ids.requested || this.isAdmin(ids.requestee)) {
            Orders.findByPk(ids.requested)
                .then(orders => {
            if (orders) {
                return Promise.resolve(orders);
            } else {
                return Promise.reject('orders not found');
            }
            }).catch((err) => Promise.reject(err));
        }
    }
    public async getAllOrdersFrom(userID) {
            User.findByPk(userID)
                .then(user => {
                    if (user != null) {
                        if (!user.admin) {
                        return Promise.resolve(Orders.findAll({where: {userId: user.userId}}));
                    } else {
                        Orders.findAll()
                            .then(orders => {if (orders) {
                                Promise.resolve(orders);
                            } else {
                                Promise.reject('orders not found');
                            }
                            })
                            .catch( () => Promise.reject('orders not got'));
                    }} else {
                        return  Promise.reject('User not found');
                    }})
                .catch( err => Promise.reject(err));
    }

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
