import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import cn from 'classnames';
import * as weatherActionCreators from '../../store/Weather/Weather.actions';
import { Scale } from '../../store/Weather/Weather.model';
import { MyTheme } from '../../model/theme.model';
import { getForecasts, getPageIndex, getPageSize, getScale } from './Weather.selectors';
import { WeatherForecast } from './Weather.components';

const useStyles = makeStyles<MyTheme>((theme) => ({
  card: {
    padding: '0 10px',
    boxShadow: theme.custom.boxShadow1
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
  }
}));

const Weather: React.FC = () => {
  const scale = useSelector(getScale);
  const forecasts = useSelector(getForecasts);
  const pageIndex = useSelector(getPageIndex);
  const pageSize = useSelector(getPageSize);
  const dispatch = useDispatch();
  const forecastsPage = forecasts.slice(pageIndex, pageIndex + pageSize);
  const isLeftArrowVisible = pageIndex !== 0;
  const isRightArrowVisible = pageIndex + pageSize < forecasts.length;
  const actions = bindActionCreators(weatherActionCreators, dispatch);

  const classes = useStyles();

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
          {forecastsPage.map(({ date, averageTemperature }) => (
            <WeatherForecast
              key={date}
              scale={scale}
              date={date}
              averageTemperature={averageTemperature}
            />
          ))}
        </Box>
      </Card>
    </>
  );
};

export default Weather;
