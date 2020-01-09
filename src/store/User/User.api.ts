import { UserInfo } from './User.model';
import { send } from '../../services/http';
import { CONFIG } from '../../config';

export const getUserInfo = () => send<UserInfo>({
  method: CONFIG.API.user.method,
  url: CONFIG.API.user.url
});
