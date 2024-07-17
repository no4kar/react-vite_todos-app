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
  }

  export namespace Request {
    export interface GetQuery extends Partial<Omit<Item, 'id' | 'userId'>> {
      userId: Item['userId'],
      page?: number,
      size?: number,
    }
  }

  export namespace Response {
    export type Get = PageFomServer<TyTodo.Item>;
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
