import { createSlice } from '@reduxjs/toolkit';

/**
 * =================================================================
 * slice
 * =================================================================
 */
const name = 'MessageStore';

const initialState = {
  state: null,
  options: {
    icon: 'error',
    message: 'unknown message',
  },
};

const reducers = {
  showMessage: (state, action) => {
    state.state = true;
    state.options = {
      ...initialState.options,
      ...action.payload,
    };
  },
  hideMessage: (state, action) => {
    state.state = null;
  },
};

// For 定義 slice (用這種方法可以不用寫 switch)
const slice = createSlice({
  name,
  initialState,
  reducers,
});

//
// For 將所有 action 提出來
//
export const { showMessage, hideMessage } = slice.actions;

/**
 * =================================================================
 * sagas
 * =================================================================
 */

/**
 * =================================================================
 * sagaAction => 用來封裝成saga action，方便view直接dispatch
 * =================================================================
 */

/**
 * =================================================================
 * selector
 * =================================================================
 */

/**
 * =================================================================
 * 輸出物件，方便 store 設定 reducer, saga 以及透出 selector
 * =================================================================
 */
const storeObj = {
  slice,
  // (必要)reducer，給store combine reducers
  reducer: slice.reducer,
  // (非必要)透出reducer方法，如果不需測試或是不打算直接給view使用，就不需要
  reducerActions: slice.actions,
  // (必要)sagas, 給store去yield all所有的saga
  sagas: [],
  // (必要)透出saga方法
  sagaActions: {},
  // 若有selector 就透出
  selectors: {},
};
export default storeObj;
