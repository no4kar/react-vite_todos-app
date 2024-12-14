import * as R from 'react';

/* eslint @typescript-eslint/no-namespace: 'off' */
export namespace TyGeneral {
  export type PageFomServer<T> = {
    /** The total number of items found based on the search parameters. */
    total: number,
    /** An array of items of type T, representing the current page's data. */
    content: T[],
    /** The maximum number of items that can be included on one page. */
    limit: number,
    /** The starting position or index of the current page's data in the overall dataset. */
    offset: number,
  };

  // To have autocompletion and avoid mistypes
  export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
  export type Status = 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';

  export type SetState<T> = R.Dispatch<R.SetStateAction<T>>;
  export type UseState<T> = (initSt: T | (() => T)) => [T, SetState<T>];
}
