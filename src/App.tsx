import React from 'react';
import { TyTodo } from './types/Todo';

import { useReduxDispatch, useReduxSelector } from './store/hooks';
import * as todosSlice from './slices/todosSlice';
import { selectFromStore } from './store/store';

import { TodoItem } from './components/TodoItem';
import { TodoHeader } from './components/TodoHeader';
import { AxiosResponse } from 'axios';

// import { TodoHeader } from './components/TodoHeader';
// import { TodoFooter } from './components/TodoFooter';
// import { ErrorNotification } from './components/ErrorNotification';
// import { TodoItem } from './components/TodoItem';

// import { TyTodo } from './types/Todo';
// import * as todosApi from './api/todos';
// import { Filter } from './types/Filter';
// import { getPraperedTodos } from './services/todos';

export const App = React.memo(FuncComponent);

function FuncComponent() {
  // const [title, setTitle] = React.useState('');
  // const [processings, setProcessings] = React.useState<TyTodo.Item['id'][]>([]);
  const { items: todos } = useReduxSelector(selectFromStore('todos'));
  const { id: userId } = useReduxSelector(selectFromStore('author'));
  const dispatch = useReduxDispatch();

  const addTodo = (newTodo: TyTodo.CreationAttributes) => {
    return dispatch(todosSlice.createThunk(newTodo))
      .then<TyTodo.Item>((response) => {

        console.info(response.payload);

        return (response.payload as AxiosResponse<TyTodo.Item, any>).data;
      });
  };

  // const toggleComplete = (todo: TyTodo.Item) => {
  //   dispatch(todosSlice.update({ ...todo, completed: !todo.completed }));
  // };

  const deleteTodo = React.useCallback(
    async (todo: TyTodo.Item) => {
      return dispatch(todosSlice.removeThunk(todo.id))
        .then<void>((response) => {

          console.info(response.payload);

        });
    }, [dispatch]);

  React.useEffect(() => {
    dispatch(todosSlice.getAllThunk({ userId }));
  }, [dispatch, userId])

  return (
    <div
      className="min-h-screen bg-gray-800 text-white">
      <div className="custom-page-container py-5">
        <TodoHeader
          onCreate={addTodo}
        />

        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// function Component() {
//   const {
//     items: todos,
//     loaded,
//     errorMsg: todoErrorMsg,
//   } = useAppSelector(state => state.todos);
//   const dispatch = useAppDispatch();

//   const [tempTodo, setTempTodo] = useState<TyTodo.Item | null>(null);
//   const [errorMsg, setErrorMsg] = useState<TyTodo.Error>(todoErrorMsg);
//   const [filter, setFilter] = useState<Filter>(Filter.ALL);
//   const [processings, setProcessings] = useState<number[]>([]);

//   const visibleTodos = useMemo(
//     () => getPraperedTodos(todos, filter),
//     [todos, filter],
//   );
//   const activeTodos = useMemo(
//     () => getPraperedTodos(todos, Filter.ACTIVE),
//     [todos],
//   );
//   const isAnyTodoComplete = (): boolean => todos.some(todo => todo.completed);
//   const isAnyTodo = !!todos.length;
//   const isEachTodoComplete
//     = isAnyTodo && todos.every(todo => todo.completed);

//   const handleFilterChange = (v: Filter) => setFilter(v);

//   const addProcessing = (id: number) => {
//     setProcessings(crntIds => [...crntIds, id]);
//   };

//   const removeProcessing = (id: number) => {
//     setProcessings(crntIds => crntIds.filter(crntId => crntId !== id));
//   };

//   const addTodo = useCallback(
//     (todo: Omit<TyTodo.Item, 'id' | 'userId'>)
//     : Promise<TyTodo.Item | void> => {
//       setTempTodo({ ...todo, userId: USER_ID, id: '0' });

//       dispatch(todosSlice.loaded(false));

//       return todosApi.create({ ...todo, userId: USER_ID })
//         .then((createdTodo) => {
//           dispatch(todosSlice.add(createdTodo));
//         })
//         .catch(() => {
//           dispatch(todosSlice.errorMsg(TyTodo.Error.UNABLE_UPDATE));
//         })
//         .finally(() => {
//           setTempTodo(null);
//           dispatch(todosSlice.loaded(true));
//         });
//     },
//     [],
//   );

//   const deleteTodo = useCallback(
//     (todoId: number)
//     : Promise<void> => {
//       addProcessing(todoId);

//       return todosApi.remove(todoId)
//         .then(() => {
//           dispatch(todosSlice.remove(todoId));
//         })
//         .catch(() => {
//           dispatch(todosSlice.errorMsg(TyTodo.Error.UNABLE_DELETE));
//         })
//         .finally(() => {
//           removeProcessing(todoId);
//         });
//     },
//     [],
//   );

//   const updateTodo = useCallback(
//     (updatedTodo: TyTodo.Item)
//     : Promise<void> => {
//       const { id } = updatedTodo;

//       addProcessing(id);

//       return todosApi.update(updatedTodo)
//         .then((todoFromServer: TyTodo.Item) => {
//           dispatch(todosSlice.update(todoFromServer));
//         })
//         .catch(() => {
//           dispatch(todosSlice.errorMsg(TyTodo.Error.UNABLE_UPDATE));
//         })
//         .finally(() => {
//           removeProcessing(id);
//         });
//     },
//     [],
//   );

//   const toggleAll = () => {
//     (isEachTodoComplete ? todos : activeTodos).forEach(todo => {
//       updateTodo({ ...todo, completed: !isEachTodoComplete });
//     });
//   };

//   const deleteCompletedTodos = () => {
//     getPraperedTodos(todos, Filter.COMPLETED)
//       .forEach(todo => deleteTodo(todo.id));
//   };

//   useEffect(() => {
//     console.info(`todosSlice.fetchAll(${USER_ID})`);
//     dispatch(todosSlice.fetchAllThunk(USER_ID));
//   }, [USER_ID]);

//   return (
//     <div className="todoapp">
//       <h1 className="todoapp__title">todos</h1>

//       <div className="todoapp__content">
//         <TodoHeader
//           onAddTodo={addTodo}
//           onToggleAll={toggleAll}
//           onErrorCreate={(errMsg: TyTodo.Error) => setErrorMsg(errMsg)}
//           isEachTodoComplete={isEachTodoComplete}
//         />

//         {isAnyTodo && (
//           <>
//             <section className="todoapp__main" data-cy="TodoList">
//               {visibleTodos.map(todo => (
//                 <TodoItem
//                   key={todo.id}
//                   todo={todo}
//                   onDeleteTodo={deleteTodo}
//                   onUpdateTodo={updateTodo}
//                   isProcessed={processings.includes(todo.id)}
//                 />
//               ))}

//               {tempTodo && (
//                 <TodoItem
//                   key={tempTodo.id}
//                   todo={tempTodo}
//                   isProcessed
//                 />
//               )}
//             </section>

//             <TodoFooter
//               filter={filter}
//               onFilterChange={handleFilterChange}
//               onClearCompleted={deleteCompletedTodos}
//               quantityActiveTodos={activeTodos.length}
//               isAnyTodoComplete={isAnyTodoComplete()}
//             />
//           </>
//         )}
//       </div>

//       {loaded && errorMsg
//       && (
//         <ErrorNotification
//           errorMsg={errorMsg}
//           onErrorDelete={() => setErrorMsg(TyTodo.Error.NONE)}
//         />
//       )}
//     </div>
//   );
// }
