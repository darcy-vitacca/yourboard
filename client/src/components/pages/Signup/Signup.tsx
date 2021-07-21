import React from 'react';
import {
  Form,
  FormContainer,
  LoginRegisterSectionContainer,
  PageLayoutContainer,
  SectionContainer,
} from '../../../shared/Layout.styles';
import { useHistory } from 'react-router';
import { useForm, FormProvider } from 'react-hook-form';
import Input from '../../../shared/formElements/input';
import { Markdown } from '../../../shared/markdown';
import { Button } from '../../../shared/formElements/button';
import { LoginRegisterLinkContainer, StyledLink } from './Signup.styles';

interface FormValue {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
const defaultValues = {
  email: 'sadsa',
  username: 'sadsa',
  password: 'asdsa',
  firstName: 'asd',
  lastName: 'dsadsa',
};

export const Signup = () => {
  const { push } = useHistory();
  type FormInputs = {
    firstName: string;
    lastName: string;
  };

  const methods = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    // @ts-ignore
    defaultValues: defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;
  console.log('watch()', watch());

  const onSubmit = (formData: any) => {
    console.log('formData', formData);
    push('/login');
  };
  console.log('methods', methods);
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
                    defaultValue={''}
                  />
                  <Input
                    type="text"
                    name="username"
                    width="100%"
                    helperText="Username (6 characters or more without spaces)"
                    label="USERNAME"
                    defaultValue={''}
                  />
                  <Input
                    type="password"
                    name="password"
                    width="100%"
                    helperText="Password (A combination of 8 letters and numbers, including uppercase and lower case, without spaces)"
                    label="PASSWORD"
                    defaultValue={''}
                  />
                  <Input
                    type="text"
                    name="firstName"
                    width="100%"
                    label="FIRST NAME"
                    helperText="First Name"
                    defaultValue={''}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    width="100%"
                    label="LAST NAME"
                    helperText="Last Name"
                    defaultValue={''}
                  />
                  <Button text="Register" width="100%" />
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
