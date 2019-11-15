import { AppState } from '../../store/rootReducer';
import { Forecast } from '../../store/Weather/Weather.model';

const calcSegmentsMaxTemperature = (forecast: Forecast) => {
  const segmentsTemperatures = forecast.segments.map((s) => s.main.temp);
  const segmentsMaxTemperature = segmentsTemperatures.sort((a, b) => b - a)[0];

  return segmentsMaxTemperature;
};

export const getScale = ((state: AppState) => state.weatherInfo.scale);

export const getPageIndex = ((state: AppState) => state.weatherInfo.pageIndex);

export const getPageSize = ((state: AppState) => state.weatherInfo.pageSize);

export const getForecasts = ((state: AppState) => state.weatherInfo.forecasts);

export const getSelectedForecast = ((state: AppState) => state.weatherInfo.selectedForecast);

export const getError = ((state: AppState) => state.weatherInfo.error);

export const getSegmentsMaxTemperature = ((state: AppState) =>
  state.weatherInfo.selectedForecast && calcSegmentsMaxTemperature(state.weatherInfo.selectedForecast));
