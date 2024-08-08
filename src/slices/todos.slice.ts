import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, AsyncThunk } from '@reduxjs/toolkit';

import { TyTodo } from '../types/Todo.type';
import { todosApi } from '../api/todos.api';

const sliceName = 'todos';

const initialState: {
  items: TyTodo.Item[];
  loaded: boolean,
  errorMsg: TyTodo.Error,
} = {
  items: [] as TyTodo.Item[],
  loaded: false,
  errorMsg: TyTodo.Error.NONE,
};

export const getAllThunk: AsyncThunk<
  TyTodo.Response.GetAll,
  TyTodo.Request.GetAll,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/getAllThunk`,
  todosApi.getAll,
);

export const createThunk: AsyncThunk<
  TyTodo.Response.Create,
  TyTodo.Request.Create,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/createThunk`,
  todosApi.create,
);

export const removeThunk: AsyncThunk<
  TyTodo.Item['id'],
  TyTodo.Item['id'],
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/removeThunk`,
  todosApi.remove,
);

export const updateThunk: AsyncThunk<
  TyTodo.Response.Update,
  TyTodo.Request.Update,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/updateThunk`,
  todosApi.update,
);


export const {
  actions: {
    errorReset,
  },
  reducer,
} = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    add(state, action: PayloadAction<TyTodo.CreationAttributes>) {
      const currentTime = (new Date()).toISOString();

      const newTodo: TyTodo.Item = {
        ...action.payload,
        id: String(state.items.length + 1),
        createdAt: currentTime,
        updatedAt: currentTime,
      };

      state.items.push(newTodo);
    },

    update(state, action: PayloadAction<TyTodo.Item>) {
      const index
        = state.items.findIndex(item => item.id === action.payload.id);

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    remove(state, action: PayloadAction<TyTodo.Item>) {
      state.items
        = state.items.filter(item => item.id !== action.payload.id);
    },

    clean(state) {
      state.items = [];
    },

    errorReset(state) {
      state.errorMsg = TyTodo.Error.NONE;
    },
  },
  extraReducers: (builder) => {
    builder // getAllThunk
      .addCase(getAllThunk.pending, (state) => {
        state.loaded = false;
        state.errorMsg = TyTodo.Error.NONE;
      })
      .addCase(getAllThunk.fulfilled, (state, action) => {
        state.items = action.payload.content;
        state.loaded = true;
      })
      .addCase(getAllThunk.rejected, (state, action) => {
        console.error(action.error.message);
        state.loaded = true;
        state.errorMsg = TyTodo.Error.LOAD;
      });

    builder // createThunk
      .addCase(createThunk.pending, (state) => {
        state.loaded = false;
        state.errorMsg = TyTodo.Error.NONE;
      })
      .addCase(createThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loaded = true;
      })
      .addCase(createThunk.rejected, (state, action) => {
        console.error(action.error.message);
        state.loaded = true;
        state.errorMsg = TyTodo.Error.UNABLE_ADD;
      });

    builder // removeThunk
      .addCase(removeThunk.pending, (state) => {
        state.loaded = false;
        state.errorMsg = TyTodo.Error.NONE;
      })
      .addCase(removeThunk.fulfilled, (state, action) => {
        state.items
          = state.items.filter(item => item.id !== action.payload);
        state.loaded = true;
      })
      .addCase(removeThunk.rejected, (state, action) => {
        console.error(action.error.message);
        state.loaded = true;
        state.errorMsg = TyTodo.Error.UNABLE_DELETE;
      });

    builder // updateThunk
      .addCase(updateThunk.pending, (state) => {
        state.loaded = false;
        state.errorMsg = TyTodo.Error.NONE;
      })
      .addCase(updateThunk.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        console.info(action.payload);

        state.items = state.items.map(item => (
          item.id !== updatedItem.id ? item : updatedItem));
          
        state.loaded = true;
      })
      .addCase(updateThunk.rejected, (state, action) => {
        console.error(action.error.message);
        state.loaded = true;
        state.errorMsg = TyTodo.Error.UNABLE_UPDATE;
      });
  },
});
