// Core
import { put, call, delay } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';

// Instruments
import { feedActions } from '../../actions';

const getShips = async (url: string) => {
  const result = await fetch(url);


  if (result.status !== 200) {
    throw new Error("We can't receive starships 😢");
  }

  const data = await result.json();

  return data;
};

export function* fetchStarships(): SagaIterator {
  try {
    yield put(feedActions.startFetching());

    const { results } = yield call(getShips, 'https://swapi.co/api/starships/');


    yield delay(200);
    yield put(feedActions.fillStarships(results));
  } catch (error) {
    console.log('fetchStarshipsAsync', error);
  } finally {
    yield put(feedActions.stopFetching());
  }
}
