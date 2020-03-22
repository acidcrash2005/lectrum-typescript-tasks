// Core
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { book } from '../../routes/book';

// Instruments
import Styles from './styles.module.css';

// Types
import { AppState } from '../../../types';
import { FeedState } from '../../bus/feed/reducer';

export const Starship: FC = () => {
  const { starships } = useSelector<AppState, FeedState>((state) => state.feed);
  const match = useRouteMatch<{ starship: string }>(book.starship);

  if (!match) {
    return null;
  }

  const starshipName = match.params.starship;

  if (!starships.length) {
    return null;
  }

  const starship = starships.find(
    ({ name }) => name.replace(/ /g, '-').toLowerCase() === starshipName,
  );

  if (!starship) {
    return null;
  }

  const {
    name, starship_class, manufacturer, crew,
  } = starship;

  return (
    <section className={Styles.starship}>
      <h1>Starship</h1>
      <div className={Styles.description}>
        <div>
          <span>Имя:</span>
          <span>
            &nbsp;
            {name}
          </span>
        </div>
        <div>
          <span>Класс:</span>
          <span>
            &nbsp;
            {starship_class}
          </span>
        </div>
        <div>
          <span>Производитель:</span>
          <span>
            &nbsp;
            {manufacturer}
          </span>
        </div>
        <div>
          <span>Команда:</span>
          <span>
            &nbsp;
            {crew}
          </span>
        </div>
      </div>
    </section>
  );
};
