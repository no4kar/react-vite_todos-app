/* eslint @typescript-eslint/no-namespace: 'off' */
type PageFomServer<T> = {
  count: number,
  content: T[],
};

export namespace TyTodo {
  export type Item = {
    id: string;
    userId: string;
    title: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export type CreationAttributes = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;
  
  export namespace Request {
    export interface GetAll extends Partial<Omit<Item, 'id' | 'userId'>> {
      userId: Item['userId'],
      page?: number,
      size?: number,
    }
    export type Update = Item;
    export type Create = TyTodo.CreationAttributes;
  }

  export namespace Response {
    export type GetAll = PageFomServer<Item>;
    export type Update = Item;
    export type Create = Item;
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
