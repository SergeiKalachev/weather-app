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

export const getGroupedSegments = (state: AppState) => groupSegments(state.weatherInfo.weatherSegments);
