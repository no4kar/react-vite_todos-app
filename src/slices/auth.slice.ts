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
  loaded: true,
  checked: true,
};

export const {
  reducer: authorReducer,
  actions: {
    login,
  }
} = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<TyForm.Auth>,
    ) {
      
      console.info(action.payload);

      return state;
    },
  },
  // extraReducers: (builder) => {

  // },
});
