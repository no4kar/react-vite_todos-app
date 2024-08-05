import React from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { useReduxDispatch, useReduxSelector } from '../../store/hooks';
import * as todosSlice from '../../slices/todos.slice';
import { selectFromStore } from '../../store/store';

import { TyTodo } from '../../types/Todo.type';
import { TodoHeader } from '../../components/TodoHeader';
import { TodoItem } from '../../components/TodoItem';
import { Notification } from '../../components/Notification';

export const TodoPage = React.memo(FuncComponent);

const responseToConsoleInfo = <T extends PayloadAction<any>>(response: T) => {
  console.info(response.payload);
  return response;
};

function FuncComponent() {
  const [processings, setProcessings] = React.useState<TyTodo.Item['id'][]>([]);
  const {
    items: todos,
    errorMsg,
  } = useReduxSelector(selectFromStore('todos'));
  const {
    author: { id: userId },
  } = useReduxSelector(selectFromStore('author'));
  const dispatch = useReduxDispatch();

  const addTodo = (newTodo: TyTodo.CreationAttributes) => {
    return dispatch(todosSlice.createThunk(newTodo))
      .then(responseToConsoleInfo)
      .then<TyTodo.Item>((response) => (
        response.payload as AxiosResponse<TyTodo.Item, any>).data);
  };

  const deleteTodo = React.useCallback(
    async (todo: TyTodo.Item) => {
      setProcessings(prev => [...prev, todo.id]);

      return dispatch(todosSlice.removeThunk(todo.id))
        .then(responseToConsoleInfo)
        .finally(() => setProcessings(prev =>
          prev.filter(item => item !== todo.id)));
    }, [dispatch]);

  const updateTodo = React.useCallback(
    async (updatedTodo: TyTodo.Item) => {
      setProcessings(prev => [...prev, updatedTodo.id]);

      return dispatch(todosSlice.updateThunk(updatedTodo))
        .then(responseToConsoleInfo)
        .finally(() => setProcessings(prev => 
          prev.filter(item => item !== updatedTodo.id)));
    }, [dispatch]);

  React.useEffect(() => {
    if (userId) {
      dispatch(todosSlice.getAllThunk({ userId }));
    }
  }, [dispatch, userId]);

  return (
    <div
      className="bg-gray-800 text-white font-robotomono-normal"
    >
      <div className="custom-page-container py-4 sm:py-6 md:py-10">
        <TodoHeader
          onCreate={addTodo}
        />
        <div
          data-cy="TodoList"
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

      {errorMsg && (
        <div
          className='fixed bottom-4 right-4'
        >
          <Notification onClose={() => dispatch(todosSlice.errorReset())}>
            <p>{errorMsg}</p>
          </Notification>
        </div>
      )}
    </div>
  );
}
