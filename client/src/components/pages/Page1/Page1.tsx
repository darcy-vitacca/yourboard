import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../../shared/formElements/button';
import {
  FormContainer,
  FormSectionContainer,
  ButtonGroupContainer,
  PageLayoutContainer,
  SectionContainer,
} from '../../../shared/Layout.styles';
import { Markdown } from '../../../shared/markdown';

export const Page1 = () => {
  const { push } = useHistory();

  return (
    <>
      <PageLayoutContainer>
        <SectionContainer>
          <Markdown children={'heading'} />
          <Markdown children={'subHeading'} />
          <Markdown children={'activateCardText'} />
          <FormContainer>
            <FormSectionContainer className="activateCardSection">
              <ButtonGroupContainer>
                <Button children={'Text'} />
              </ButtonGroupContainer>
            </FormSectionContainer>
            <FormSectionContainer></FormSectionContainer>
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
