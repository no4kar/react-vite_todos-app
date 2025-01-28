import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';

import { TyAuth as TySlice } from '../types/Auth.type';
import { authApi as sliceApi } from '../api/auth.api';
import { accessTokenApi } from '../api/accessToken.api';
import * as tasksSlice from './tasks.slice';

const sliceName = 'author';

export const registrationThunk: AsyncThunk<
  TySlice.Response.Registration,
  TySlice.Request.Registration,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/registrationThunk`,
  sliceApi.registration,
);

export const activationThunk: AsyncThunk<
  TySlice.Response.Activation,
  TySlice.Request.Activation['activationToken'],
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/activationThunk`,
  sliceApi.activation,
);

export const activationAndGetAllTasksThunk: AsyncThunk<
  TySlice.Response.Activation,
  TySlice.Request.Activation['activationToken'],
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/activationThunk`,
  async (activationToken: TySlice.Request.Activation['activationToken'],
    { dispatch },
  ) => {
    // Perform the activation API call
    const response
      = await sliceApi.activation(activationToken);

    // Use dispatch(activationThunk(activationToken)) to call the original activationThunk. The .unwrap() method is used to extract the payload from the fulfilled action or throw an error if rejected.
    // const response = await dispatch(activationThunk(activationToken)).unwrap();

    // Chain getAllThunk to fetch tasks for the activated user
    dispatch(tasksSlice.getAllThunk({
      userId: response.user.id,
    }));

    // Return the response for the fulfilled case in extraReducers
    return response;
  }
);

export const loginThunk: AsyncThunk<
  TySlice.Response.Login,
  TySlice.Request.Login,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/loginThunk`,
  sliceApi.login,
);

export const logoutThunk: AsyncThunk<
  void,
  void,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/logoutThunk`,
  sliceApi.logout,
);

export const refreshThunk: AsyncThunk<
  TySlice.Response.Refresh,
  void,
  Record<string, never>
> = createAsyncThunk(
  `${sliceName}/refreshThunk`,
  sliceApi.refresh,
);

const initialState: {
  author: TySlice.Item | null;
  status: TySlice.Status;
  errorMsg: string;
} = {
  author: null,
  status: TySlice.Status.UNAUTHENTICATED,
  errorMsg: TySlice.Error.NONE,
};

export const {
  actions: {
    errorReset,
    reset,
  },
  reducer,
} = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    errorReset(
      state,
    ) {
      state.status = TySlice.Status.NONE;
      state.errorMsg = TySlice.Error.NONE;
    },

    reset(state) {
      state.author = null;
      state.status = TySlice.Status.NONE;
      state.errorMsg = TySlice.Error.NONE;
    },
  },

  extraReducers: (builder) => {
    builder // registrationThunk
      .addCase(
        registrationThunk.pending,
        (state) => {
          state.errorMsg = TySlice.Error.NONE;
          state.status = TySlice.Status.LOADING;
        })
      .addCase(
        registrationThunk.fulfilled,
        (state) => {
          state.status = TySlice.Status.REGISTERED;
        })
      .addCase(
        registrationThunk.rejected,
        (state, action) => {
          console.error(action.error);

          state.errorMsg
            = action.error.message
            || TySlice.Error.REGISTERATION
          state.status = TySlice.Status.ERROR;
          state.author = null;
        });

    builder // activationThunk
      .addCase(
        activationThunk.pending,
        (state) => {
          state.errorMsg = TySlice.Error.NONE
          state.status = TySlice.Status.LOADING;
        })
      .addCase(
        activationThunk.fulfilled,
        (state, action) => {
          accessTokenApi.save(action.payload.accessToken);
          state.author = action.payload.user;
          state.status = TySlice.Status.ACTIVATED;
        })
      .addCase(
        activationThunk.rejected,
        (state, action) => {
          console.error(action.error); // Log the actual error message

          state.errorMsg
            = action.error.message
            || TySlice.Error.ACTIVATION; // Use the error message
          state.status = TySlice.Status.ERROR;
          state.author = null;
        });

    builder // loginThunk
      .addCase(
        loginThunk.pending,
        (state) => {
          state.errorMsg = TySlice.Error.NONE;
          state.status = TySlice.Status.LOADING;
        })
      .addCase(
        loginThunk.fulfilled,
        (state, action) => {
          accessTokenApi.save(action.payload.accessToken);
          state.author = action.payload.user;
          state.status = TySlice.Status.ACTIVATED;
        })
      .addCase(
        loginThunk.rejected,
        (state, action) => {
          console.error(action.error); // Log the actual error message

          state.errorMsg
            = action.error.message
            || TySlice.Error.LOGIN; // Use the error message
          state.status = TySlice.Status.ERROR;
          state.author = null;
        });

    builder // logoutThunk
      .addCase(
        logoutThunk.pending,
        (state) => {
          state.errorMsg = TySlice.Error.NONE;
          state.status = TySlice.Status.LOADING;
        })
      .addCase(
        logoutThunk.fulfilled,
        (state) => {
          accessTokenApi.remove();
          state.author = null;
          state.status = TySlice.Status.UNAUTHENTICATED;
        })
      .addCase(
        logoutThunk.rejected,
        (state, action) => {
          console.error(action.error); // Log the actual error message

          state.errorMsg
            = action.error.message
            || TySlice.Error.LOGOUT; // Use the error message
          state.status = TySlice.Status.ERROR;
          state.author = null;
        });

    builder // refreshThunk
      .addCase(
        refreshThunk.pending,
        (state) => {
          state.errorMsg = TySlice.Error.NONE;
          state.status = TySlice.Status.LOADING;
        })
      .addCase(
        refreshThunk.fulfilled,
        (state, action) => {
          accessTokenApi.save(action.payload.accessToken);
          state.author = action.payload.user;
          state.status = TySlice.Status.ACTIVATED;
        })
      .addCase(
        refreshThunk.rejected,
        (state, action) => {
          console.error(action.error); // Log the actual error message

          state.errorMsg
            = action.error.message
            || TySlice.Error.REFRESH; // Use the error message
          state.status = TySlice.Status.ERROR;
          state.author = null;
        });
  },
});
