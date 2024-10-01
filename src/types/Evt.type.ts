import * as R from 'react';

/* eslint @typescript-eslint/no-namespace: 'off' */
export namespace TyEvt {
  export namespace Change {
    export type InputElmt = R.ChangeEvent<HTMLInputElement>;
    export type TextAreaElmt = R.ChangeEvent<HTMLTextAreaElement>;
    export type ButtonElmt = R.ChangeEvent<HTMLButtonElement>;
    export type SelectElmt = R.ChangeEvent<HTMLSelectElement>;
  }

  export namespace Keybr {
    export type InputElmt = R.KeyboardEvent<HTMLInputElement>;
    export type TextAreaElmt = R.KeyboardEvent<HTMLTextAreaElement>;
  }

  export namespace Mouse {
    export type ButtonElmt = R.MouseEvent<HTMLButtonElement>;
  }
}
