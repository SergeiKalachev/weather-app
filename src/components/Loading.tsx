import React from 'react';
import { makeStyles } from '@material-ui/core';
import { MyTheme } from '../model/theme.model';

type Props = {
  loadingText?: string;
};

const useStyles = makeStyles<MyTheme>((theme) => ({
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '@keyframes dots': {
    '0%, 20%': {
      color: 'rgba(0,0,0,0)',
      textShadow: '.25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0)'
    },
    '40%': {
      color: 'black',
      textShadow: '.25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0)'
    },
    '60%': {
      textShadow: '.25em 0 0 black, .5em 0 0 rgba(0,0,0,0)'
    },
    '80%, 100%': {
      textShadow: '.25em 0 0 black, .5em 0 0 black'
    }
  },
  loading__text: {
    display: 'inline-block',
    fontSize: '25px',
    borderRadius: '3px',
    backgroundColor: 'white',
    padding: '16px 20px',
    boxShadow: theme.custom.boxShadow1,
    color: 'black',
    '&:after': {
      content: '"."',
      animation: '$dots 1s steps(5, end) infinite'
    }
  }
}));

const Loading: React.FC<Props> = ({ loadingText = 'Loading' }) => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <div className={classes.loading__text}>{loadingText}</div>
    </div>
  );
};

export default Loading;
