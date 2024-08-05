/* eslint @typescript-eslint/no-namespace: 'off' */
import { RegisterOptions } from "react-hook-form";
import { TyAuth } from "./Auth.type";

export namespace TyForm {
  export type Validation<T extends TyForm.Auth> = {
    [K in keyof T]: RegisterOptions<T>;
  };

  export interface Auth extends TyAuth.CreationAttributes {
    password: string;
  }
}