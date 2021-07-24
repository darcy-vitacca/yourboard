import React from 'react';
import {
  Form,
  FormContainer, LoginRegisterLinkContainer,
  LoginRegisterSectionContainer,
  PageLayoutContainer,
  SectionContainer, StyledLink,
} from '../../../shared/Layout.styles';
import { useHistory } from 'react-router';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import Input from '../../../shared/formElements/input';
import { Markdown } from '../../../shared/markdown';
import { Button } from '../../../shared/formElements/button';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { useAuthDispatch, useAuthState } from '../../context/context';

interface FormValue {
  email: string;
  password: string;

}
const defaultValues = {
  email: '',
  password: '',
};

export const Login = () => {
  const dispatch = useAuthDispatch();
  const {authenticated} = useAuthState()
  const { push } = useHistory();


  const methods = useForm<FormValue>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });
  const {
    handleSubmit,
    register,
    watch,
    control,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: any) => {
    try {
      console.log('formData', formData);
      const res = await axios.post('/api/auth/login', formData)
      dispatch("LOGIN", res.data );
      // push('/')
    } catch (err) {
      const error = err.response.data
      if(error.email) setError("email",	{  message: error.email })
      if(error.password) setError("password",{  message: error.password} )
    }
  };
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormContainer>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <LoginRegisterSectionContainer>
                  <Markdown children="### Login" />
                  <Markdown children="By continuing, you agree to our User Agreement and Privacy Policy" />
                  <Input
                    type="email"
                    name="email"
                    width="100%"
                    label="EMAIL"
                    control={control}
                    defaultValue={''}
                    validation={errors?.email?.message || ''}
                  />
                  <Input
                    type="password"
                    name="password"
                    width="100%"
                    label="PASSWORD"
                    control={control}
                    defaultValue={''}
                    validation={errors?.password?.message || ''}
                  />


                  <Button text="Login" width="100%" type="submit" />
                  <LoginRegisterLinkContainer>
                    <Markdown children="New to yourboard?" />
                    <StyledLink to="/register">REGISTER</StyledLink>
                  </LoginRegisterLinkContainer>
                </LoginRegisterSectionContainer>
              </form>
            </FormProvider>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
