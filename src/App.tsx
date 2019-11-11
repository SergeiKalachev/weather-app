import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@material-ui/styles';
import './App.scss';
import * as weatherActionCreators from './store/Weather/Weather.actions';
import Weather from './pages/Weather/Weather';
import Loading from './components/Loading';
import { createMyTheme } from './model/theme.model';
import { AppState } from './store/rootReducer';
import { WeatherSegment } from './store/Weather/Weather.model';

// TODO: customize toast
toast.configure();

const theme = createMyTheme({
  custom: {
    bgGray: 'rgb(192, 192, 192)',
    boxShadowDark: 'rgb(58, 58, 58)',
    boxShadow1: '0 0 5px rgb(58, 58, 58)'
  }
});

const App: React.FC = () => {
  const [ loading, setLoading ] = useState(true);
  const weatherSegments = useSelector<AppState, WeatherSegment[]>((state) => state.weatherInfo.weatherSegments);
  const dispatch = useDispatch();
  // tslint:disable-next-line: no-console
  console.log(weatherSegments);

  useEffect(() => {
    const actions = bindActionCreators({
      ...weatherActionCreators
    }, dispatch);

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
