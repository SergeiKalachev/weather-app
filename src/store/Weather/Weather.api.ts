import { send } from "../../services/http";
import { CONFIG } from '../../config';
import { WeatherInfo } from "./Weather.model";

export const getWeatherInfo = () => send<WeatherInfo[]>({
  method: CONFIG.API.weather.method,
  url: CONFIG.API.weather.url
})