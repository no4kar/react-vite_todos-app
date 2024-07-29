import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { TyTodo } from '../types/Todo.type';
import { TyForm } from '../types/Form.type';

const sliceName = 'author';

const initialState: {
  id: TyTodo.Item['userId'];
  loaded: boolean;
  checked: boolean;
} = {
  id: '11967',
  loaded: false,
  checked: false,
};

export const {
  actions: {
    login,
  },
  reducer,
} = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<TyForm.Auth>,
    ) {

      console.info(action.payload);

      state.checked = true;
      state.loaded = true;

      return state;
    },
  },
  // extraReducers: (builder) => {

  // },
});
