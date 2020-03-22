// Core
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Instruments
import Styles from './styles.module.css';
import { feedActions } from '../../bus/feed/actions';
import { StarshipTile } from '../StarshipTile';

// Types
import { FeedState } from '../../bus/feed/reducer';
import { AppState } from '../../../types';

export const Panel = () => {
  const dispatch = useDispatch();
  const { starships, isFetching } = useSelector<AppState, FeedState>((state) => state.feed);

  const _fetchPostsAsync = () => dispatch(feedActions.fetchStarshipsAsync());

  const starshipsJSX = starships.map((starship) => (
    <StarshipTile key={starship.name} {...starship} />
  ));

  const buttonMessage = isFetching ? '⏳ Вызываю...' : '📲 Вызвать корабли';

  return (
    <section className={Styles.panel}>
      <h1>🖥</h1>
      <button disabled={isFetching} onClick={_fetchPostsAsync}>
        {buttonMessage}
      </button>
      <ul>{starshipsJSX}</ul>
    </section>
  );
};
