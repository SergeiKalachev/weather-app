import {
  Scale, WeatherActionTypes, GET_WEATHER_INFO, CHANGE_TEMPERATURE_SCALE,
  WeatherSegment, CHANGE_PAGE_INDEX
} from './Weather.model';

export type WeatherState = {
  scale: Scale;
  pageIndex: number;
  pageSize: number;
  weatherSegments: WeatherSegment[];
};

const initialState: WeatherState = {
  scale: Scale.Fahrenheit,
  pageIndex: 0,
  pageSize: 3,
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
  case CHANGE_PAGE_INDEX:
    return {
      ...state,
      pageIndex: action.pageIndex
    };
  default:
    return state;
  }
};
