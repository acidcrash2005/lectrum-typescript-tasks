// Types
import { types, Profile } from './types';

export const profileActions = {
  // Sync
  fillProfile: (profile: Profile) => ({
    type: types.FILL_PROFILE,
    payload: profile,
  }),
  startFetching: () => ({
    type: types.START_FETCHING,
  }),
  stopFetching: () => ({
    type: types.STOP_FETCHING,
  }),
};

export type Actions = ReturnType<typeof profileActions[keyof typeof profileActions]>
