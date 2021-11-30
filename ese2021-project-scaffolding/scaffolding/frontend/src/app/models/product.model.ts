export class Product {
  constructor(
    public title: string,
    public text: string,
    public description: string,
    public price: number,
    public category: string,
    public image: Blob
  ) {}
}
