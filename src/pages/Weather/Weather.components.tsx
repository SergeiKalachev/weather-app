// tslint:disable: no-magic-numbers
import React, { FC } from 'react';
import cn from 'classnames';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles';
import { MyTheme } from '../../model/theme.model';
import { Scale } from '../../store/Weather/Weather.model';
import { converterFromKelvin } from '../../store/Weather/Weather.reducer';
import { theme } from '../../App';

type WeatherForecastProps = {
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
  },
  barchart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '5px',
    '&:last-child': {
      marginRight: 0
    }
  },
  'barchart__level-container': {
    display: 'flex',
    alignItems: 'flex-end',
    width: '45px',
    height: '100%'
  },
  barchart__level: {
    width: '100%'
  }
}));

const temperatureLetter = {
  [Scale.Celsius]: 'C',
  [Scale.Fahrenheit]: 'F'
};

export const WeatherForecast: FC<WeatherForecastProps> = ({ date, averageTemperature, scale, selected, onClick }) => {
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

type SegmentBarChartProps = {
  temperature: number;
  maxTemperature: number;
  date: string;
  scale: Scale;
};

export const SegmentBarChart: FC<SegmentBarChartProps> = ({ temperature, scale, maxTemperature }) => {
  const classes = useStyles();
  const converter = converterFromKelvin[scale];
  const converterToFahrenheit = converterFromKelvin[Scale.Fahrenheit];
  const converterToCelsius = converterFromKelvin[Scale.Celsius];

  return (
    <Box className={classes.barchart}>
      <Box className={classes['barchart__level-container']}>
        <Box
          className={classes.barchart__level}
          style={{
            height: `${100 * converterToFahrenheit(temperature) / converterToFahrenheit(maxTemperature)}%`,
            backgroundColor: Math.sign(converterToCelsius(temperature)) === 1 ? theme.custom.orange : theme.custom.blue
          }}
        />
      </Box>
      {`${converter(temperature).toFixed()} ${temperatureLetter[scale]}`}
    </Box>
  );
};
