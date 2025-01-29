import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { useReduxDispatch, useReduxSelector } from '../../store/hooks';
import * as todosSlice from '../../slices/todos.slice';
// import * as tasksSlice from '../../slices/tasks.slice';
import { selectFromStore } from '../../store/store';

import { TyTodo } from '../../types/Todo.type';
import { TaskHeader } from '../../components/TaskHeader';
import { TodoItem } from '../../components/TodoItem';
import { Pagination } from '../../components/Pagination';
import { ItemsPerPage } from '../../components/ItemsPerPage';
import { createSearchParamUpdater } from '../../utils/helpers';
import { TyTask } from '../../types/Task.type';
import { TyEvt } from '../../types/Evt.type';
import { env } from '../../constants/varsFromEnv';

export const TaskPage
  = React.memo(FuncComponent);

const optionsPerPage = [5, 10, 20];
const defualtPage = '1';

function FuncComponent() {
  const [
    totalItems,
    setTotalItems
  ] = React.useState<number>(0);
  const [
    processings,
    setProcessings
  ] = React.useState<TyTodo.Item['id'][]>([]);

  // Redux
  const {
    items: todos,
  } = useReduxSelector(selectFromStore('todos'));
  const {
    items: tasks,
  } = useReduxSelector(selectFromStore('tasks'));
  const dispatch = useReduxDispatch();

  // RRD
  const [
    searchParams,
    setSearchParams,
  ] = ReactRouterDom.useSearchParams();
  const updateSearchParams = React.useCallback(
    createSearchParamUpdater(setSearchParams),
    [setSearchParams],
  );
  const selectedTaskId
    = searchParams.get(TyTask.SearchParams.ID);
  const itemsPerPage
    = Number(searchParams.get(TyTask.SearchParams.ITEM_PER_PAGE));
  const currentPage
    = Number(searchParams.get(TyTask.SearchParams.PAGE));

  const selectedTask
    = tasks.find(task => task.id === selectedTaskId) || null;
  const totalPages
    = Math.ceil(totalItems / itemsPerPage);

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

      dispatch(todosSlice.reset());
      setTotalItems(0);
    }
  }, [searchParams, selectedTaskId, updateSearchParams, dispatch]);

  // defualt pagable sets and first request
  React.useEffect(() => {
    if (selectedTaskId) {
      updateSearchParams(searchParams, {
        [TyTask.SearchParams.PAGE]: defualtPage,
        [TyTask.SearchParams.ITEM_PER_PAGE]: String(optionsPerPage[0]),
      });
    }
  }, [selectedTaskId]);

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

  if (env.DEV_MODE) console.info(`
    selectedTaskId = ${selectedTaskId}
    selectedTask = ${selectedTask}
    totalItems = ${totalItems}
    itemsPerPage = ${itemsPerPage}
    totalPages = ${totalPages}
    `);

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
        <TaskHeader
          onCreate={addTodo}
        />
        {/* while todos are loading, totalItems is '0' and totalPages, as derivative, is 'infinity' */}
        {selectedTask && totalItems && (
          <>
            <div
              className="p-4 
          flex flex-col sm:flex-row items-center justify-between gap-4
        bg-gray-700 rounded-md shadow-md"
            >
              <ItemsPerPage
                selected={itemsPerPage}
                options={optionsPerPage}
                handlersFor={{
                  select: {
                    onChange: (event: TyEvt.Change.SelectElmt) => {
                      updateSearchParams(searchParams, {
                        [TyTask.SearchParams.ITEM_PER_PAGE]: event.target.value,
                        [TyTask.SearchParams.PAGE]: defualtPage,
                      })
                    }
                  }
                }}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
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
