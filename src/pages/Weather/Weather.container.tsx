import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import cn from 'classnames';
import * as weatherActionCreators from '../../store/Weather/Weather.actions';
import { Scale } from '../../store/Weather/Weather.model';
import { MyTheme } from '../../model/theme.model';
import {
  getPageIndex, getPageSize, getScale, getForecasts,
  getSelectedForecast, getError, getSegmentsMaxTemperature
} from './Weather.selectors';
import { WeatherForecast, SegmentBarChart, ScaleControls, PagingArrows } from './Weather.components';

const useStyles = makeStyles<MyTheme>((theme) => ({
  card: theme.custom.card,
  error: {
    padding: '10px'
  },
  temperatureScale: {
    display: 'flex',
    justifyContent: 'center'
  },
  containerCard: {
    margin: '10px auto',
    paddingBottom: '10px',
    minWidth: '400px',
    maxWidth: '600px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
      minWidth: 'auto'
    }
  },
  forecastContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginTop: '10px'
    }
  },
  pagingArrows: {
    width: '300px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      right: 0,
      width: 'auto',
      margin: 0,
      flexDirection: 'column'
    }
  },
  forecastList: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  barChartsContainer: {
    margin: 'auto',
    width: '400px',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100px',
    marginTop: '30px',
    [theme.breakpoints.down('xs')]: {
      width: '300px'
    }
  }
}));

const Weather: React.FC = () => {
  const error = useSelector(getError);
  const scale = useSelector(getScale);
  const forecasts = useSelector(getForecasts, shallowEqual);
  const selectedForecast = useSelector(getSelectedForecast, shallowEqual);
  const maxSegmentsTemperature = useSelector(getSegmentsMaxTemperature);
  const pageIndex = useSelector(getPageIndex);
  const pageSize = useSelector(getPageSize);
  const dispatch = useDispatch();
  const forecastsPage = forecasts.slice(pageIndex, pageIndex + pageSize);
  const isLeftArrowVisible = pageIndex !== 0;
  const isRightArrowVisible = pageIndex + pageSize < forecasts.length;
  const actions = bindActionCreators(weatherActionCreators, dispatch);

  const classes = useStyles();

  if (error) {
    return (
      <Card className={cn(classes.card, classes.error)}>Error calling the weather api: {error}</Card>
    );
  }

  return (
    <>
      <Box className={classes.temperatureScale}>
        <ScaleControls
          onChange={(e) => actions.changeTemperatureScale(e.target.value as Scale)}
          scale={scale}
        />
      </Box>
      <Card className={cn(classes.card, classes.containerCard)}>
        <Box className={classes.forecastContainer}>
          <PagingArrows
            isLeftArrowVisible={isLeftArrowVisible}
            isRightArrowVisible={isRightArrowVisible}
            onLeftArrowClick={() => actions.changePageIndex(pageIndex - pageSize)}
            onRightArrowClick={() => actions.changePageIndex(pageIndex + pageSize)}
            className={classes.pagingArrows}
          />
          <Box className={classes.forecastList}>
            {forecastsPage.map((forecastPage) => (
              <WeatherForecast
                selected={!!selectedForecast && selectedForecast.date === forecastPage.date}
                key={forecastPage.date}
                scale={scale}
                date={forecastPage.date}
                averageTemperature={forecastPage[scale]}
                onClick={() => actions.changeSelectedForecast(forecastPage)}
              />
            ))}
          </Box>
        </Box>
        <Box className={classes.barChartsContainer}>
          {selectedForecast && selectedForecast.segments.map((segment) => (
            <SegmentBarChart
              key={segment.dt}
              scale={scale}
              temperature={segment.main.temp}
              maxTemperature={maxSegmentsTemperature as number}
              date={segment.dt_txt}
            />
          ))}
        </Box>
      </Card>
    </>
  );
};

export default Weather;
