export class Product {
/**
  * @param id
  * @param title
  * @param text
  * @param description
  * @param price
  * @param category
  * @param image
  */

  constructor(
    public id: number,
    public title: string,
    public text: string,
    public description: string,
    public price: number,
    public category: string,
    public image: Blob
  ) {}
}
