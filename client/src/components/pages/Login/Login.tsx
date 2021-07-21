import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../../shared/formElements/button';
import {
  FormContainer,
  ButtonGroupContainer,
  PageLayoutContainer,
  SectionContainer,
  LoginRegisterSectionContainer,
} from '../../../shared/Layout.styles';
import { Markdown } from '../../../shared/markdown';
import Input from '../../../shared/formElements/input';
import { useForm } from 'react-hook-form';

type FormValue = {
  email: string;
  password: string;
};

export const Login = () => {
  const { push } = useHistory();

  const onSubmit = (formData: any) => {
    console.log('formData', formData);
    push('/page2');
  };
  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <FormContainer>
            <LoginRegisterSectionContainer></LoginRegisterSectionContainer>
          </FormContainer>
        </SectionContainer>
      </PageLayoutContainer>
    </>
  );
};
// const validationSchema = Yup.object().shape({
// activationCode: Yup.string()
//   .required(activationCode.required)
//   .matches(/^[a-zA-Z0-9_.-]*$/, {
//     message: activationCode.format,
//     excludeEmptyString: true,
//   }),
// firstName: Yup.string()
//   .required(firstName.required)
//   .matches(/^([A-Za-z\s\-'".])*$/, {
//     message: firstName.format,
//     excludeEmptyString: true,
//   }),
// lastName: Yup.string()
//   .required(lastName.required)
//   .matches(/^([A-Za-z\s\-'".])*$/, {
//     message: lastName.format,
//     excludeEmptyString: true,
//   }),
// email: Yup.string().email(email.format).required(email.required),
// phoneNumber: Yup.string()
//   .required(phoneNumber.required)
//   .matches(/^(0)[0-9]+$/, {
//     message: phoneNumber.format,
//     excludeEmptyString: true,
//   }),
// });
