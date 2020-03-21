// Core
import { SagaIterator } from '@redux-saga/core';
import { all } from 'redux-saga/effects';

// Watchers
import { watchFeed } from '../bus/feed/saga/watchers';

export function* rootSaga(): SagaIterator {
  yield all([watchFeed()]);
}
