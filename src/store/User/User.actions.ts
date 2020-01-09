import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { isError } from '../../services/http';
import { GET_USER_INFO, UserActionTypes } from './User.model';
import * as api from './User.api';

export const getUserInfo = (userInfo: object): UserActionTypes => ({
  type: GET_USER_INFO,
  user: userInfo
});

export const getUserInfoThunk = () =>
  async (_dispatch: Dispatch) => {
    const response = await api.getUserInfo();
    if (!isError(response)) {
      return;
    } else {
      toast.error('Error calling github api');
    }
  };
