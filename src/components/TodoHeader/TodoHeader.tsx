import React from 'react';
import cn from 'classnames';

import { TyEvt } from '../../types/Evt.type';
import { TyTodo } from '../../types/Todo.type';
import { TyTask } from '../../types/Task.type';

import { useReduxDispatch, useReduxSelector } from '../../store/hooks';
import { selectFromStore } from '../../store/store';
import { Loader } from '../Loader';
import { Dropdown } from '../Dropdown/Dropdown';
import * as tasksSlice from '../../slices/tasks.slice';

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
  const [
    title,
    setTitle,
  ] = React.useState('');
  const titleInput
    = React.useRef<HTMLTextAreaElement>(null);
  const {
    items: todos,
    status: todosStatus,
  } = useReduxSelector(selectFromStore('todos'));
  const {
    author,
  } = useReduxSelector(selectFromStore('author'));
  const {
    selected: selectedTask,
    items: tasks,
    status: tasksStatus,
  } = useReduxSelector(selectFromStore('tasks'));
  const dispatch
    = useReduxDispatch();

  const isLoading = todosStatus === TyTodo.Status.LOADING;

  const handleInputChange = (event: TyEvt.Change.TextAreaElmt) => {
    setTitle(event.target.value);
  };

  const handleSelectTask
    = React.useCallback(
      (taskId: TyTask.Item['id']) => {
        dispatch(tasksSlice.select(taskId));
      }, []);

  const handleCreateTask
    = React.useCallback(
      ({ name }: { name: TyTask.Item['name'] }) => {
        if (author) {
          dispatch(tasksSlice.createThunk({
            name,
            userId: author.id,
          })).then((action) => {
            if (tasksSlice.createThunk.fulfilled.match(action)) {
              dispatch(tasksSlice.select(action.payload.id));
            }
          });
        }
      }, [author]);

  const handleUpdateTask
    = React.useCallback(
      ({ name }: { name: TyTask.Item['name'] }) => {
        if (selectedTask) {
          dispatch(tasksSlice.updateThunk({
            ...selectedTask,
            name,
          })).then((action) => {
            if (tasksSlice.updateThunk.fulfilled.match(action)) {
              dispatch(tasksSlice.select(action.payload.id));
            }
          });
        }
      }, [selectedTask]);

  const handleRemoveTask
    = React.useCallback(
      (taskId: TyTask.Item['id']) => {
        dispatch(tasksSlice.removeThunk(taskId));
      }, []);

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

    if (!author
      || !selectedTask) {
      onError(TyTodo.Error.UNABLE_ADD);
      return;
    }

    onCreate({
      userId: author.id,
      taskId: selectedTask.id,
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

  React.useEffect(() => {
    if (author) {
      dispatch(tasksSlice.getAllThunk({
        userId: author.id,
      }));
    }
  }, [author, dispatch]);

  return (
    <header className='todo__header'>
      <h1
        className='mb-4 sm:mb-6 
        font-robotomono-bold text-2xl sm:text-3xl font-bold text-center'
      >
        The {author?.email}'s tasks
      </h1>

      <div
        className='mb-4 sm:mb-6 text-center'
      >
        <Dropdown
          items={tasks}
          selectedItem={selectedTask}
          isProcessing={tasksStatus === TyTask.Status.LOADING}
          onSelectItem={handleSelectTask}
          onCreateItem={handleCreateTask}
          onUpdateItem={handleUpdateTask}
          onRemoveItem={handleRemoveTask}
        />
      </div>

      {selectedTask && (
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
      )}
    </header>
  );
}
