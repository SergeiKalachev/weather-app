import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles';
import { MyTheme } from '../../model/theme.model';
import { Scale } from '../../store/Weather/Weather.model';

type Props = {
  date: string;
  averageTemperature: number;
  scale: Scale;
};

const useStyles = makeStyles<MyTheme>((theme) => ({
  forecast: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    boxShadow: '0 0 3px rgb(58, 58, 58)'
  },
  forecastLine: {
    margin: '10px'
  },
  forecastText: {
    fontWeight: 600,
    marginRight: '2px'
  }
}));

const temperatureLetter = {
  [Scale.Celsius]: 'C',
  [Scale.Fahrenheit]: 'F'
};

export const WeatherForecast: FC<Props> = ({ date, averageTemperature, scale }) => {
  const classes = useStyles();

  return (
    <Box className={classes.forecast}>
      <Box className={classes.forecastLine}>
        <Box className={classes.forecastText} component="span">
          Date:
        </Box>
        {date}
      </Box>
      <Box className={classes.forecastLine}>
        <Box className={classes.forecastText} component="span">
          Temperature:
        </Box>
        {averageTemperature.toFixed(2)} {temperatureLetter[scale]}
      </Box>
    </Box>
  );
};
