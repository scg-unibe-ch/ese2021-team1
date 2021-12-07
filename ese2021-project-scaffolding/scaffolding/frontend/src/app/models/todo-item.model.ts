export class TodoItem {
/**
  * @param itemId
  * @param listId
  * @param name
  * @param image
  * @param dones
  */

  constructor(
    public itemId: number,
    public listId: number,
    public name: string,
    public image: string,
    public done: boolean
  ) {}
}
