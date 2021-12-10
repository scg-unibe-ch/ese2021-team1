export class Comment {
  constructor(
    public postID: number,
    public commentID: number,
    public text: string,
    public reported: number
  ) {}

}
