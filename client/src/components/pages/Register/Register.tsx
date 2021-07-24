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
import axios from 'axios';

interface FormValue {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
const defaultValues = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const Register = () => {
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
    const res = await axios.post('/api/auth/register', formData)

      push('/login')
    } catch (err) {
      const error = err.response.data
      if(error.email) setError("email",	{  message: error.email })
      if(error.firstName) setError("firstName",{  message: error.firstName} )
      if(error.lastName) setError("lastName",{  message: error.lastName} )
      if(error.password) setError("password",{  message: error.password} )
      if(error.username) setError("username",{  message: error.username} )
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
                  <Markdown children="### Register" />
                  <Markdown children="By continuing, you agree to our User Agreement and Privacy Policy" />
                  <Input
                    type="email"
                    name="email"
                    width="100%"
                    helperText="Email"
                    label="EMAIL"
                    control={control}
                    defaultValue={''}
                    validation={errors?.email?.message || ''}
                  />
                  <Input
                    type="text"
                    name="username"
                    width="100%"
                    helperText="Username (6 characters or more without spaces)"
                    label="USERNAME"
                     control={control}
                    defaultValue={''}
                    validation={errors?.username?.message || ''}
                  />
                  <Input
                    type="password"
                    name="password"
                    width="100%"
                    helperText="Password (A combination of 8 letters and numbers, including uppercase and lower case, without spaces)"
                    label="PASSWORD"
                     control={control}
                    defaultValue={''}
                    validation={errors?.password?.message || ''}
                  />
                  <Input
                    type="text"
                    name="firstName"
                    width="100%"
                    label="FIRST NAME"
                    helperText="First Name"
                    control={control}
                    defaultValue={''}
                    validation={errors?.firstName?.message || ''}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    width="100%"
                    label="LAST NAME"
                    helperText="Last Name"
                     control={control}
                    defaultValue={''}
                    validation={errors?.lastName?.message || ''}
                  />

                  <Button text="Register" width="100%" type="submit" />
                  <LoginRegisterLinkContainer>
                    <Markdown children="Already a yourboard member?" />
                    <StyledLink to="/login">LOGIN </StyledLink>
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
