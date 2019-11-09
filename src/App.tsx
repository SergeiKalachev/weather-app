import React, { useState, useEffect } from 'react';
import './App.scss';
import Weather from './pages/Weather/Weather';
import Loading from './components/Loading';

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
    <div className="app">
      {loading ? <Loading /> : <Weather />}
    </div>
  );
}

export default App;
