import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import _ from 'lodash';

import withReduxSaga from 'next-redux-saga'
import { createWrapper } from "next-redux-wrapper";

// =================================================================
// 收集 store (此檔案只需改這裡，在此引入所有 store 檔案)
// =================================================================
// import AuthStore from './AuthStore';
import TestStore from './TestStore';
import MessageStore from './MessageStore';
// import SweetAlertStore from './SweetAlertStore';

const STORE_LIST = [MessageStore, TestStore];

// =================================================================
// 合併方法
// =================================================================

//
// 合併 selectors
//
export const selectors = _.first([1].map((e) => {
  let collectedActions = {};
  for (const store of STORE_LIST) {
    collectedActions = Object.assign(collectedActions, {
      [store.slice.name.replace(/Store/i, 'Selector')]: store.selectors,
    });
  }
  return collectedActions;
}));

//
// 合併 reducerActions
//
export const reducerActions = _.first([1].map((e) => {
  let collectedActions = {};
  for (const store of STORE_LIST) {
    collectedActions = Object.assign(collectedActions, store.reducerActions);
  }
  return collectedActions;
}));

//
// 合併 reducers (For rootReducer)
//

const reducersFromStoreList = _.first([1].map((e) => {
  let collectedActions = {};
  for (const store of STORE_LIST) {
    collectedActions = Object.assign(collectedActions, {
      [store.slice.name]: store.reducer,
    });
  }

  return collectedActions;
}));
const rootReducer = combineReducers(reducersFromStoreList);

//
// 合併 sagaActions
//
export const sagaActions = _.first([1].map((e) => {
  let collectedActions = {};
  for (const store of STORE_LIST) {
    if (Object.keys(store.sagaActions) && Object.keys(store.sagaActions).length > 0) {
      for (const action of Object.keys(store.sagaActions)) {
        collectedActions = Object.assign(
          collectedActions,
          {
            [action]: store.sagaActions[action].sagaAction,
          },
        );
      }
    }
  }
  return collectedActions;
}));

//
// 合併 sagas (For rootSaga)
//
const sagasFromStoreList = _.flatten(
  STORE_LIST.map((s) => s.sagas.map((targetSaga) => targetSaga.saga)),
);
function* rootSaga() {
  yield all(sagasFromStoreList);
}

// =================================================================
// 配置 middlewares
// =================================================================
const additionalMiddlewares = []; // For 添加額外的 middlewares

//
// For logger
//
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  // additionalMiddlewares.push(logger);
}

//
// For saga
//
const sagaMiddleware = createSagaMiddleware();
additionalMiddlewares.push(sagaMiddleware);

// =================================================================
// 配置 root store
// =================================================================

// 原始寫法 (不使用toolkit)
// const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    ...additionalMiddlewares,
  ],
  devTools: process.env.NODE_ENV === 'development',
});

store.runSagaTask = () => {
  store.sagaTask = sagaMiddleware.run(rootSaga);
};

store.runSagaTask();

const makeStore = (ctx) => store;

export const wrapper = createWrapper(makeStore, {debug: true});

export const wrapperRedux = (BaseComponent) => {
  return wrapper.withRedux(BaseComponent);
};

export default store;
