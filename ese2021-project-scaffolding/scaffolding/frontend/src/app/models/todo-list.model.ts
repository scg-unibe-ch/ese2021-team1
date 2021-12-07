import { TodoItem } from './todo-item.model';
 /**
  * @param listId
  * @param name
  * @param todoItems
  */

export class TodoList {

  constructor(
    public listId: number,
    public name: string,
    public todoItems: TodoItem[]
  ) {}
}
