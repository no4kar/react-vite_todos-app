import React from 'react';
import { TyTodo } from './types/Todo';
import { truncateString } from './utils/helpers';
import { useReduxDispatch, useReduxSelector } from './store/hooks';
import * as todosSlice from './slices/todosSlice';
import { selectFromStore } from './store/store';

// import { TodoHeader } from './components/TodoHeader';
// import { TodoFooter } from './components/TodoFooter';
// import { ErrorNotification } from './components/ErrorNotification';
// import { TodoItem } from './components/TodoItem';

// import { TyTodo } from './types/Todo';
// import * as todosApi from './api/todos';
// import { Filter } from './types/Filter';
// import { getPraperedTodos } from './services/todos';

const USER_ID = '11967';

export const App = FuncComponent;

function FuncComponent() {
  const [title, setTitle] = React.useState('');
  const { items: todos } = useReduxSelector(selectFromStore('todos'));
  const dispatch = useReduxDispatch();

  const addTodo = () => {
    const currentTime = (new Date()).toISOString();

    const newTodo: TyTodo.Item = {
      id: String(todos.length + 1),
      userId: USER_ID,
      title,
      completed: false,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    dispatch(todosSlice.add(newTodo));
    setTitle('');
  };

  const toggleComplete = (todo: TyTodo.Item) => {
    dispatch(todosSlice.update({ ...todo, completed: !todo.completed }));
  };

  const deleteTodo = (todo: TyTodo.Item) => {
    dispatch(todosSlice.remove(todo));
  };

  return (
    <div
      className="min-h-screen bg-gray-800 text-white">
      <div className="custom-page-container">
        <h1 className="text-3xl font-bold text-center mb-4">The Task Manager</h1>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            onClick={addTodo}
            className="bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Add Todo
          </button>
        </div>
        <div>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex flex-col space-y-6 p-4 mb-2 rounded ${todo.completed ? 'bg-gray-700' : 'bg-gray-600'}`}
            >
              <div className="flex justify-between">
                <div className='space-y-4'>
                  <div className="flex flex-col">
                    <h2 className={`text-xl font-bold ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                      {truncateString(todo.title, 7, '..')}
                    </h2>

                    <p className="text-sm font-light text-gray-400">
                      {(new Date(todo.createdAt)).toLocaleString('ua-UA', { timeZone: 'UTC' })}
                    </p>
                  </div>
                </div>

                <div
                  className="flex self-start flex-col gap-2 sm:flex-row"
                >
                  <button
                    onClick={() => toggleComplete(todo)}
                    className={`px-4 py-2 rounded ${todo.completed ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'}`}
                  >
                    {todo.completed ? 'Completed' : 'Todo'}
                  </button>

                  <button
                    onClick={() => deleteTodo(todo)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.title}
              </p>
            </div>
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
