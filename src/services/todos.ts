import { Filter } from '../types/Filter';
import { TyTodo } from '../types/Todo';

export function getPraperedTodos(
  todos: TyTodo.Item[],
  filter: Filter,
): TyTodo.Item[] {
  return todos.filter(todo => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;

      case Filter.COMPLETED:
        return todo.completed;

      case Filter.ALL:
      default:
        return true;
    }
  });
}
