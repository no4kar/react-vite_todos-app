import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import { Loader } from '.././Loader';
import { TyTodo } from '../../types/Todo.type';
import { truncateString } from '../../utils/helpers';
import { TyGeneral } from '../../types/General.type';

export const TodoItem = React.memo(({
  todo,
  onDelete,
  onUpdate,
  isProcessed = false,
}: {
  todo: TyTodo.Item;
  onDelete: (todo: TyTodo.Item) => Promise<any>;
  onUpdate: (updatedTodo: TyTodo.Item) => Promise<any>;
  isProcessed?: boolean;
}) => {
  const {
    title,
    completed,
  } = todo;

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const titleField = useRef<HTMLTextAreaElement>(null);


  const handleDelete = () => {
    onDelete(todo)
      .then(() => setIsEditing(false))
      .catch(() => titleField.current?.focus());
  };

  const handleToggleComplete = () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    onUpdate(updatedTodo)
      .then(() => setIsEditing(false))
      .catch(() => titleField.current?.focus());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isProcessed) {
      return;
    }

    const trimmedTitle = newTitle.trim();

    switch (trimmedTitle) {
      case '':
        handleDelete();

        break;

      case title:
        setIsEditing(false);

        break;

      default:
        if (titleField.current) {
          titleField.current.disabled = true;
        }

        onUpdate({ ...todo, title: trimmedTitle })
          .then(() => {
            setIsEditing(false);
            if (titleField.current) {
              titleField.current.disabled = false;
            }
          })
          .catch(() => titleField.current?.focus());

        break;
    }
  };

  const handleKeyUp = (event: TyGeneral.KeybrEvtTextAreaElmt) => {
    switch (event.key) {
      case 'Escape':
        setIsEditing(false);
        setNewTitle(title);

        break;

      default:

        break;
    }
  };

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);
  
  return (
    <div
      className='relative'
    >
      {isProcessed && (
        <Loader
          style={{
            container: `absolute inset-0 z-[1] 
            flex items-center justify-center 
            bg-white bg-opacity-30 rounded`,
          }}
        />
      )}

      <div
        className={cn('flex flex-col space-y-6 p-4 mb-2 rounded', {
          'bg-gray-700': completed,
          'bg-gray-600': !completed,
          'pointer-events-none blur-[2px]': isProcessed,
        })}
      >
        <div className='flex space-x-4'>
          <button
            onClick={handleToggleComplete}
            className={cn(`px-4 py-2 rounded aspect-square 
              text-white hover:opacity-70`, {
              'bg-system-success': completed,
              'bg-gray-700': !completed,
            })}
          >
            <i className={cn('w-4 aspect-square fa-circle', {
              'fa-solid ': completed,
              'fa-regular': !completed,
            })} />
          </button>

          <div className="grow flex flex-col">
            <h2 className={cn('text-xl font-bold', {
              'line-through text-gray-400': completed,
            })}>
              {truncateString(todo.title, 11, '..')}
            </h2>

            <p className="text-sm font-light text-gray-400">
              {(new Date(todo.createdAt))
                .toLocaleString('ua-UA', { timeZone: 'UTC' })}
            </p>
          </div>

          <button
            onClick={handleDelete}
            className='px-4 py-2 rounded 
            bg-system-error text-white
            hover:opacity-70'
          >
            <i className='w-4 aspect-square fa-solid fa-xmark' />
          </button>
        </div>

        {isEditing ? (
          <form
            onSubmit={handleSubmit}
          >
            {/* This form is shown instead of the title and remove button */}
            <textarea
              data-cy="TodoTitleField"
              className='w-full max-h-[60vh]
              resize-y overflow-hidden
              flex-1 p-2 rounded'
              placeholder='Empty todo will be deleted'
              ref={titleField}
              value={newTitle}
              rows={(newTitle.match(/\n/g) || []).length + 1} // last row doest have '\n'
              onChange={event => {
                setNewTitle(event.target.value);
                // event.target.style.height = 'auto'; // Reset the height
                // event.target.style.height = `${event.target.scrollHeight}px`;
              }}
              onBlur={handleSubmit}
              onKeyUp={handleKeyUp}
            />
          </form>
        ) : (
          <p
            className={cn('text-sm whitespace-pre-wrap cursor-pointer', {
              'line-through text-gray-400': completed,
            })}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </p>
        )}
      </div>
    </div>
  );
});
