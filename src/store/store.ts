import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../slices/todos.slice';
import { authorReducer } from '../slices/auth.slice';

// collect all *Slice.reducer from *Slice.ts
export const store = configureStore({
  reducer: {
    todos: todosReducer,
    author: authorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export function selectFromStore<K extends keyof T, T = RootState>(stateName: K) {
  return (state: T) => state[stateName];
}
