// import React from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import cn from 'classnames';

import * as authSlice from '../../slices/auth.slice';
import { useReduxSelector, useReduxDispatch } from '../../store/hooks';
import { selectFromStore } from '../../store/store';

import { authValidation } from '../../constants/formValidation';
// import { Button } from '../../components/Button';
import { TyForm } from '../../types/Form.type';
import { FormField } from '../../components/FormField';
import { Loader } from '../../components/Loader';

export const LoginPage = FuncComponent;

function FuncComponent() {
  const location = useLocation();
  const { loaded, checked } = useReduxSelector(selectFromStore('author'));
  const dispatch = useReduxDispatch();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<TyForm.Auth>({
    defaultValues: {
      email: 'email@gmail.com',
      password: 'password',
    },
    mode: 'onBlur',
  });

  if (checked) {
    return (
      <Navigate
        to={location.state?.from?.pathname || '/'}
        replace
      />
    );
  }

  const onSubmit: SubmitHandler<TyForm.Auth>
    = async (data) => {
      try {
        dispatch(authSlice.login(data));

        // await login(data);
        // navigate(location.state?.from?.pathname || '/');
      } catch (error) {
        console.error(error);
        alert((error as AxiosError).message);
      }
    };

  return (
    <div
      className='
    custom-page-container space-y-6'
    >
      <div
        className="
          flex flex-col gap-6 items-center justify-center"
      >
        <h2
          className="font-robotomono-bold text-3xl font-bold uppercase"
        >
          Authorization form
        </h2>

        {/* <p
          className="font-robotomono-normal text-base font-normal text-system-error"
        >
          You can leave default values.
        </p> */}
      </div>

      <form
        className="
      w-full p-4
      rounded bg-gray-700
      flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {loaded
          ? <Loader />
          : (
            <div
              className="
          flex-1 flex flex-col gap-2"
            >
              <FormField<TyForm.Auth>
                type="email"
                textLabel="E-mail"
                name="email"
                register={register}
                errors={errors}
                required
                validation={authValidation.email}
                placeholder="some@email.com"
              />

              <FormField<TyForm.Auth>
                type="password"
                textLabel="Password"
                name="password"
                register={register}
                errors={errors}
                required
                validation={authValidation.password}
                placeholder="password"
              />
            </div>
          )}

        <button
          type='submit'
          disabled={!isValid}
          title='You can leave default values'
          className={cn('px-4 py-2 rounded hover:opacity-70 bg-gray-600', {
            'blur-[2px]': !isValid,
          })}
        >
          <p className="w-full h-12 font-robotomono-bold text-3xl font-bold">
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </p>
        </button>

        <button
          type='submit'
          disabled={!isValid}
          className={cn('px-4 py-2 rounded hover:opacity-70 bg-gray-600', {
            'blur-[2px]': !isValid,
          })}
        >
          <p className="w-full h-12 font-robotomono-bold text-3xl font-bold">
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </p>
        </button>
      </form>
    </div>

  );
}
