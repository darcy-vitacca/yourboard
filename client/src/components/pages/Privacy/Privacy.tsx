import React, { FC } from "react";
import {
  FormContainer,
  PageLayoutContainer,
  SectionContainer,
} from "../../../shared/Layout.styles";
import { Markdown } from "../../../shared/markdown";

export const Privacy: FC = () => {
  return (
    <PageLayoutContainer>
      <SectionContainer>
        <Markdown children="# Privacy Policy" />
        <Markdown
          children="urboard is committed to providing quality services to you and this
          policy outlines our ongoing obligations to you in respect of how we
          manage your Personal Information."
        />
        <Markdown
          children="  We have adopted the Australian Privacy Principles (APPs) contained in
          the Privacy Act 1988 (Cth) (the Privacy Act). The NPPs govern the way
          in which we collect, use, disclose, store, secure and dispose of your
          Personal Information."
        />
        <Markdown
          children="A copy of the Australian Privacy Principles may be obtained from the
          website of The Office of the Australian Information Commissioner at
          www.aoic.gov.au"
        />
        <Markdown children="#### What is Personal Information and why do we collect it?" />
        <Markdown
          children="Personal Information is information or an opinion that identifies an
          individual. Examples of Personal Information we collect include:
          names, addresses, email addresses, phone and facsimile numbers."
        />
        <Markdown
          children="This Personal Information is obtained in many ways including
          correspondence by email and via our website urboard.co and from third parties. We don’t guarantee website
          links or policy of authorised third parties."
        />
        <Markdown
          children="We collect your Personal Information for the primary purpose of
          providing our services to you, providing information to our clients
          and marketing. We may also use your Personal Information for secondary
          purposes closely related to the primary purpose, in circumstances
          where you would reasonably expect such use or disclosure. You may
          unsubscribe from our mailing/marketing lists at any time by contacting
          us in writing."
        />
        <Markdown
          children="  When we collect Personal Information we will, where appropriate and
          where possible, explain to you why we are collecting the information
          and how we plan to use it."
        />
        <Markdown children="#### Sensitive Information" />
        <Markdown
          children="  Sensitive information is defined in the Privacy Act to include
          information or opinion about such things as an individual's racial or
          ethnic origin, political opinions, membership of a political
          association, religious or philosophical beliefs, membership of a trade
          union or other professional body, criminal record or health
          information."
        />
        <Markdown children="Sensitive information will be used by us only:" />
        <Markdown children="• For the primary purpose for which it was obtained" />
        <Markdown
          children=" • For a secondary purpose that is directly related to the primary
          purpose"
        />
        <Markdown children="• With your consent; or where required or authorised by law." />
        <Markdown children="#### Third Parties" />
        <Markdown
          children=" Where reasonable and practicable to do so, we will collect your
          Personal Information only from you. However, in some circumstances we
          may be provided with information by third parties. In such a case we
          will take reasonable steps to ensure that you are made aware of the
          information provided to us by the third party."
        />
        <Markdown children="#### Disclosure of Personal Information" />
        <Markdown
          children=" Your Personal Information may be disclosed in a number of
          circumstances including the following:"
        />
        <Markdown children="• Third parties where you consent to the use or disclosure; and" />
        <Markdown children="• Where required or authorised by law." />
        <Markdown children="#### Security of Personal Information" />
        <Markdown
          children="Your Personal Information is stored in a manner that reasonably
          protects it from misuse and loss and from unauthorized access,
          modification or disclosure."
        />
        <Markdown
          children="  When your Personal Information is no longer needed for the purpose for
          which it was obtained, we will take reasonable steps to destroy or
          permanently de-identify your Personal Information. However, most of
          the Personal Information is or will be stored in client files which
          will be kept by us for a minimum of 7 years."
        />
        <Markdown children="#### Access to your Personal Information" />
        <Markdown
          children="You may access the Personal Information we hold about you and to
          update and/or correct it, subject to certain exceptions. If you wish
          to access your Personal Information, please contact us in writing."
        />
        <Markdown
          children="urboard will not charge any fee for your access request, but may
          charge an administrative fee for providing a copy of your Personal
          Information."
        />
        <Markdown
          children="In order to protect your Personal Information we may require
          identification from you before releasing the requested information."
        />
        <Markdown children="#### Maintaining the Quality of your Personal Information" />
        <Markdown
          children="It is an important to us that your Personal Information is up to date.
          We will take reasonable steps to make sure that your Personal
          Information is accurate, complete and up-to-date. If you find that the
          information we have is not up to date or is inaccurate, please advise
          us as soon as practicable so we can update our records and ensure we
          can continue to provide quality services to you."
        />
        <Markdown children="#### Policy Updates" />
        <Markdown
          children="This Policy may change from time to time and is available on our
          website."
        />
        <Markdown children="#### Privacy Policy Complaints and Enquiries" />
        <Markdown
          children=" If you have any queries or complaints about our Privacy Policy please
          contact us at:"
        />
        <p>urboardinfo@gmail.com</p>
      </SectionContainer>
    </PageLayoutContainer>
  );
};
