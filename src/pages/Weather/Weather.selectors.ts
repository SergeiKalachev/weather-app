import moment from 'moment';
import { WeatherSegment, Scale } from '../../store/Weather/Weather.model';
import { AppState } from '../../store/rootReducer';

const groupSegments = (segments: WeatherSegment[]) => {
  const groupedSegments = segments.reduce((acc, curr) => {
    const key = moment(curr.dt_txt).format('YYYY MM DD');
    const group = acc.get(key) || [];

    return acc.set(key, [ ...group, curr ]);
  }, new Map<string, WeatherSegment[]>());

  return groupedSegments;
};

// tslint:disable: no-magic-numbers
const converterFromKelvin = {
  [Scale.Celsius]: (temperature: number) => temperature - 273.15,
  [Scale.Fahrenheit]: (temperature: number) => (temperature - 273.15) * 1.8 + 32
};

const countAverageTemperature = (groupedSegments: ReturnType<typeof groupSegments>, scale: Scale) => {
  const forecasts = [];
  for (const [ date, weatherInfo ] of groupedSegments.entries()) {
    const temperature = weatherInfo.reduce((acc, curr) => acc + curr.main.temp, 0) / weatherInfo.length;
    forecasts.push({
      date: moment(new Date(date)).format('DD MMM YY'),
      averageTemperature: converterFromKelvin[scale](temperature)
    });
  }

  return forecasts;
};

export const getScale = ((state: AppState) => state.weatherInfo.scale);

export const getPageIndex = ((state: AppState) => state.weatherInfo.pageIndex);

export const getPageSize = ((state: AppState) => state.weatherInfo.pageSize);

export const getForecasts = (state: AppState) =>
  countAverageTemperature(groupSegments(state.weatherInfo.weatherSegments), state.weatherInfo.scale);
