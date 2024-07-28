// import React from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
// import cn from 'classnames';
import { authValidation } from '../../constants/formValidation';
import { Button } from '../../components/Button';
import { TyForm } from '../../types/Form.type';
import { FormField } from '../../components/FormField';
import { Loader } from '../../components/Loader';

import * as authSlice from '../../slices/auth.slice';
import { useReduxSelector, useReduxDispatch } from '../../store/hooks';
import { selectFromStore } from '../../store/store';

export const LoginPage = () => {
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
    return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  }

  const onSubmit: SubmitHandler<TyForm.Auth> = async (data) => {

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
    <form
      className="
      content
      pt-[24px] pb-[4px]
      flex flex-col gap-5
      sm:pb-[62px]
      md:pt-[92px] md:pb-[84px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className="
          flex flex-col gap-[24px] items-center justify-center"
      >
        <h2
          className="font-robotomono-bold text-3xl font-bold"
        >
          LOG IN
        </h2>

        {/* <p
          className="font-robotomono-normal text-base font-normal text-system-error"
        >
          fill all fields
        </p> */}
      </div>

      {loaded
        ? <Loader />
        : (
          <div className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <FormField<TyForm.Auth>
                type="email"
                textLabel="E-mail"
                name="email"
                register={register}
                errors={errors}
                required
                validation={authValidation.email}
                placeholder="Email"
              />

              <FormField<TyForm.Auth>
                type="password"
                textLabel="Password"
                name="password"
                register={register}
                errors={errors}
                required
                validation={authValidation.password}
                placeholder="Email"
              />
            </div>
          </div>
        )}

      <div className="h-12 font-robotomono-bold text-3xl font-bold">
        <Button
          type='submit'
          option='primary'
          isDisable={!isValid}
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </Button>
      </div>
    </form>
  );
};

