import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

import { TyTodo } from '../types/Todo';

const sliceName = 'author';

// export type TodosState = {
//   items: TyTodo.Item[];
//   loaded: boolean,
//   // status: TyStatus,
//   errorMsg: TyTodo.Error,
// };

const initialState: {
  id: TyTodo.Item['userId'];
} = {
  id: '11967',
};

export const {
  reducer: authorReducer,
} = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    // update(state, action: PayloadAction<TyTodo.Item>) {

    // },
  },
  // extraReducers: (builder) => {

  // },
});
