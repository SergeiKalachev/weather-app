export enum Scale {
  Fahrenheit = 'Fahrenheit',
  Celsius = 'Celsius'
}

export type WeatherInfo = {
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
  },
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>,
  clouds: {
    all: number;
  },
  wind: {
    speed: number;
    deg: number;
  },
  sys: {
    pod: string;
  },
  dt_txt: string;
}


export const GET_WEATHER_INFO = 'GET_WEATHER_INFO';
export const CHANGE_TEMPERATURE_SCALE = 'CHANGE_TEMPERATURE_SCALE';


interface GetWeatherAction {
  type: typeof GET_WEATHER_INFO,
  weatherInfo: WeatherInfo[]
}

interface ChangeTemperatureScaleAction {
  type: typeof CHANGE_TEMPERATURE_SCALE,
  scale: Scale
}

export type WeatherActionTypes = GetWeatherAction | ChangeTemperatureScaleAction;