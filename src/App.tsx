import React, { useState, useEffect } from 'react';
import './App.scss';
import Weather from './pages/Weather/Weather';
import Loading from './components/Loading';
import { ThemeProvider } from '@material-ui/styles';
import { createMyTheme } from './model/theme.model';

const theme = createMyTheme({
 custom: {
  bgGray: 'rgb(192, 192, 192)',
  boxShadowDark: 'rgb(58, 58, 58)',
  boxShadow1: '0 0 5px rgb(58, 58, 58)'
 }
});

const App: React.FC = () => {
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40')
      .then((response) => response.json())
      .then((weatherData) => {
        console.log(weatherData);
        setLoading(false);
      })
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {loading ? <Loading /> : <Weather />}
      </div>
    </ThemeProvider>
  );
}

export default App;
