import {
    AccountActionTypes,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOG_OUT,
  } from './types';
  
  import { Dispatch } from 'react';
  import { history } from '../../helpers';
  import { userService } from './../../services';

export const login = (email: string, password: string, from: string) => {
    return (dispatch: Dispatch<AccountActionTypes>) => {
        //STEP 1:
        console.log(dispatch);
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                email: email,
                password: password,
            },
        });

        userService.login(email, password).then(
            (res) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res
                });
                history.push('/admin');
            },(error) => {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: {error : error.toString()}
                });
            }
        );
    };
}

export const logout = () : AccountActionTypes => 
{
    return { type: LOG_OUT};
} ;