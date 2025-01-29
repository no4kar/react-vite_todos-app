import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';

import { TyTask as TySlice } from '../types/Task.type';
import { tasksApi as sliceApi } from '../api/tasks.api';

const sliceName = 'tasks';

export const getAllThunk: AsyncThunk<
  TySlice.Response.GetAll,
  TySlice.Request.GetAll,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/getAllThunk`,
  sliceApi.getAll,
);

export const createThunk: AsyncThunk<
  TySlice.Response.Create,
  TySlice.Request.Create,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/createThunk`,
  sliceApi.create,
);

export const removeThunk: AsyncThunk<
  TySlice.Item['id'],
  TySlice.Item['id'],
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/removeThunk`,
  sliceApi.remove,
);

export const updateThunk: AsyncThunk<
  TySlice.Response.Update,
  TySlice.Request.Update,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/updateThunk`,
  sliceApi.update,
);

const initialState: {
  // selected: TySlice.Item | null;
  items: TySlice.Item[];
  status: TySlice.Status;
  errorMsg: TySlice.Error;
} = {
  // selected: null,
  items: [] as TySlice.Item[],
  status: TySlice.Status.NONE,
  errorMsg: TySlice.Error.NONE,
};

export const {
  actions: { // export the actions
    errorReset,
    // select,
    reset,
  },
  reducer,
} = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    errorReset(state) {
      state.status = TySlice.Status.NONE;
      state.errorMsg = TySlice.Error.NONE;
    },

    // select(state, action: { payload: TySlice.Item['id'] }) {
    //   state.selected
    //     = state.items.find((item) =>
    //       item.id === action.payload)
    //     || null;
    // },

    reset(state) {
      // state.selected = null;
      state.items = [];
      state.status = TySlice.Status.NONE;
      state.errorMsg = TySlice.Error.NONE;
    },
  },

  extraReducers: (builder) => {
    builder // getAllThunk
      .addCase(getAllThunk.pending, (state) => {
        state.status = TySlice.Status.LOADING;
        state.errorMsg = TySlice.Error.NONE;
      })
      .addCase(getAllThunk.fulfilled, (state, action) => {
        state.items = action.payload.content;
        state.status = TySlice.Status.NONE;
      })
      .addCase(getAllThunk.rejected, (state, action) => {
        console.error(action.error.message);

        state.status = TySlice.Status.ERROR;
        state.errorMsg = TySlice.Error.LOAD;
      });

    builder // createThunk
      .addCase(createThunk.pending, (state) => {
        state.status = TySlice.Status.LOADING;
        state.errorMsg = TySlice.Error.NONE;
      })
      .addCase(createThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = TySlice.Status.NONE;
      })
      .addCase(createThunk.rejected, (state, action) => {
        console.error(action.error.message);

        state.status = TySlice.Status.ERROR;
        state.errorMsg = TySlice.Error.UNABLE_ADD;
      });

    builder // removeThunk
      .addCase(removeThunk.pending, (state) => {
        state.status = TySlice.Status.LOADING;
        state.errorMsg = TySlice.Error.NONE;
      })
      .addCase(removeThunk.fulfilled, (state, action) => {
        state.items
          = state.items.filter(item => item.id !== action.payload);
        state.status = TySlice.Status.NONE;
      })
      .addCase(removeThunk.rejected, (state, action) => {
        console.error(action.error.message);

        state.status = TySlice.Status.ERROR;
        state.errorMsg = TySlice.Error.UNABLE_DELETE;
      });

    builder // updateThunk
      .addCase(updateThunk.pending, (state) => {
        state.status = TySlice.Status.LOADING;
        state.errorMsg = TySlice.Error.NONE;
      })
      .addCase(updateThunk.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        state.items = state.items.map(item => (
          item.id !== updatedItem.id ? item : updatedItem));
        state.status = TySlice.Status.NONE;
      })
      .addCase(updateThunk.rejected, (state, action) => {
        console.error(action.error.message);

        state.status = TySlice.Status.ERROR;
        state.errorMsg = TySlice.Error.UNABLE_UPDATE;
      });
  },
});
