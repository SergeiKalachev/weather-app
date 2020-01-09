import { combineReducers } from 'redux';
import { weatherInfoReducer } from './Weather/Weather.reducer';
import { userReducer } from './User/User.reducer';

export const rootReducer = combineReducers({
  weatherInfo: weatherInfoReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;
