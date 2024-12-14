/* eslint @typescript-eslint/no-namespace: 'off' */

import type { TyGeneral } from './General.type';

export namespace TyTodo {
  export type Item = {
    id: string;
    userId: string;
    taskId: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export type CreationAttributes = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;

  export namespace Request {
    export interface GetAll extends Partial<Omit<Item, 'id' | 'userId'>> {
      taskId: Item['taskId'],
      page?: number,
      size?: number,
    }
    export type Update = Item;
    export type Create = TyTodo.CreationAttributes;
  }

  export namespace Response {
    export type GetAll = TyGeneral.PageFomServer<Item>;
    export type Update = Item;
    export type Create = Item;
  }

  export enum Status {
    NONE = 'none',
    LOADING = 'loading',
    ERROR = 'error',
  }

  export enum Error {
    NONE = '',
    LOAD = 'Unable to load todos',
    EMPTY_TITLE = 'Title should not be empty',
    UNABLE_ADD = 'Unable to add a todo',
    UNABLE_DELETE = 'Unable to delete a todo',
    UNABLE_UPDATE = 'Unable to update a todo',
  }
}
