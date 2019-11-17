import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@material-ui/styles';
import * as weatherActionCreators from './store/Weather/Weather.actions';
import Weather from './pages/Weather/Weather.container';
import Loading from './components/Loading';
import { theme, MyTheme } from './model/theme.model';
import { Box, makeStyles } from '@material-ui/core';

// TODO: customize toast
toast.configure();

const useStyles = makeStyles<MyTheme>(() => ({
  app: {
    boxSizing: 'border-box',
    overflow: 'auto',
    width: '100%',
    height: '100%',
    background: theme.custom.bgGray,
    padding: '10px'
  }
}));

const App: React.FC = () => {
  const [ loading, setLoading ] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    const actions = bindActionCreators(weatherActionCreators, dispatch);

    setLoading(true);

    actions.getWeatherInfoThunk()
    .then(() => setLoading(false));
  }, [ dispatch ]);

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.app}>
        {loading ? <Loading /> : <Weather />}
      </Box>
    </ThemeProvider>
  );
};

export default App;
