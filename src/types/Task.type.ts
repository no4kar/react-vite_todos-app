/* eslint @typescript-eslint/no-namespace: 'off' */

export namespace TyTask {
  export type Item = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

  export type CreationAttributes = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;

  // export enum Status {
  //   NONE = 'none',
  //   LOADING = 'loading',
  //   ERROR = 'error',
  // }

  // export enum Error {
  //   NONE = '',
  //   LOAD = 'Unable to load todos',
  //   EMPTY_TITLE = 'Title should not be empty',
  //   UNABLE_ADD = 'Unable to add a todo',
  //   UNABLE_DELETE = 'Unable to delete a todo',
  //   UNABLE_UPDATE = 'Unable to update a todo',
  // }
}
