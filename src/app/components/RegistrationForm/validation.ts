import { Validation } from '../../../types';

export const required = (value: Validation[keyof Validation]) => (value ? void 0 : 'Value is requied');

export const minLength = (value: Validation[keyof Validation]) => (value.length < 4 ? 'Value must be at least 4 characters long' : void 0);

export const maxLength = (value: Validation[keyof Validation]) => (value.length > 10 ? 'Value is too long' : void 0);

export const matchesPassword = (value: Validation[keyof Validation], allValues: Validation) => (value === allValues.password ? void 0 : 'Password must match');

export const asyncValidate = (values: Validation) => {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  return sleep(1000).then(() => {
    console.log('sleep');
    const db = ['oliver', 'andrii'];
    if (db.includes(values.username)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        username: 'Username already taken',
      });
    }
  });
};
