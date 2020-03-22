// Types
import { Starship, types } from './types';

import { Actions } from './actions';

export interface FeedState {
  starships: Starship[];
  isFetching: boolean;
}

const initialState: FeedState = {
  starships: [],
  isFetching: false,
};

export const feedReducer = (state = initialState, action: Actions): FeedState => {
  switch (action.type) {
    case types.START_FETCHING:
      return { ...state, isFetching: true };

    case types.STOP_FETCHING:
      return { ...state, isFetching: false };

    case types.FILL_STARSHIPS:
      return { ...state, starships: action.payload };

    default:
      return state;
  }
};
