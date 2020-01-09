import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@material-ui/styles';
import { getWeatherInfoThunk } from './store/Weather/Weather.actions';
import { getUserInfoThunk } from './store/User/User.actions';
import Weather from './pages/Weather/Weather.container';
import Loading from './components/Loading';
import { theme, MyTheme } from './model/theme.model';
import { Box, makeStyles } from '@material-ui/core';
import { AppState } from './store/rootReducer';

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

const redirectToAuthPage = () => {
  window.location.href = 'https://github.com/login/oauth/authorize?response_type=code&client_id=55b9ec48b5dc1feed4e3&redirect_uri=http://localhost:3000/callback&scope=public_repo';
};

const App: React.FC = () => {
  const [ loading, setLoading ] = useState(true);
  const classes = useStyles();
  const user = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  const actions = bindActionCreators({
    getWeatherInfoThunk,
    getUserInfoThunk
  }, dispatch);

  useEffect(() => {
    setLoading(true);

    actions.getWeatherInfoThunk()
    .then(() => setLoading(false));
  }, [ dispatch, actions ]);

  if (user.token) {
    return (
      <ThemeProvider theme={theme}>
        <Box className={classes.app}>
          {loading ? <Loading /> : <Weather />}
        </Box>
      </ThemeProvider>
    );
  } else {
    return (
      <>
        <div>Press button to log in</div>
        <button onClick={redirectToAuthPage}>
          Authorize
        </button>
      </>
    );
  }
};

export default App;
