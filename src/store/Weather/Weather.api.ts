import { send } from '../../services/http';
import { CONFIG } from '../../config';
import { WeatherInfo } from './Weather.model';
import mockedResponse from '../../mocked-response.json';

export const getWeatherInfo = () => CONFIG.DEV
  // tslint:disable-next-line: no-magic-numbers
  ? new Promise<WeatherInfo>((res) => setTimeout(() => res(mockedResponse), 1000))
  : send<WeatherInfo>({
    method: CONFIG.API.weather.method,
    url: CONFIG.API.weather.url
  });
