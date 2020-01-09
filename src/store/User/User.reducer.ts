import { UserActionTypes, GET_USER_INFO } from './User.model';

export type UserState = {
  name: string;
  token: string | null;
};

const initialState: UserState = {
  name: '',
  token: null
};

export const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
  case GET_USER_INFO:
    return { name: 'some name', token: 'mock' };
  default:
    return state;
  }
};
