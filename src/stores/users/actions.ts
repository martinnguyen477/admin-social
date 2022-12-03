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
import { navigate } from 'helpers/navigation';
import { UrlConstants } from 'constants/constants';

export const loadUsersPaging = (keyword: string, currentPage: number) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        try {
            dispatch({
                type: LOAD_USERS_PAGING_REQUEST,
            });

            const res = await userService.getUsersPaging(keyword,currentPage);

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