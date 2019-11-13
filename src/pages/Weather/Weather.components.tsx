import React, { FC } from 'react';
import cn from 'classnames';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles';
import { MyTheme } from '../../model/theme.model';
import { Scale } from '../../store/Weather/Weather.model';

type Props = {
  date: string;
  selected: boolean;
  averageTemperature: number;
  scale: Scale;
  onClick(): void;
};

const useStyles = makeStyles<MyTheme>((theme) => ({
  forecast: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    boxShadow: '0 0 3px rgb(58, 58, 58)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 1px 1px black'
    }
  },
  forecast_selected: {
    boxShadow: '0 0 1px 1px black',
    backgroundColor: theme.custom.lightAqua
  },
  forecast__line: {
    margin: '10px'
  },
  forecast__text: {
    fontWeight: 600,
    marginRight: '2px'
  }
}));

const temperatureLetter = {
  [Scale.Celsius]: 'C',
  [Scale.Fahrenheit]: 'F'
};

export const WeatherForecast: FC<Props> = ({ date, averageTemperature, scale, selected, onClick }) => {
  const classes = useStyles();

  return (
    <Box onClick={onClick} className={cn(classes.forecast, { [classes.forecast_selected]: selected })}>
      <Box className={classes.forecast__line}>
        <Box className={classes.forecastText} component="span">
          Date:
        </Box>
        {date}
      </Box>
      <Box className={classes.forecast__line}>
        <Box className={classes.forecast__text} component="span">
          Temperature:
        </Box>
        {averageTemperature.toFixed(2)} {temperatureLetter[scale]}
      </Box>
    </Box>
  );
};
