import React from 'react';
import {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
  Path,
} from 'react-hook-form';
import cn from 'classnames';

export const FormField = FuncComponent;

function FuncComponent<T extends Record<string, any>>({
  type,
  textLabel,
  name,
  register,
  validation,
  errors,
  placeholder = '',
  required,
  style = {},
}: {
  type: React.HTMLInputTypeAttribute;
  textLabel?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  errors: FieldErrors<T>;
  placeholder?: string;
  required?: boolean;
  style?: {
    container?: string,
  },
}) {
  const hasError = errors[name];
  const {
    container = 'flex flex-col gap-2',
  } = style;

  return (
    <div className={container}>
      {textLabel && (
        <label
          htmlFor={name}
          className={cn('font-robotomono-normal font-normal text-base', {
            'text-system-error': hasError,
            'after:content-["*"] after:ml-0.5 after:text-system-error': required,
          })}
        >
          {textLabel}
        </label>
      )}

      {type === 'textarea' ? (
        <textarea
          id={name}
          placeholder={placeholder}
          className="
          h-8 text-black
          border-b border-black outline-none resize-none
          title"
          {...register(name, { ...validation })}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={cn(`h-8 py-3 
            border-b border-black outline-none text-black`, {
            'text-system-error': hasError,
          })}
          {...register(name, { ...validation })}
        />
      )}

      <p
        className={cn(
          'font-robotomono-light font-light text-xs text-system-error overflow-hidden',
          'transition-all duration-500 ease-in-out',
          {
            'h-0': !hasError,
            'h-4': hasError,
          })}
      >
        {(hasError?.message as string) || ''}
      </p>
    </div>
  );
};
