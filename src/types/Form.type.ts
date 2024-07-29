/* eslint @typescript-eslint/no-namespace: 'off' */
import { RegisterOptions } from "react-hook-form";

export namespace TyForm {
  export type Validation<T extends TyForm.Auth> = {
    [K in keyof T]: RegisterOptions<T>;
  };

  export type Auth = {
    email: string;
    password: string;
  };
}