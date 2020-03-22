// Core
import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

// Instruments
import Styles from './styles.module.css';
import observatory from './observatory.jpg';
import { book } from '../../routes/book';

// Types
import { AppState } from '../../../types';
import { ProfileState } from '../../bus/profile/reducer';

export const Bridge: FC = () => {
  const dispatch = useDispatch();
  const profile = useSelector<AppState, ProfileState>((state) => state.profile);
  const proceed = () => dispatch(push(book.panel));

  return (
    <section className={Styles.bridge}>
      <h1>
        Добро пожаловать на борт,
        {' '}
        {profile.firstName}
        &nbsp;
        {profile.lastName}
!
      </h1>
      <img src={observatory} alt="observatory" />
      <button type="button" onClick={proceed}>Контрольная панель</button>
    </section>
  );
};
