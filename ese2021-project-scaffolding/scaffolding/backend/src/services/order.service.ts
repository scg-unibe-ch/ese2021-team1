import {Orders} from '../models/orders.model';
import {User} from '../models/user.model';


export class OrderService {
// TODO: testing for admin inside of creatingORDEr
    public async createOrder(order: {userID: number, products: number[], paymentMethod: string,
        homeAddress: string, streetNumber: number, zipCode: number, city: string,
        processingStatus: string, purchaseDate: number}) {
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
            });
        }
// TODO: find a slution for multiple products
        return Orders.create({
            orderId: 0,
            userId: order.userID,
            products: order.products,
            city: order.city,
            homeAddress: order.homeAddress,
            paymentMethod: order.paymentMethod,
            processingStatus: order.processingStatus,
            streetNumber: order.streetNumber,
            zipCode: order.zipCode
        });
    }

    public async updateOrder(orderId, order) {
        return Orders.findByPk(orderId)
            .then(found => {
                if (found != null) {
                    found.processingStatus = order.processingStatus;
                } else {
                    return Promise.reject(' Order not found');
                }
            });
    }
    public async getAllOrders() {
        return;
    }
}
