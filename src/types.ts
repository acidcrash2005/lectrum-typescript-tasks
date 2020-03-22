import { rootReducer } from './app/init/rootReducer';

export type AppState = ReturnType<typeof rootReducer>;

export type Validation = {
  firstName: string;
  surname: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export interface RegistrationFormData extends Validation {
  preference: string;
  newsletter: boolean;
}
