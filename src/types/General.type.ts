import * as R from 'react';

/* eslint @typescript-eslint/no-namespace: 'off' */
export namespace TyGeneral {
  // To have autocompletion and avoid mistypes
  export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
  export type Status = 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';

  export type SetState<T> = R.Dispatch<R.SetStateAction<T>>;
  export type UseState<T> = (initSt: T | (() => T)) => [T, SetState<T>];
}
