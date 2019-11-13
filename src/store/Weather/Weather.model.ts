export enum Scale {
  Fahrenheit = 'Fahrenheit',
  Celsius = 'Celsius'
}

export type WeatherSegment = {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type WeatherInfo = {
  cod: string;
  message: number;
  city: {};
  cnt: number;
  list: Array<WeatherSegment>;
};

export type Forecast = {
  date: string;
  [Scale.Celsius]: number;
  [Scale.Fahrenheit]: number;
  segments: WeatherSegment[];
};

export const GET_WEATHER_INFO = 'GET_WEATHER_INFO';
export const CHANGE_TEMPERATURE_SCALE = 'CHANGE_TEMPERATURE_SCALE';
export const CHANGE_PAGE_INDEX = 'CHANGE_PAGE_INDEX';
export const CHANGE_SELECTED_FORECAST = 'CHANGE_SELECTED_FORECAST';

interface GetWeatherAction {
  type: typeof GET_WEATHER_INFO;
  weatherInfo: WeatherSegment[];
}

interface ChangeTemperatureScaleAction {
  type: typeof CHANGE_TEMPERATURE_SCALE;
  scale: Scale;
}

interface ChangePageIndex {
  type: typeof CHANGE_PAGE_INDEX;
  pageIndex: number;
}

interface ChangeSelectedForecast {
  type: typeof CHANGE_SELECTED_FORECAST;
  selectedForecast: Forecast;
}

export type WeatherActionTypes = GetWeatherAction | ChangeTemperatureScaleAction
  | ChangePageIndex | ChangeSelectedForecast;
