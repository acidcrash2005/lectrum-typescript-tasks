// Core
import React, { FormEvent, FC } from 'react';
import {
  Field, reduxForm, FieldArray, InjectedFormProps, FormSubmitHandler,
} from 'redux-form';
import capitalize from 'capitalize';
import { customInput, discounts } from '../Fields';
import {
  required, minLength, maxLength, matchesPassword, asyncValidate,
} from './validation';
import './styles.css';

// Types
import { RegistrationFormData } from '../../../types';

type OwnProps = {
  handleSubmit: (event: FormEvent<FormSubmitHandler>) => void;
  children?: never;
};

const RegistrationComponent: FC<OwnProps & InjectedFormProps<RegistrationFormData>> = ({
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="firstName"
      component={customInput}
      label="First Name"
      type="text"
      validate={[required]}
      normalize={capitalize}
    />
    <Field
      name="surname"
      component={customInput}
      label="Surname"
      type="text"
      validate={[required]}
      normalize={capitalize}
    />
    <Field
      name="username"
      component={customInput}
      label="Username"
      type="text"
      validate={[required, minLength, maxLength]}
    />
    <Field
      name="password"
      component={customInput}
      label="Password"
      type="password"
      validate={[required]}
    />
    <Field
      name="confirmPassword"
      component={customInput}
      label="Confirm Password"
      type="password"
      validate={[required, matchesPassword]}
    />
    <FieldArray name="discountCodes" component={discounts} />
    <button type="submit">Submit</button>
  </form>
);

export const RegistrationForm = reduxForm<RegistrationFormData>({
  form: 'registration',
  asyncValidate,
  asyncBlurFields: ['username'],
})(RegistrationComponent);
