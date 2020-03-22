// Types
import { types, Profile } from './types';
import { Actions } from './actions';

export type ProfileState = Profile;

const initialState: ProfileState = {
  firstName: 'Уолтер',
  lastName: 'Уайт',
  isFetching: false,
};

export const profileReducer = (state = initialState, action: Actions): ProfileState => {
  switch (action.type) {
    case types.FILL_PROFILE:
      return { ...state, ...action.payload };

    case types.START_FETCHING:
      return { ...state, isFetching: true };

    case types.STOP_FETCHING:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
