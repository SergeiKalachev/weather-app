import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles';
import { MyTheme } from '../../model/theme.model';

type Props = {
  date: string;
  averageTemperature: number;
};

const useStyles = makeStyles<MyTheme>((theme) => ({
  forecast: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export const WeatherForecast: FC<Props> = ({ date, averageTemperature }) => {
  const classes = useStyles();

  return (
    <Box className={classes.forecast}>
      <Box component="span">Date: {date}</Box>
      <Box component="span">Temperature: {averageTemperature.toFixed(2)}</Box>
    </Box>
  );
};
