export class Post {
  constructor(
    public title: string,
    public text: string,
    public image: Blob,
    public category: string,
    public upvotes: number,
    public downvotes: number,
    public created_at: String,
    public userId: string,
    public id: number
  ) {}
}
