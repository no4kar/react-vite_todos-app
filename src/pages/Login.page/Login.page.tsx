// import React from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
// import cn from 'classnames';
import { validation } from '../../constants/formValidation';
import { Button } from '../../components/Button';
import { MyForm } from '../../types/MyForm';
import { FormField } from '../../components/FormField';
import { useAdminStore } from '../../store/admin.store';
import { Loader } from '../../components/Loader';

export const LoginPage = () => {
  const location = useLocation();
  const { login, isLoading, isChecked } = useAdminStore();
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<MyForm>({
    defaultValues: {
      email: 'antonbabi13@gmail.com',
      password: 'password',
    },
    mode: 'onBlur',
  });

  if (isChecked) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  }

  const onSubmit: SubmitHandler<MyForm> = async (data) => {

    try {
      await login(data);
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
          className="title--h2"
        >
          LOGIN AS ADMIN
        </h2>

        <p
          className="title--body text-red"
        >
          fill all fields
        </p>
      </div>

      {isLoading
        ? <Loader />
        : (
          <div className="flex-1">
            <div className="flex flex-col gap-[8px]">
              <FormField<MyForm>
                type="email"
                textLabel="E-mail"
                name="email"
                register={register}
                errors={errors}
                required
                validation={validation.email}
                placeholder="Email"
              />

              <FormField<MyForm>
                type="password"
                textLabel="Password"
                name="password"
                register={register}
                errors={errors}
                required
                validation={validation.password}
                placeholder="Email"
              />
            </div>
          </div>
        )}

      <div className="h-[48px] title--h2">
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

