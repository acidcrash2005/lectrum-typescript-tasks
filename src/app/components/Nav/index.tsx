// Core
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { push, RouterState } from 'connected-react-router';

// Instruments
import Styles from './styles.module.css';
import { book } from '../../routes/book';

export const Nav: FC<RouterState> = (props) => {
  const dispatch = useDispatch();

  const _navigateToRoot = () => dispatch(push(book.root));
  const _navigateToPanel = () => dispatch(push(book.panel));
  const _navigateToProfile = () => dispatch(push(book.profile));

  const {
    location: { pathname },
  } = props;

  return (
    <section className={Styles.nav}>
      {pathname === book.root ? null : (
        <>
          <button onClick={_navigateToProfile}>Профиль</button>
          <button onClick={_navigateToPanel}>Панель</button>
          <button className={Styles.bridge} onClick={_navigateToRoot}>
            Мостик
          </button>
        </>
      )}
    </section>
  );
};
