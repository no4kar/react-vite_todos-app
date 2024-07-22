import React from 'react';

import { TyChangeEvtTextAreaElmt } from '../types/General';
import { TyTodo } from '../types/Todo';
import { useReduxSelector } from '../store/hooks';

export const TodoHeader = React.memo(FuncComponent);

function FuncComponent({
  onCreate,
  // onToggleAll = () => { },
  onError = () => { },
  // isEachTodoComplete = false,
}: {
  onCreate: (todo: TyTodo.CreationAttributes) => Promise<TyTodo.Item | void>;
  onToggleAll?: () => void;
  onError?: (errMsg: TyTodo.Error) => void;
  isEachTodoComplete?: boolean;
}) {
  const [title, setTitle] = React.useState('');
  const titleInput = React.useRef<HTMLTextAreaElement>(null);
  const { id: userId } = useReduxSelector(state => state.author);

  const handleInputChange = (event: TyChangeEvtTextAreaElmt) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimedTitle = title.trim();

    if (trimedTitle === '') {
      onError(TyTodo.Error.EMPTY_TITLE);
      return;
    }

    if (titleInput.current?.disabled) {
      return;
    }

    if (titleInput.current) {
      titleInput.current.disabled = true;
    }

    onCreate({
      userId,
      title: trimedTitle,
      completed: false,
    }).finally(() => {

      console.info('TodoHeader');

      if (titleInput.current) {
        titleInput.current.disabled = false;
        titleInput.current.focus();
      }

      setTitle('');
    });
  };

  React.useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus();
    }
  }, [titleInput]);

  return (
    <header className="todo__header">
      <h1 className="text-3xl font-bold text-center mb-4">The Task Manager</h1>
      {/* this buttons is active only if there are some active todos */}
      {/* <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: isEachTodoComplete,
        })}
        data-cy="ToggleAllButton"
        aria-label="ToggleAllButton"
        onClick={onToggleAll}
      /> */}

      {/* Add a todo on form submit */}
      <form
        className='flex space-x-2 mb-4'
        onSubmit={handleSubmit}
      >
        <textarea
          ref={titleInput}
          className='flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400'
          value={title}
          onChange={handleInputChange}
          placeholder='What are you planning to do?'
          rows={4}
        />

        <button
          type='submit'
          // onClick={addTodo}
          className="bg-yellow-500 text-black px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>
    </header>
  );
}
