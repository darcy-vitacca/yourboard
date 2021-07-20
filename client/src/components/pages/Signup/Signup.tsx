import React from 'react';
import {
  FormContainer,
  LoginRegisterSectionContainer,
  PageLayoutContainer,
  SectionContainer,
} from '../../../shared/Layout.styles';
import { useHistory } from 'react-router';

import { useForm } from 'react-hook-form';
import Input from '../../../shared/formElements/input';
import { Markdown } from '../../../shared/markdown';
import { Button } from '../../../shared/formElements/button';
import { LoginRegisterLinkContainer, StyledLink } from './Signup.styles';

type FormValue = {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};

export const Signup = () => {
  const { push } = useHistory();
  const {} = useForm<FormValue>();

  const onSubmit = (formData: any) => {
    console.log('formData', formData);
    push('/login');
  };
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormContainer>
            <LoginRegisterSectionContainer>
              <Markdown children="### Register" />
              <Markdown children="By continuing, you agree to our User Agreement and Privacy Policy" />
              <Input
                type="email"
                fieldName="email"
                width="100%"
                helperText="Email"
                label="EMAIL"
              />
              <Input
                type="text"
                fieldName="username"
                width="100%"
                helperText="Username (6 characters or more without spaces)"
                label="USERNAME"
              />
              <Input
                type="password"
                fieldName="password"
                width="100%"
                helperText="Password (A combination of 8 letters and numbers, including uppercase and lower case, without spaces)"
                label="PASSWORD"
              />
              <Input
                type="text"
                fieldName="first_name"
                width="100%"
                label="FIRST NAME"
                helperText="First Name"
              />
              <Input
                type="text"
                fieldName="last_name"
                width="100%"
                label="LAST NAME"
                helperText="Last Name"
              />
              <Button text="Register" width="100%" />
              <LoginRegisterLinkContainer>
                <Markdown children="Already a yourboard member?" />
                <StyledLink to="/login">LOGIN </StyledLink>
              </LoginRegisterLinkContainer>
            </LoginRegisterSectionContainer>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
// const validationSchema = Yup.object().shape({});
