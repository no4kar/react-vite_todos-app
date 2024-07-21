import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../slices/todosSlice';

// collect all *Slice.reducer from *Slice.ts
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export function selectFromStore(stateName: keyof RootState) {
  return (state: RootState) => state[stateName];
}
