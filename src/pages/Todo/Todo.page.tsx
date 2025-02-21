import React from 'react';
import { AxiosResponse } from 'axios';

import { useReduxDispatch, useReduxSelector } from '../../store/hooks';
import * as todosSlice from '../../slices/todos.slice';
import { selectFromStore } from '../../store/store';

import { TyTodo } from '../../types/Todo.type';
import { TodoHeader } from '../../components/TodoHeader';
import { TodoItem } from '../../components/TodoItem';

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

  return (
    <div
      className="bg-gray-800 text-white font-robotomono-normal"
    >
      <div className="custom-page-container py-4 sm:py-6 md:py-10">
        <TodoHeader
          onCreate={addTodo}
        />
        <div data-cy="TodoList">
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
