import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
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
import { WeatherForecast, SegmentBarChart } from './Weather.components';

const useStyles = makeStyles<MyTheme>((theme) => ({
  card: {
    padding: '0 10px',
    boxShadow: theme.custom.boxShadow1
  },
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
    minWidth: '500px',
    maxWidth: '600px'
  },
  arrow: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontSize: '90px',
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  arrowLeft: {
    transform: 'rotateY(180deg)'
  },
  pagingArrows: {
    width: '300px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between'
  },
  forecastContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  barChartsContainer: {
    margin: 'auto',
    width: '400px',
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100px',
    marginTop: '30px'
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
        <Card className={classes.card}>
          <span>{Scale.Celsius}</span>
          <Radio
            checked={scale === Scale.Celsius}
            onChange={(e) => actions.changeTemperatureScale(e.target.value as Scale)}
            color="primary"
            value={Scale.Celsius}
          />
          <Radio
            checked={scale === Scale.Fahrenheit}
            onChange={(e) => actions.changeTemperatureScale(e.target.value as Scale)}
            color="secondary"
            value={Scale.Fahrenheit}
          />
          <span>{Scale.Fahrenheit}</span>
        </Card>
      </Box>
      <Card className={cn(classes.card, classes.containerCard)}>
        <Box className={classes.pagingArrows}>
          <Box>
            {isLeftArrowVisible && (
              <ArrowRightAltIcon
                onClick={() => actions.changePageIndex(pageIndex - pageSize)}
                className={cn(classes.arrow, classes.arrowLeft)}
              />
            )}
          </Box>
          <Box>
            {isRightArrowVisible && (
              <ArrowRightAltIcon
                onClick={() => actions.changePageIndex(pageIndex + pageSize)}
                className={classes.arrow}
              />
            )}
          </Box>
        </Box>
        <Box className={classes.forecastContainer}>
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
