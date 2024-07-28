import React from 'react';
import cn from 'classnames';

import { TyGeneral } from '../../types/General.type';
import { TyTodo } from '../../types/Todo.type';
import { useReduxSelector } from '../../store/hooks';
import { selectFromStore } from '../../store/store';
import { Loader } from '../Loader';

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
  const { items: todos, loaded } = useReduxSelector(selectFromStore('todos'));
  const { id: userId } = useReduxSelector(selectFromStore('author'));

  const handleInputChange = (event: TyGeneral.ChangeEvtTextAreaElmt) => {
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
      <h1 className="font-robotomono-bold text-3xl font-bold text-center mb-4">The Task Manager</h1>
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
        className='relative'
        onSubmit={handleSubmit}
      >
        {!todos.length && !loaded && (
          <Loader
            content={
              <h1
                className='text-xl font-bold bg-transparent text-white animate-bounce'>
                Loading is in progress...
              </h1>
            }
            style={{
              container: `absolute inset-0 z-[1] 
            flex items-center justify-center 
            bg-white bg-opacity-30 rounded`,
            }}
          />
        )}

        <div className={cn('flex space-x-2 mb-4', {
          'pointer-events-none blur-[2px]': !todos.length && !loaded,
        })}>
          <textarea
            ref={titleInput}
            className='flex-1 p-2 min-h-full rounded bg-gray-700 text-white placeholder-gray-400'
            value={title}
            onChange={handleInputChange}
            placeholder='What are you planning to do?'
            rows={4}
          />

          <button
            type='submit'
            className='px-4 py-2 rounded
            bg-system-warn text-black 
            hover:opacity-70'
          >
            <i className='fa-solid fa-plus' />
          </button>
        </div>
      </form>
    </header>
  );
}
