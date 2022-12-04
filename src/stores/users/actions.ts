import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USERS_FAILURE,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  IAddUserRequest,
  IUpdateUserRequest,
  LOAD_USERS_PAGING_FAILURE,
  LOAD_USERS_PAGING_REQUEST,
  LOAD_USERS_PAGING_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UsersActionTypes,
} from './types';

import { AnyAction, Dispatch } from 'redux';
import { userService } from '../../services';
import { AlertActionTypes } from 'stores/alert/types';
import { alertError, alertSuccess, clearAlert } from 'stores/alert/action';
import { NavigateFunction } from 'react-router';
import { UrlConstants } from 'constants/constants';
import { ThunkDispatch } from 'redux-thunk';

export const loadUsersPaging = (keyword: string, currentPage: number) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
      dispatch({
        type: LOAD_USERS_PAGING_REQUEST,
      });

      const res = await userService.getUsersPaging(keyword, currentPage);

      dispatch({
        type: LOAD_USERS_PAGING_SUCCESS,
        payload: res,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USERS_PAGING_FAILURE,
        payload: { error: "" },
      });
    }
  };
};

export const addUser = (user: IAddUserRequest , navigation: NavigateFunction) => {
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: ADD_USER_REQUEST,
      });

      await userService.addUser(user);

      dispatch({
        type: ADD_USER_SUCCESS,
      });
      
      dispatch(alertSuccess('Thêm người dùng thành công'));
      navigation('/users');
    } catch (error) {
      dispatch({
        type: ADD_USER_FAILURE,
        payload: { error: "" },
      });
      
      dispatch(alertSuccess('Thêm người dùng thất bại'));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const getUserById = (userId: string) => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    try {
          dispatch({type: GET_USER_BY_ID_REQUEST});

          const res = await userService.getUserById(userId);
          dispatch({
            type: GET_USER_BY_ID_SUCCESS,
            payload: {
              user: res
            },
          });
    }
    catch (error: any) {
      dispatch({
        type: GET_USER_BY_ID_FAILURE,
        payload: {
          error: error.toString()
        }
      });
    }
  };
};

export const updateUser = (id: string, user: IUpdateUserRequest, navigation: NavigateFunction) => {
  return async (dispatch: Dispatch<UsersActionTypes | AlertActionTypes>) => {
    try {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });

      await userService.updateUser(id, user);

      dispatch({
        type: UPDATE_USER_SUCCESS,
      });

      dispatch(alertSuccess('Cập nhật người dùng thành công'));

      navigation(UrlConstants.USERS_LIST);
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error: error.toString() },
      });
      dispatch(alertError('Cập nhật người dùng thất bại'));
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};

export const deleteUsers = (userIds: string[]) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
      dispatch({
        type: DELETE_USERS_REQUEST,
      });

      await userService.deleteUsers(userIds);

      dispatch({
        type: DELETE_USERS_SUCCESS,
      });

      dispatch(alertSuccess("Xóa thành công"));
      dispatch(loadUsersPaging('', 1));
    } catch (error: any) {
      dispatch({
        type: DELETE_USERS_FAILURE,
        payload: { error: error.toString() },
      });
    }
    setTimeout(() => {
      dispatch(clearAlert());
    }, 3000);
  };
};