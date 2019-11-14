import { AppState } from '../../store/rootReducer';

export const getScale = ((state: AppState) => state.weatherInfo.scale);

export const getPageIndex = ((state: AppState) => state.weatherInfo.pageIndex);

export const getPageSize = ((state: AppState) => state.weatherInfo.pageSize);

export const getForecasts = ((state: AppState) => state.weatherInfo.forecasts);

export const getSelectedForecast = ((state: AppState) => state.weatherInfo.selectedForecast);

export const getError = ((state: AppState) => state.weatherInfo.error);

export const getSegmentsMaxTemperature = ((state: AppState) => state.weatherInfo.segmentsMaxTemperature);
