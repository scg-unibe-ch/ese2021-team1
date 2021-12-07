export class Post {
/**
  * @param title
  * @param text
  * @param image
  * @param category
  * @param upvotes
  * @param downvotes
  * @param created_at
  * @param userId
  * @param id
  */
  constructor(
    public title: string,
    public text: string,
    public image: Blob,
    public category: string,
    public upvotes: number,
    public downvotes: number,
    public created_at: string,
    public userId: string,
    public id: number
  ) {}
}
