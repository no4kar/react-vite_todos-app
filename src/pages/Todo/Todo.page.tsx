import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { useReduxDispatch, useReduxSelector } from '../../store/hooks';
import * as todosSlice from '../../slices/todos.slice';
import * as tasksSlice from '../../slices/tasks.slice';
import { selectFromStore } from '../../store/store';

import { TyTodo } from '../../types/Todo.type';
import { TodoHeader } from '../../components/TodoHeader';
import { TodoItem } from '../../components/TodoItem';
import { Pagination } from '../../components/Pagination';
import { ItemsPerPage } from '../../components/ItemsPerPage';
import { createSearchParamUpdater } from '../../utils/helpers';
import { TyTask } from '../../types/Task.type';
import { TyEvt } from '../../types/Evt.type';

export const TodoPage
  = React.memo(FuncComponent);

function FuncComponent() {
  const [
    totalItems,
    setTotalItems
  ] = React.useState<number>(0);
  const [
    processings,
    setProcessings
  ] = React.useState<TyTodo.Item['id'][]>([]);
  const {
    items: todos,
  } = useReduxSelector(selectFromStore('todos'));
  const {
    selected: selectedTask,
  } = useReduxSelector(selectFromStore('tasks'));
  const dispatch = useReduxDispatch();
  const [
    searchParams,
    setSearchParams,
  ] = ReactRouterDom.useSearchParams();

  const updateSearchParams
    = React.useCallback(
      createSearchParamUpdater(setSearchParams),
      [setSearchParams],
      //[] // must be empty or strats doing wird things
    );

  const selectedTaskId
    = searchParams.get(TyTask.SearchParams.ID);
  const itemsPerPage
    = Number(searchParams.get(TyTask.SearchParams.ITEM_PER_PAGE));
  const currentPage
    = Number(searchParams.get(TyTask.SearchParams.PAGE));

  const addTodo = (newTodo: TyTodo.CreationAttributes) => {
    return dispatch(todosSlice.createThunk(newTodo))
      .then<TyTodo.Item>((response) => (
        response.payload as AxiosResponse<TyTodo.Item>).data);
  };

  const deleteTodo = React.useCallback(
    async (todo: TyTodo.Item) => {
      setProcessings(prev => [...prev, todo.id]);

      return dispatch(todosSlice.removeThunk(todo.id))
        .finally(() => setProcessings(prev =>
          prev.filter(item => item !== todo.id)));
    }, [dispatch]);

  const updateTodo = React.useCallback(
    async (updatedTodo: TyTodo.Item) => {
      setProcessings(prev => [...prev, updatedTodo.id]);

      return dispatch(todosSlice.updateThunk(updatedTodo))
        .finally(() => setProcessings(prev =>
          prev.filter(item => item !== updatedTodo.id)));
    }, [dispatch]);



  // if URL without id, select null task and reset todos
  React.useEffect(() => {
    if (!selectedTaskId) {
      updateSearchParams(searchParams, {
        [TyTask.SearchParams.ID]: null,
        [TyTask.SearchParams.PAGE]: null,
        [TyTask.SearchParams.ITEM_PER_PAGE]: null,
      });

      dispatch(tasksSlice.select(''));
      dispatch(todosSlice.reset());
    }
  }, [searchParams, selectedTaskId, updateSearchParams, dispatch]);

  // defualt pagable sets and first request
  React.useEffect(() => {
    if (selectedTask) {
      const defaultParams = {
        itemsPerPage: '5',
        page: '1',
        name: selectedTask.name,
        id: selectedTask.id,
      };

      updateSearchParams(searchParams, {
        [TyTask.SearchParams.ID]: defaultParams.id,
        [TyTask.SearchParams.PAGE]: defaultParams.page,
        [TyTask.SearchParams.ITEM_PER_PAGE]: defaultParams.itemsPerPage,
      });
    }
  }, [selectedTask]);

  // tracking changes in search parameters
  React.useEffect(() => {
    if (selectedTaskId) {
      dispatch(todosSlice.getAllThunk({
        taskId: selectedTaskId || '',
        page: currentPage,
        size: itemsPerPage,
      })).then((action) => {
        if (todosSlice.getAllThunk.fulfilled.match(action)) {
          setTotalItems(action.payload.total);
        }
      });
    }
  }, [selectedTaskId, currentPage, itemsPerPage, dispatch]);

  return (
    <div
      className="
      h-full
      bg-gray-800 text-white font-robotomono-normal"
    // border border-red-500
    >
      <div
        className="custom-page-container 
      py-4 sm:py-6 md:py-10
      space-y-4 sm:space-y-6"
      >
        <TodoHeader
          onCreate={addTodo}
        />

        {selectedTaskId && (
          <>
            <div
              className="p-4 
          flex flex-col sm:flex-row items-center justify-between gap-4
        bg-gray-700 rounded-md shadow-md"
            >
              <ItemsPerPage
                selected={itemsPerPage}
                options={[5, 10, 20]}
                handlersFor={{
                  select: {
                    onChange: (event: TyEvt.Change.SelectElmt) => {
                      updateSearchParams(searchParams, {
                        [TyTask.SearchParams.ITEM_PER_PAGE]: event.target.value,
                        [TyTask.SearchParams.PAGE]: '1',
                      })
                    }
                  }
                }}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / itemsPerPage)}
                handlersFor={{
                  btnPrev: {
                    onClick: () => updateSearchParams(searchParams, {
                      [TyTask.SearchParams.PAGE]: String(currentPage - 1),
                    })
                  },
                  btnPage: {
                    onClick: (event) => {
                      updateSearchParams(searchParams, {
                        [TyTask.SearchParams.PAGE]:
                          (event.target as HTMLButtonElement).dataset.page || null,
                      })
                    }
                  },
                  btnNext: {
                    onClick: () => updateSearchParams(searchParams, {
                      [TyTask.SearchParams.PAGE]: String(currentPage + 1),
                    })
                  },
                }}
              />
            </div>

            <div
              data-cy="TodoList"
              className="max-h-80 sm:max-h-96
            overflow-y-scroll no-scrollbar"
            >
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                  isProcessed={processings.includes(todo.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
