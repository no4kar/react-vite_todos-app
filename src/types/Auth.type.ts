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
    export type Activation = Login;
    export type Registration = { message: string, error: any, };
  }

  export enum Error {
    NONE = '',
    REGISTRATION = 'Registration error',
  }
}
