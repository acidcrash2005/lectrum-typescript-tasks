// Core
import React from 'react';

// Components
import { RegistrationForm } from '../RegistrationForm';
import { RegistrationFormData } from '../../../types';

export const Registration = () => {
  const handleSubmit = (values: RegistrationFormData) => {
    window.alert(JSON.stringify(values, null, 4));
  };

  const getInitialValues = () => ({
    preference: 'spaces',
    newsletter: true,
  });

  return <RegistrationForm onSubmit={handleSubmit} initialValues={getInitialValues()} />;
};
