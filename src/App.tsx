import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';

export const App = React.memo(FuncComponent);

function FuncComponent() {

  React.useEffect(() => {
  }, []);

  return (
    <div
      className="
      min-h-screen 
      bg-gray-800 text-white font-robotomono-normal
      grid grid-cols-1 grid-rows-[auto,1fr,auto]"
    >
      <header>
        <div className='h-10 custom-page-container bg-gray-900' />
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer>
        <div className='h-10 custom-page-container bg-gray-900' />
      </footer>
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
