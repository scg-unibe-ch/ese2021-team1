export class ReviewModel{
  constructor(
    public id: number,
    public product: any,
    public title: string,
    public image: string,
    public text: string,
    public stars: number,
    public pros: string,
    public cons: string,
  ) {
  }
}
