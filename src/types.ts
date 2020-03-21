import { rootReducer } from './app/init/rootReducer';

export type AppState = ReturnType<typeof rootReducer>
