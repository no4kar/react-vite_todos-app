import cn from 'classnames';
import { Filter } from '../types/Filter.type';

type Props = {
  filter: Filter.State;
  onFilterChange?: (v: Filter.State) => void;
  onClearCompleted?: () => void;
  quantityActiveTodos: number;
  isAnyTodoComplete: boolean;
};

export const TodoFooter: React.FC<Props> = ({
  filter,
  onFilterChange = () => { },
  onClearCompleted = () => { },
  quantityActiveTodos,
  isAnyTodoComplete,
}) => {
  const handleFilterChange = (v: Filter.State) => () => onFilterChange(v);

  return (
    <footer className='todoapp__footer' data-cy='Footer'>
      <span className="todo-count" data-cy="TodosCounter">
        {`${quantityActiveTodos} item${quantityActiveTodos <= 1 ? '' : 's'} left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filter === Filter.State.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={handleFilterChange(Filter.State.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === Filter.State.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={handleFilterChange(Filter.State.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Filter.State.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterChange(Filter.State.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={!isAnyTodoComplete}
      >
        Clear completed
      </button>
    </footer>
  );
};
