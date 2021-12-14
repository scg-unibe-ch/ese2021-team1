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
    public image: Blob | any,
    public category: string,
    public upvotes: number,
    public downvotes: number,
    public created_at: string,
    public userId: string,
    public id: number,
    public like: number,
    public dislike: number,
    public createdAt: string
  ) {}
}
