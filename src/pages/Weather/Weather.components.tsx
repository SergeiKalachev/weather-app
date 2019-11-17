// tslint:disable: no-magic-numbers
import React, { FC } from 'react';
import cn from 'classnames';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import makeStyles from '@material-ui/styles/makeStyles';
import { MyTheme, theme } from '../../model/theme.model';
import { Scale } from '../../store/Weather/Weather.model';
import { converterFromKelvin } from '../../store/Weather/Weather.reducer';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles<MyTheme>((theme) => ({
  card: theme.custom.card,
  arrow: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontSize: '90px',
    '&:hover': {
      color: theme.palette.secondary.main
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '80px',
      transform: 'rotateZ(90deg)'
    }
  },
  arrowLeft: {
    transform: 'rotateY(180deg)',
    [theme.breakpoints.down('xs')]: {
      transform: 'rotateZ(270deg)'
    }
  },
  forecast: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    boxShadow: '0 0 3px rgb(58, 58, 58)',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 1px 1px black'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '10px',
      '&:last-child': {
        marginBottom: 0
      }
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
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '33px'
    }
  },
  barchart__level: {
    width: '100%'
  }
}));

type ScaleControlsProps = {
  scale: Scale;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

export const ScaleControls: FC<ScaleControlsProps> = ({ onChange, scale }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <span>{Scale.Celsius}</span>
      <Radio
        checked={scale === Scale.Celsius}
        onChange={onChange}
        color="primary"
        value={Scale.Celsius}
      />
      <Radio
        checked={scale === Scale.Fahrenheit}
        onChange={onChange}
        color="secondary"
        value={Scale.Fahrenheit}
      />
      <span>{Scale.Fahrenheit}</span>
    </Card>
  );
};

type PagingArrowsType = {
  isLeftArrowVisible: boolean;
  isRightArrowVisible: boolean;
  onLeftArrowClick(): void;
  onRightArrowClick(): void;
  className: string;
};

export const PagingArrows: FC<PagingArrowsType> = ({
  isLeftArrowVisible,
  isRightArrowVisible,
  onLeftArrowClick,
  onRightArrowClick,
  className
}) => {
  const ArrowComponent = useMediaQuery<MyTheme>((theme) => theme.breakpoints.down('xs'))
    ? ArrowForwardIosIcon
    : ArrowRightAltIcon;
  const classes = useStyles();

  return (
    <Box className={className}>
      <Box>
        {isLeftArrowVisible && (
          <ArrowComponent
            onClick={onLeftArrowClick}
            className={cn(classes.arrow, classes.arrowLeft)}
          />
        )}
      </Box>
      <Box>
        {isRightArrowVisible && (
          <ArrowComponent
            onClick={onRightArrowClick}
            className={classes.arrow}
          />
        )}
      </Box>
    </Box>
  );
};

type WeatherForecastProps = {
  date: string;
  selected: boolean;
  averageTemperature: number;
  scale: Scale;
  onClick(): void;
};

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
