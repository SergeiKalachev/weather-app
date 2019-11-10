import { Scale, WeatherActionTypes, WeatherInfo, GET_WEATHER_INFO, CHANGE_TEMPERATURE_SCALE } from './Weather.model';

export type WeatherState = {
  scale: Scale;
  weatherSegments: WeatherInfo[];
}

const initialState: WeatherState = {
  scale: Scale.Fahrenheit,
  weatherSegments: []
};

export const weatherInfoReducer = (state = initialState, action: WeatherActionTypes): WeatherState => {
  switch (action.type) {
  case GET_WEATHER_INFO:
    return {
      ...state,
      weatherSegments: action.weatherInfo
    };
  case CHANGE_TEMPERATURE_SCALE:
    return {
      ...state,
      scale: action.scale
    };
  default:
    return state;
  }
};