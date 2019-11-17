import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@material-ui/styles';
import './App.scss';
import * as weatherActionCreators from './store/Weather/Weather.actions';
import Weather from './pages/Weather/Weather.container';
import Loading from './components/Loading';
import { theme } from './model/theme.model';

// TODO: customize toast
toast.configure();

const App: React.FC = () => {
  const [ loading, setLoading ] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const actions = bindActionCreators(weatherActionCreators, dispatch);

    setLoading(true);

    actions.getWeatherInfoThunk()
    .then(() => setLoading(false));
  }, [ dispatch ]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {loading ? <Loading /> : <Weather />}
      </div>
    </ThemeProvider>
  );
};

export default App;
