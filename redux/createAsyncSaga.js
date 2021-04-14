import {
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';

const createLatestSaga = (_SAGA_ACTION_TYPE, _SAGA) => ({
  saga: takeLatest(_SAGA_ACTION_TYPE, _SAGA),
  sagaAction: (payload) => ({
    type: _SAGA_ACTION_TYPE,
    payload,
  }),
});

const createEverySaga = (_SAGA_ACTION_TYPE, _SAGA) => ({
  saga: takeEvery(_SAGA_ACTION_TYPE, _SAGA),
  sagaAction: (payload) => ({
    type: _SAGA_ACTION_TYPE,
    payload,
  }),
});

export {
  createLatestSaga,
  createEverySaga,
};
