import {
    AccountActionTypes,
    AccountState,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOG_OUT,
  } from './types';


  const initialState: AccountState = {
    user: null,
    loading: false,
    error: null,
    token: null,
  };

  /*
    REDUX - REDUCER: 
    + Đầu vào của Reducers là Action và State ban đầu.
    + Đầu ra là State mới --> Store sẽ hứng kết quả từ Reducers
  */
  const accountReducer = (
    state: AccountState = initialState, // Khởi tạo giá trị mặc định
    action: AccountActionTypes // Khai báo các Action của State
  ): AccountState => { // Trả về State mới
    switch (action.type) {
      case LOGIN_REQUEST: {
        return { ...state, loading: true };
      }
      case LOGIN_SUCCESS: {
        return {
          ...state,
          loading: false,
          token: action.payload.token,
        };
      }
      case LOGIN_FAILURE: {
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      }
      case LOG_OUT: {
        return {
          ...state,
          user: null,
          token: null,
          error: null,
        };
      }
      default:
        return state;
    }
  };
  export { accountReducer };
  