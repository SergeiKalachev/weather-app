import { combineReducers } from 'redux';
import { weatherInfoReducer } from './Weather/Weather.reducer';

export const rootReducer = combineReducers({
  weatherInfo: weatherInfoReducer
});

export type AppState = ReturnType<typeof rootReducer>;
