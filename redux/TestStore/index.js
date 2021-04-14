import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import {
  all, fork, put, takeLatest, call, select, take, takeEvery,
} from 'redux-saga/effects';

import {
  createLatestSaga,
} from '../createAsyncSaga';
import axios from 'axios';

import { showMessage } from '../MessageStore';

const name = 'TestStore';

const initialState = {
  anime: null,
};

const reducers = {
  setAnime: (state, action) => {
    state.anime = action.payload;
  },
};

const slice = createSlice({
  name,
  initialState,
  reducers,
});

const { setAnime } = slice.actions;

const fetchAction = createLatestSaga('TEST_SAGA/FETCH', function* ({ payload }) {
  const handleApi = async () => {
    const response = await axios.get('https://animechan.vercel.app/api/random');
    return response.data;
  };
  try {
    const data = yield call(handleApi);
    yield put(setAnime(data));
    yield put(showMessage({ icon: 'success', message: '成功' }));
  } catch(e) {
    console.log('error');
  }
});
const storeObj = {
  slice,
  // (必要)reducer，給store combine reducers
  reducer: slice.reducer,
  // (非必要)透出reducer方法，如果不需測試或是不打算直接給view使用，就不需要
  reducerActions: {
    setAnime,
    // logout,
  },
  // (必要)sagas, 給store去yield all所有的saga
  sagas: [
    // 註冊個別saga
    fetchAction
  ],
  // (必要)透出saga方法
  sagaActions: {
    fetchAction
  },
  // 若有selector 就透出
  selectors: {
    // getNorth,
  },
};
export default storeObj;

