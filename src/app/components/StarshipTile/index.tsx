// Core
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

// Instruments
import Styles from './styles.module.css';
import { book } from '../../routes/book';

type OwnProps = {
  name: string;
  starship_class: string;
  manufacturer: string;
  crew: string;
  children: never;
}

export const StarshipTile = (props: OwnProps) => {
  const dispatch = useDispatch();

  const {
    name, starship_class, manufacturer, crew,
  } = props;

  const navigateToStarship = () => {
    const url = `${book.panel}/${name.replace(/ /g, '-').toLowerCase()}`;
    dispatch(push(url));
  };

  return (
    <section className={Styles.starshipTile} onClick={navigateToStarship}>
      <h1>Ω</h1>
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
