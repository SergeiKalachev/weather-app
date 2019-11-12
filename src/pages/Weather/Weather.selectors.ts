import moment from 'moment';
import { WeatherSegment } from '../../store/Weather/Weather.model';
import { AppState } from '../../store/rootReducer';

const groupSegments = (segments: WeatherSegment[]) => {
  const groupedSegments = segments.reduce((acc, curr) => {
    const key = moment(curr.dt_txt).format('YYYY MM DD');
    const group = acc.get(key) || [];

    return acc.set(key, [ ...group, curr ]);
  }, new Map<string, WeatherSegment[]>());

  return groupedSegments;
};

const countAverageTemperature = (groupedSegments: ReturnType<typeof groupSegments>) => {
  const forecasts = [];
  for (const [ date, weatherInfo ] of groupedSegments.entries()) {
    forecasts.push({
      date: moment(new Date(date)).format('DD MMM YY'),
      averageTemperature: weatherInfo.reduce((acc, curr) => acc + curr.main.temp, 0) / weatherInfo.length
    });
  }

  return forecasts;
};

export const getPageIndex = ((state: AppState) => state.weatherInfo.pageIndex);

export const getPageSize = ((state: AppState) => state.weatherInfo.pageSize);

export const getForecasts = (state: AppState) =>
  countAverageTemperature(groupSegments(state.weatherInfo.weatherSegments));
