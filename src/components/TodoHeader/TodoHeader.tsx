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
  onError = () => { },
}: {
  onCreate: (todo: TyTodo.CreationAttributes) => Promise<TyTodo.Item | void>;
  onToggleAll?: () => void;
  onError?: (errMsg: TyTodo.Error) => void;
  isEachTodoComplete?: boolean;
}) {
  const [title, setTitle] = React.useState('');
  const titleInput = React.useRef<HTMLTextAreaElement>(null);
  const {
    items: todos,
    status,
  } = useReduxSelector(selectFromStore('todos'));
  const {
    author,
  } = useReduxSelector(selectFromStore('author'));
  const isLoading = status === TyTodo.Status.LOADING;

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

    if (!author) {
      onError(TyTodo.Error.UNABLE_ADD);
      return;
    }

    onCreate({
      userId: author.id,
      title: trimedTitle,
      completed: false,
    }).finally(() => {
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
    <header className='todo__header'>
      <h1
        className='mb-4 sm:mb-6 
        font-robotomono-bold text-2xl sm:text-3xl font-bold text-center'
      >
        The {author?.email}'s tasks
      </h1>

      <form
        className='relative'
        onSubmit={handleSubmit}
      >
        {!todos.length && isLoading && (
          <Loader
            style={{
              container: `absolute inset-0 z-[1] 
            flex items-center justify-center 
            bg-white bg-opacity-30 rounded`,
            }}
          >
            <h1
              className='text-lg sm:text-xl font-bold 
                bg-transparent text-white animate-bounce'
            >
              Loading is in progress...
            </h1>
          </Loader>
        )}

        <div className={cn('flex space-x-2 mb-4', {
          'pointer-events-none blur-[2px]': !todos.length && isLoading,
        })}>
          <textarea
            ref={titleInput}
            className='flex-1 p-2 min-h-full rounded 
            bg-gray-700 text-white placeholder-gray-400'
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
