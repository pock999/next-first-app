import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

import { wrapperRedux, reducerActions, sagaActions } from '../redux/store';
const Home = (props) => {

  console.log('propssss => ', props);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        test
      </>
    </div>
  )
}

Home.getInitialProps = async(ctx) => {
  const { store, isServer, err } = ctx;

  await store.dispatch(sagaActions.fetchAction());

  const {
    MessageStore,
    TestStore,
  } = store.getState();

  return {
    ...MessageStore,
    ...TestStore,
  };

};

export default wrapperRedux(Home);