import { Dispatch } from 'redux';
import * as api from './Weather.api';
import { WeatherActionTypes, Scale, GET_WEATHER_INFO, CHANGE_TEMPERATURE_SCALE, WeatherSegment } from './Weather.model';

export const getWeatherInfo = (weatherInfo: WeatherSegment[]): WeatherActionTypes => ({
  type: GET_WEATHER_INFO,
  weatherInfo
});

export const changeTemperatureScale = (scale: Scale): WeatherActionTypes => ({
  type: CHANGE_TEMPERATURE_SCALE,
  scale
})

export const getWeatherInfoThunk = () =>
  async (dispatch: Dispatch) => {
    const response = await api.getWeatherInfo();
    dispatch(getWeatherInfo(response.list));
  }

