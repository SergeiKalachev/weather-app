export interface UserInfo {
  name: string;
}

export const GET_USER_INFO = 'GET_USER_INFO';

interface GetUserInfo {
  type: typeof GET_USER_INFO;
  user: object;
}

export type UserActionTypes = GetUserInfo;
