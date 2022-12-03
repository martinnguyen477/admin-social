import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  IAddUserRequest,
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UsersActionTypes,
} from './types';

import { Dispatch } from 'redux';
import { userService } from '../../services';
import { AlertActionTypes } from 'stores/alert/types';
import { alertSuccess, clearAlert } from 'stores/alert/action';

export const loadUsersPaging = (keyword: string, currentPage: number) => {
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: LOAD_USERS_PAGING_REQUEST,
      });

      const res = await userService.getUsersPaging(keyword, currentPage);

      dispatch({
        type: LOAD_USERS_PAGING_SUCCESS,
        payload: res,
      });
      dispatch(alertSuccess('Thêm người dùng thành công'));
    } catch (error) {
      dispatch({
        type: LOAD_USERS_PAGING_FAILURE,
        payload: { error: "" },
      });
      dispatch(alertSuccess('Thêm người dùng thất bại'));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const addUser = (user: IAddUserRequest) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: ADD_USER_REQUEST,
      });

      await userService.addUser(user);

      dispatch({
        type: ADD_USER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: { error: "" },
      });
    }
  };
};