import React from 'react';
import {
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import cn from 'classnames';

import * as authSlice from '../../slices/auth.slice';
import { useReduxSelector, useReduxDispatch } from '../../store/hooks';
import { selectFromStore } from '../../store/store';

import { authValidation } from '../../constants/formValidation';
import { TyForm } from '../../types/Form.type';
import { FormField } from '../../components/FormField';
import { Notification } from '../../components/Notification';
// import { Loader } from '../../components/Loader';

export const LoginPage = React.memo(FuncComponent);

function FuncComponent() {
  const location = useLocation();
  const {
    loaded,
    registered,
    errorMsg,
  } = useReduxSelector(selectFromStore('author'));
  const dispatch = useReduxDispatch();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<TyForm.Auth>({
    defaultValues: {
      email: 'some@email.com',
      password: 'password',
    },
    mode: 'onChange',
  });

  if (registered) {
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
        await dispatch(authSlice.loginThunk(data));

        // await login(data);
        // navigate(location.state?.from?.pathname || '/');
      } catch (error) {
        console.error(error);
        alert((error as AxiosError).message);
      }
    };

  return (
    <div className='custom-page-container py-4 sm:py-6 md:py-10'>
      <div className='w-full max-w-md p-8 mx-auto
      bg-gray-800 text-gray-400 rounded-lg shadow-md space-y-6'>
        <div
          className='flex items-center justify-center'
        >
          <h2 className='text-2xl font-robotomono-bold font-bold text-white'>
            Log In
          </h2>
        </div>

        <form
          className='
          w-full p-4
          rounded bg-gray-700
          flex flex-col gap-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className='flex-1 flex flex-col gap-2'
          >
            <FormField<TyForm.Auth>
              type='email'
              textLabel='E-mail'
              name='email'
              register={register}
              errors={errors}
              required
              validation={authValidation.email}
              placeholder='some@email.com'
            />

            <FormField<TyForm.Auth>
              type='password'
              textLabel='Password'
              name='password'
              register={register}
              errors={errors}
              required
              validation={authValidation.password}
              placeholder='password'
            />
          </div>

          <button
            type='submit'
            disabled={!isValid}
            title='You can leave default values'
            className={cn('w-full py-2 bg-red-600 text-white rounded hover:opacity-70', {
              'blur-[2px]': !isValid,
            })}
          >
            <p className='flex items-center justify-center font-bold'>
              {isSubmitting && loaded ? 'Submitting...' : 'Submit'}
            </p>
          </button>
        </form>

        <div className='text-center'>
          <p>
            Not registered yet?
            {' '}
            <Link to='/signup' className='inline hover:underline'>Registration</Link>
          </p>

          {/* <br />

          <a href='#recover' className=' hover:underline'>
            Forgot your password? Recover password
          </a> */}
        </div>
      </div>

      {errorMsg && (
        <div
          className='fixed bottom-4 right-4'
        >
          <Notification onClose={() => dispatch(authSlice.errorReset())}>
            <p>{errorMsg}</p>
          </Notification>
        </div>
      )}
    </div>
  );
}
