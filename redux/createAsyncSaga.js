import {
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';

const createAsyncSaga = (_SAGA_ACTION_TYPE, _SAGA) => ({
  saga: takeLatest(_SAGA_ACTION_TYPE, _SAGA),
  sagaAction: (payload) => ({
    type: _SAGA_ACTION_TYPE,
    payload,
  }),
});

export default createAsyncSaga;
