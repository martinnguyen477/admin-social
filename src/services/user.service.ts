import { api } from "helpers";
import { IPagination } from "helpers/pagging";
import { IAddUserRequest, IUpdateUserRequest, IUser } from "stores/users/types";

const login = async (email: string, password: string) => {
  const body = { email, password };
  return await api.post('/v1/auth', body).then((response) => {
    return response.data;
  })
};
const logout = () => {
  sessionStorage.removeItem('user');
};

const getCurrentLoginUser = async (): Promise<any> => {
  return await api.get<any>('/v1/auth').then((response) => {
    return response.data;
  });
};

const getUsersPaging = async (
  keyword: string,
  currentPage: number
): Promise<IPagination<IUser>> => {
  const res = await api
    .get<IPagination<IUser>>(
      `/v1/users/paging/${currentPage}?keyword=${keyword}`
    )
    .then((response) => {
      return response.data;
    });
  return res;
};

const addUser = async (user: IAddUserRequest): Promise<any> => {
  const res = await api.post(`/v1/users`, user).then((response) => {
    return response.data;
  });
  return res;
};

const getUserById =async (id: string) : Promise<IUser> => {
  const res = await api.get<IUser>(`/v1/users/${id}`).then((response) => {
    return response.data;
  });
  return res;
}

const updateUser = async (
  id: string,
  user: IUpdateUserRequest
): Promise<any> => {
  const res = await api.put(`/v1/users/${id}`, user).then((response) => {
    return response.data;
  });
  return res;
};

export const userService = { login, logout, getCurrentLoginUser, getUsersPaging, addUser, getUserById , updateUser};