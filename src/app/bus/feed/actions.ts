// Types
import {
  types,
  Starship,
} from './types';

export const feedActions = {
  // Sync
  startFetching: () => ({
    type: types.START_FETCHING,
  }),
  stopFetching: () => ({
    type: types.STOP_FETCHING,
  }),
  fillStarships: (starships: Starship[]) => ({
    type: types.FILL_STARSHIPS,
    payload: starships,
  }),
  // Async
  fetchStarshipsAsync: () => ({
    type: types.FETCH_STARSHIPS_ASYNC,
  }),
};

export type Actions = ReturnType<typeof feedActions[keyof typeof feedActions]>
