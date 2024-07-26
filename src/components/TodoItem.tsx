import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Loader } from './Loader';

import { TyTodo } from '../types/Todo';
// import { TyGeneral } from '../types/General';
import { truncateString } from '../utils/helpers';

export const TodoItem = React.memo(({
  todo,
  onDelete,
  onUpdate,
  // onUpdate = () => new Promise(() => { }),
  isProcessed = false,
}: {
  todo: TyTodo.Item;
  onDelete: (todo: TyTodo.Item) => Promise<any>;
  onUpdate: (updatedTodo: TyTodo.Item) => Promise<any>;
  isProcessed?: boolean;
}) => {
  const {
    // title,
    completed,
  } = todo;

  const [isEditing, setIsEditing] = useState(false);
  // const [newTitle, setNewTitle] = useState(title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

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

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (isProcessed) {
  //     return;
  //   }

  //   const trimmedTitle = newTitle.trim();

  //   switch (trimmedTitle) {
  //     case '':
  //       handleDeleteTodo();

  //       break;

  //     case title:
  //       setIsEditing(false);

  //       break;

  //     default:
  //       if (titleField.current) {
  //         titleField.current.disabled = true;
  //       }

  //       onUpdateTodo({ ...todo, title: trimmedTitle })
  //         .then(() => {
  //           setIsEditing(false);
  //           if (titleField.current) {
  //             titleField.current.disabled = false;
  //           }
  //         })
  //         .catch(() => titleField.current?.focus());

  //       break;
  //   }
  // };

  // const handleKeyUp = (event: TyKeybrEvtInputElmt) => {
  //   switch (event.key) {
  //     case 'Escape':
  //       setIsEditing(false);
  //       setNewTitle(title);

  //       break;

  //     default:

  //       break;
  //   }
  // };

  // const handleTodoChecked = (
  //   event: TyChangeEvtInputElmt,
  // ) => {
  //   onUpdateTodo({ ...todo, completed: event.target.checked });
  // };

  return (
    <div
      key={todo.id}
      className={cn('relative',
        'flex flex-col space-y-6 p-4 mb-2 rounded', {
        'bg-gray-700': completed,
        'bg-gray-600': !completed,
      })}
    >
      {isProcessed && (
        <Loader style={{ container: 'absolute' }} />
      )}

      {/* <div className="flex"> */}
      <div className='flex space-x-4'>
        <button
          onClick={handleToggleComplete}
          className={cn('px-4 py-2 rounded aspect-square text-white', {
            'bg-green-600': completed,
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
            {(new Date(todo.createdAt)).toLocaleString('ua-UA', { timeZone: 'UTC' })}
          </p>
        </div>

        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded bg-red-500 text-white "
        >
          <i className='w-4 aspect-square fa-solid fa-xmark' />
        </button>
      </div>

      {/* <div
          className="flex self-start flex-col gap-2 sm:flex-row"
        >
          <button
            onClick={handleToggleComplete}
            className={`px-4 py-2 rounded ${completed ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'}`}
          >
            <i className={cn('fa-circle', {
              'fa-solid ': completed,
              'fa-regular': !completed,
            })} />
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            <i className='fa-solid fa-xmark' />
          </button>
        </div> */}
      {/* </div> */}

      <p className={`text-sm ${completed ? 'line-through text-gray-400' : ''}`}>
        {todo.title}
      </p>
    </div>
  );
  // return (
  //   <div
  //     data-cy="Todo"
  //     className={cn('todo', {
  //       completed,
  //     })}
  //   >
  //     <label className="todo__status-label">
  //       <input
  //         data-cy="TodoStatus"
  //         type="checkbox"
  //         className="todo__status"
  //         checked={completed}
  //         onChange={handleTodoChecked}
  //       />
  //     </label>

  //     {!isEditing
  //       ? (
  //         <div>
  //           <span
  //             data-cy="TodoTitle"
  //             className="todo__title"
  //             onDoubleClick={() => setIsEditing(true)}
  //           >
  //             {title}
  //           </span>

  //           {/* Remove button appears only on hover */}
  //           <button
  //             type="button"
  //             className="todo__remove"
  //             data-cy="TodoDelete"
  //             aria-label="deleteTodo"
  //             onClick={handleDeleteTodo}
  //           >
  //             ×
  //           </button>
  //         </div>
  //       )
  //       : (
  //         <form
  //           onSubmit={handleSubmit}
  //         >
  //           {/* This form is shown instead of the title and remove button */}
  //           <input
  //             data-cy="TodoTitleField"
  //             type="text"
  //             className="todo__title-field"
  //             placeholder="Empty todo will be deleted"
  //             ref={titleField}
  //             value={newTitle}
  //             onChange={event => setNewTitle(event.target.value)}
  //             onBlur={handleSubmit}
  //             onKeyUp={handleKeyUp}
  //           />
  //         </form>
  //       )}

  //     {/* overlay will cover the todo while it is being updated */}
  //     <div
  //       data-cy="TodoLoader"
  //       className={cn('modal overlay', {
  //         'is-active': isProcessed,
  //       })}
  //     >
  //       <div className="modal-background has-background-white-ter" />
  //       <div className="loader" />
  //     </div>
  //   </div>
  // );
});
