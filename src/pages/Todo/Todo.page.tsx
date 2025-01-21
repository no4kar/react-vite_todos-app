import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { useReduxDispatch, useReduxSelector } from '../../store/hooks';
import * as todosSlice from '../../slices/todos.slice';
import { selectFromStore } from '../../store/store';

import { TyTodo } from '../../types/Todo.type';
import { TodoHeader } from '../../components/TodoHeader';
import { TodoItem } from '../../components/TodoItem';
import { Pagination } from '../../components/Pagination';
import { ItemsPerPage } from '../../components/ItemsPerPage';
import { createSearchParamUpdater } from '../../utils/helpers';
import { TyTask } from '../../types/Task.type';
import { TyEvt } from '../../types/Evt.type';

export const TodoPage = React.memo(FuncComponent);

function FuncComponent() {
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
      createSearchParamUpdater(searchParams, setSearchParams),
      [searchParams, setSearchParams]
    );

  const totalItems = todos.length;
  const itemsPerPage
    = Number(searchParams.get(TyTask.SearchParams.ITEM_PER_PAGE));

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

  React.useEffect(() => {
    if (selectedTask) {
      dispatch(todosSlice.getAllThunk({
        taskId: selectedTask.id,
      }));
    }
  }, [selectedTask, dispatch]);

  React.useEffect(() => {
    if (selectedTask) {
      updateSearchParams({
        [TyTask.SearchParams.ITEM_PER_PAGE]: '5',
        [TyTask.SearchParams.PAGE]: '1',
      });
    }
  }, [selectedTask, updateSearchParams]);

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
                  updateSearchParams({
                    [TyTask.SearchParams.ITEM_PER_PAGE]: event.target.value,
                  })
                }
              }
            }}
          />

          <Pagination
            currentPage={1}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            onPageChange={() => { }}
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
      </div>
    </div>
  );
}
