import { RegisterOptions } from "react-hook-form";
import { TyForm } from "../types/Form.type";

export const authValidation: {
  email: RegisterOptions<TyForm.Auth>;
  password: RegisterOptions<TyForm.Auth>;
} = {
  email: {
    required: 'Будь ласка, введіть вашу пошту!',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: `Будь ласка, введіть коректний формат вашої електронної пошти! (name@email.com)`,
    },
  },
  password: {
    required: 'Будь ласка, введіть пароль!',
    pattern: {
      value: /^\w+$/,
      message: `Будь ласка, введіть коректний формат!`,
    },
  },
};

export const validation: {
  firstName: RegisterOptions;
  lastName: RegisterOptions;
  middleName: RegisterOptions;
  phoneNumber: RegisterOptions;
  email: RegisterOptions;
  password: RegisterOptions;
  agreement: RegisterOptions;
  message: RegisterOptions;
  city: RegisterOptions;
  delivery: RegisterOptions;
  payOption: RegisterOptions;
} = {
  firstName: {
    required: 'Будь ласка, введіть своє ім’я!',
    pattern: {
      value: /^[\p{L}']+$/u,
      message: 'Write your name correct(one word, no space)',
    },
    maxLength: {
      value: 20,
      message: 'Name is too long!',
    },
  },
  lastName: {
    required: 'Будь ласка, введіть своє прізвище!',
    pattern: {
      value: /^[\p{L}']+$/u,
      message: 'Write your lastName correct(one word, no space)',
    },
    maxLength: {
      value: 20,
      message: 'LastName is too long!',
    },
  },
  middleName: {
    required: 'Email Address is required',
    maxLength: {
      value: 20,
      message: 'MiddleName is too long!',
    },
  },
  phoneNumber: {
    required: 'Будь ласка, введіть ваш номер телефону!',
    pattern: {
      value: /^(\+380\s?)?(\d{2}\s?\d{3}\s?\d{2}\s?\d{2})$/,
      message: `Будь ласка, введіть коректний формат вашого номера телефон! (+380994724126)`,
    },
  },
  email: {
    required: 'Будь ласка, введіть вашу пошту!',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: `Будь ласка, введіть коректний формат вашої електронної пошти! (name@email.com)`,
    },
  },
  password: {
    required: 'Будь ласка, введіть пароль!',
    pattern: {
      value: /^\w+$/,
      message: `Будь ласка, введіть коректний формат!`,
    },
  },
  agreement: {
    required: `Будь ласка, поставте галочку, якщо ви даєте згоду на обробку ваших персональних даних`,
  },
  message: {
    required: 'Залиште будь-ласка повідомлення',
    maxLength: {
      value: 800,
      message: `Ваше повідомлення не повине перевищувати більше 800 символів!`,
    },
  },
  city: {
    required: 'Виберіть або введіть будь-ласка поштовий індекс та місто!',
  },
  delivery: {
    required: 'Виберіть будь-ласка спосіб доставки!',
  },
  payOption: {
    required: 'Виберіть будь-ласка спосіб оплати!',
  },
};
