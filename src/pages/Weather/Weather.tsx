import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Scale } from '../../model/weather.model';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import { MyTheme } from '../../model/theme.model';
import Box from '@material-ui/core/Box';
import cn from 'classnames';

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
    marginTop: '10px',
    margin: 'auto',
    minWidth: '450px',
    maxWidth: '550px'
  },
  arrow: {
    color: theme.palette.primary.main,
    cursor:'pointer',
    fontSize: '90px',
    '&:hover': {
      color: theme.palette.secondary.main,
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
  }
}));

const Weather: React.FC = () => {
  const [scale, setScale] = useState<Scale>(Scale.Fahrenheit);
  const classes = useStyles();

  return (
    <>
      <Box className={classes.temperatureScale}>
        <Card className={classes.card}>
          <span>{Scale.Celsius}</span>
          <Radio
            checked={scale === Scale.Celsius}
            onChange={(e) => setScale(e.target.value as Scale)}
            color="primary"
            value={Scale.Celsius}
          />
          <Radio
            checked={scale === Scale.Fahrenheit}
            onChange={(e) => setScale(e.target.value as Scale)}
            color="secondary"
            value={Scale.Fahrenheit}
          />
          <span>{Scale.Fahrenheit}</span>
        </Card>
      </Box>
      <Card className={cn(classes.card, classes.containerCard)}>
        <Box className={classes.pagingArrows}>
          <ArrowRightAltIcon className={cn(classes.arrow, classes.arrowLeft)} />
          <ArrowRightAltIcon className={classes.arrow} />
        </Box>
      </Card>
    </>
  );
}

export default Weather;
