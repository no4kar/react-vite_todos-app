import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, AsyncThunk } from '@reduxjs/toolkit';

import { TyTodo } from '../types/Todo';
import * as todosApi from '../api/todos';

const sliceName = 'todos';

export type TodosState = {
  items: TyTodo.Item[];
  loaded: boolean,
  errorMsg: TyTodo.Error,
};

const initialState: TodosState = {
  items: [] as TyTodo.Item[],
  loaded: false,
  errorMsg: TyTodo.Error.NONE,
};


export const fetchAllThunk: AsyncThunk<
  TyTodo.Response.Get,
  TyTodo.Request.GetQuery,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/fetchAllThunk`,
  todosApi.getAll,
);

const todosSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    add(state, action: PayloadAction<TyTodo.Item>) {
      state.items.push(action.payload);
    },

    update(state, action: PayloadAction<TyTodo.Item>) {
      const index
        = state.items.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    remove(state, action: PayloadAction<string>) {
      state.items
        = state.items.filter(item => item.id !== action.payload);
    },

    clean(state) {
      state.items = [];
    },

    loaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },

    errorMsg(state, action: PayloadAction<TyTodo.Error>) {
      state.errorMsg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllThunk.pending, (state) => {
        state.loaded = false;
        state.errorMsg = TyTodo.Error.NONE;
      })
      .addCase(fetchAllThunk.fulfilled, (state, action) => {
        state.items = action.payload.content;
        state.loaded = true;
      })
      .addCase(fetchAllThunk.rejected, (state, action) => {
        console.error(action.error.message);

        state.loaded = true;
        state.errorMsg = TyTodo.Error.LOAD;
      });
  },
});

export const {
  add, update, remove, clean, loaded, errorMsg,
} = todosSlice.actions;
export default todosSlice.reducer;
