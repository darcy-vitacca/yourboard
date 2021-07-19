import React from 'react';
import {
  FormContainer,
  FormSectionContainer,
  PageLayoutContainer,
  SectionContainer,
} from '../../../shared/Layout.styles';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import Input from '../../../shared/formElements/input';

type FormValue = {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};

export const Signup = () => {
  const { push } = useHistory();
  const {

  } = useForm<FormValue>();

  const onSubmit = (formData: any) => {
    console.log('formData', formData);
    push('/login');
  };
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormContainer>
            <FormSectionContainer>
              <Input type="email" fieldName="email" width="100%" label="EMAIL"/>
              <Input type="text" fieldName="username" width="100%" label="USERNAME"/>
              <Input type="password" fieldName="password" width="100%" label="PASSWORD"/>
              <Input type="text" fieldName="first_name" width="100%" label="FIRST NAME"/>
              <Input type="text" fieldName="last_name" width="100%" label="LAST NAME"/>
            </FormSectionContainer>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
// const validationSchema = Yup.object().shape({});
