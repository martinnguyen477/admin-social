/*
    NỘI DUNG CLASS NÀY: SỬ DỤNG DÙNG ĐỂ KHAI BÁO CÁC ACTION VÀ STATE 

    REDUX - ACTION:
    + Có các Interface Action
    + Trong Interface có 2 thuộc tính là type (CONSTANT) và Payload (Object chứa dữ liệu)

*/

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOG_OUT = 'LOG_OUT';


// Đăng nhập xong thì map với các thông tin sau.
export interface AuthenticatedUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
  };
}

interface Logout {
  type: typeof LOG_OUT;
}

/*
    Xem State chứa thông tin trong Store
*/

//Trạng thái của Account
export interface AccountState {
  user: AuthenticatedUser | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

export type AccountActionTypes =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | Logout;
