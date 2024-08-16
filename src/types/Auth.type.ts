/* eslint @typescript-eslint/no-namespace: 'off' */
export namespace TyAuth {
  export type Item = {
    id: string;
    email: string;
  }

  export type CreationAttributes = Omit<Item, 'id'> & { password: string };

  export namespace Request {
    export type Login = CreationAttributes;
    export type Activation = { activationToken: string };
    export type Registration = CreationAttributes;
  }

  export namespace Response {
    export type Login = {
      user: Item,
      accessToken: string
    };
    export type Activation = {
      user: Item,
      accessToken: string
    };
    export type Registration = { message: string, error: any, };
    export type Refresh = {
      user: Item,
      accessToken: string
    };
  }

  export enum Status {
    NONE = 'none',
    UNAUTHENTICATED = 'unauthenticated',
    REGISTERED = 'registered',
    ACTIVATED = 'activated',
    LOADING = 'loading',
    ERROR = 'error',
  }
}
