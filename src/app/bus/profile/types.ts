export const types = {
  // Sync
  FILL_PROFILE: 'FILL_PROFILE' as const,
  START_FETCHING: 'START_FETCHING' as const,
  STOP_FETCHING: 'STOP_FETCHING' as const,
};

export type Profile = {
  firstName: string;
  lastName: string;
  isFetching: boolean;
}
