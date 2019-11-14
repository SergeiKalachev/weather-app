// tslint:disable: no-magic-numbers
import moment from 'moment';
import {
  Scale, WeatherActionTypes, GET_WEATHER_INFO, CHANGE_TEMPERATURE_SCALE,
  WeatherSegment, CHANGE_PAGE_INDEX, Forecast, CHANGE_SELECTED_FORECAST, SET_ERROR
} from './Weather.model';

export type WeatherState = {
  scale: Scale;
  pageIndex: number;
  pageSize: number;
  forecasts: Forecast[];
  selectedForecast: Forecast | null;
  segmentsMaxTemperature: number | null;
  error: string | null;
};

const initialState: WeatherState = {
  scale: Scale.Fahrenheit,
  pageIndex: 0,
  pageSize: 3,
  forecasts: [],
  selectedForecast: null,
  segmentsMaxTemperature: null,
  error: null
};

export const converterFromKelvin = {
  [Scale.Celsius]: (temperature: number) => temperature - 273.15,
  [Scale.Fahrenheit]: (temperature: number) => (temperature - 273.15) * 1.8 + 32
};

const groupSegments = (segments: WeatherSegment[]) => {
  const groupedSegments = segments.reduce((acc, curr) => {
    const key = moment(curr.dt_txt).format('YYYY MM DD');
    const group = acc.get(key) || [];

    return acc.set(key, [ ...group, curr ]);
  }, new Map<string, WeatherSegment[]>());

  return groupedSegments;
};

const constructForecasts = (groupedSegments: ReturnType<typeof groupSegments>, scale: Scale): Forecast[] => {
  const forecasts = [];
  for (const [ date, weatherInfo ] of groupedSegments.entries()) {
    const temperature = weatherInfo.reduce((acc, curr) => acc + curr.main.temp, 0) / weatherInfo.length;
    forecasts.push({
      date: moment(new Date(date)).format('DD MMM YY'),
      [Scale.Celsius]: converterFromKelvin[Scale.Celsius](temperature),
      [Scale.Fahrenheit]: converterFromKelvin[Scale.Fahrenheit](temperature),
      segments: weatherInfo
      // TODO: add weather info like sunny in 3p.m, scattered clouds in 6 p.m
    });
  }

  return forecasts;
};

const getSegmentsMaxTemperature = (forecast: Forecast) => {
  const segmentsTemperatures = forecast.segments.map((s) => s.main.temp);
  const segmentsMaxTemperature = segmentsTemperatures.sort((a, b) => b - a)[0];

  return segmentsMaxTemperature;
};

export const weatherInfoReducer = (state = initialState, action: WeatherActionTypes): WeatherState => {
  switch (action.type) {
  case GET_WEATHER_INFO:
    const forecasts = constructForecasts(groupSegments(action.weatherInfo), state.scale);
    const selectedForecast = forecasts[0];

    return {
      ...state,
      forecasts,
      selectedForecast,
      segmentsMaxTemperature: getSegmentsMaxTemperature(selectedForecast)
    };
  case CHANGE_TEMPERATURE_SCALE:
    return {
      ...state,
      scale: action.scale
    };
  case CHANGE_PAGE_INDEX:
    return {
      ...state,
      pageIndex: action.pageIndex,
      selectedForecast: state.forecasts.slice(action.pageIndex, action.pageIndex + state.pageSize)[0]
    };
  case CHANGE_SELECTED_FORECAST:
    return {
      ...state,
      selectedForecast: action.selectedForecast,
      segmentsMaxTemperature: getSegmentsMaxTemperature(action.selectedForecast)
    };
  case SET_ERROR:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};
