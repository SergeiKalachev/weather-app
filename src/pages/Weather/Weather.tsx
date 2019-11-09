import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import './Weather.scss';
import { Scale } from '../../model/weather.model';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import { MyTheme } from '../../model/theme.model';

const useStyles = makeStyles<MyTheme>((theme) => ({
  card: {
    padding: '0 10px',
    boxShadow: theme.custom.boxShadow1
  }}));

const Weather: React.FC = () => {
  const [scale, setScale] = useState<Scale>(Scale.Fahrenheit);
  const classes = useStyles();

  return (
    <div className="temperature-scale">
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
    </div>
  );
}

export default Weather;
