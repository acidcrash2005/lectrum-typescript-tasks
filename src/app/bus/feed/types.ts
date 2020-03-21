export const types = {
  // Sync
  START_FETCHING: 'START_FETCHING' as const,
  STOP_FETCHING: 'STOP_FETCHING' as const,
  FILL_STARSHIPS: 'FILL_STARSHIPS' as const,
  // Async
  FETCH_STARSHIPS_ASYNC: 'FETCH_STARSHIPS_ASYNC' as const,
};

export type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}