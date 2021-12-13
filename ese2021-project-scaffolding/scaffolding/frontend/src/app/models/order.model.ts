export class Order {
/**
  * @param oderId
  * @param userId
  * @param products
  * @param paymentMethod
  * @param homeAddress
  * @param streetNumber
  * @param zipCode
  * @param city
  * @param processingStatus
  * @param purchaseDate
  */
  constructor(
    public orderId: number,
    public userId: number,
    public productIds: string, // product ids separated by comma
    public paymentMethod: string,
    public homeAddress: string,
    public streetNumber: number,
    public zipCode: number,
    public city: string,
    public processingStatus: string,
    public purchaseDate: string,
    public products: string,
    public subtotal: number
  ) {}
}
