import { Filter } from '../types/Filter.type';
import { TyTodo } from '../types/Todo.type';

export function getPraperedTodos(
  todos: TyTodo.Item[],
  filter: Filter.State,
): TyTodo.Item[] {
  return todos.filter(todo => {
    switch (filter) {
      case Filter.State.ACTIVE:
        return !todo.completed;

      case Filter.State.COMPLETED:
        return todo.completed;

      case Filter.State.ALL:
      default:
        return true;
    }
  });
}
