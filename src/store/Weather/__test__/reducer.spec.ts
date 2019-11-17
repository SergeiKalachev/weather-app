// tslint:disable: no-magic-numbers
import { weatherInfoReducer, WeatherState } from '../Weather.reducer';
import { WeatherActionTypes, Scale, GET_WEATHER_INFO, CHANGE_PAGE_INDEX } from '../Weather.model';

describe('Weather reducer', () => {
  let initialState: WeatherState;

  beforeEach(() => {
    initialState = weatherInfoReducer(undefined, {} as WeatherActionTypes);
  });

  it('Should return the initial state', () => {
    const state = weatherInfoReducer(undefined, {} as WeatherActionTypes);
    expect(state).toEqual({
      error: null,
      forecasts: [],
      pageIndex: 0,
      pageSize: 3,
      scale: Scale.Fahrenheit,
      selectedForecast: null
    });
  });

  it(`Should handle ${GET_WEATHER_INFO}`, () => {
    const mockedWeatherInfo = [
      {
        dt: 1573754400,
        main: {
          temp: 272.15,
          temp_min: 272.15,
          temp_max: 273.47,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 928,
          humidity: 96,
          temp_kf: -1.32
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n'
          }
        ],
        clouds: {
          all: 49
        },
        wind: {
          speed: 2.14,
          deg: 99
        },
        sys: {
          pod: 'n'
        },
        dt_txt: '2019-11-14 18:00:00'
      },
      {
        dt: 1573765200,
        main: {
          temp: 271.19,
          temp_min: 271.19,
          temp_max: 272.18,
          pressure: 1003,
          sea_level: 1003,
          grnd_level: 927,
          humidity: 84,
          temp_kf: -0.99
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 0.95,
          deg: 130
        },
        sys: {
          pod: 'n'
        },
        dt_txt: '2019-11-14 21:00:00'
      },
      {
        dt: 1573776000,
        main: {
          temp: 271.93,
          temp_min: 271.93,
          temp_max: 272.59,
          pressure: 1002,
          sea_level: 1002,
          grnd_level: 926,
          humidity: 84,
          temp_kf: -0.66
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 0.31,
          deg: 228
        },
        sys: {
          pod: 'n'
        },
        dt_txt: '2019-11-15 00:00:00'
      },
      {
        dt: 1573786800,
        main: {
          temp: 273.24,
          temp_min: 273.24,
          temp_max: 273.57,
          pressure: 1000,
          sea_level: 1000,
          grnd_level: 925,
          humidity: 81,
          temp_kf: -0.33
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n'
          }
        ],
        clouds: {
          all: 100
        },
        wind: {
          speed: 1.17,
          deg: 137
        },
        sys: {
          pod: 'n'
        },
        dt_txt: '2019-11-15 03:00:00'
      }
    ];
    const expectedSelectedForecast = {
      date: '14 Nov 19',
      Celsius: -1.4800000000000182,
      Fahrenheit: 29.335999999999967,
      segments: [
        {
          dt: 1573754400,
          main: {
            temp: 272.15,
            temp_min: 272.15,
            temp_max: 273.47,
            pressure: 1004,
            sea_level: 1004,
            grnd_level: 928,
            humidity: 96,
            temp_kf: -1.32
          },
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: 'scattered clouds',
              icon: '03n'
            }
          ],
          clouds: {
            all: 49
          },
          wind: {
            speed: 2.14,
            deg: 99
          },
          sys: {
            pod: 'n'
          },
          dt_txt: '2019-11-14 18:00:00'
        },
        {
          dt: 1573765200,
          main: {
            temp: 271.19,
            temp_min: 271.19,
            temp_max: 272.18,
            pressure: 1003,
            sea_level: 1003,
            grnd_level: 927,
            humidity: 84,
            temp_kf: -0.99
          },
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: 'overcast clouds',
              icon: '04n'
            }
          ],
          clouds: {
            all: 100
          },
          wind: {
            speed: 0.95,
            deg: 130
          },
          sys: {
            pod: 'n'
          },
          dt_txt: '2019-11-14 21:00:00'
        }
      ]
    };

    const state = weatherInfoReducer(undefined, {
      type: GET_WEATHER_INFO,
      weatherInfo: mockedWeatherInfo
    });

    expect(state.selectedForecast).toEqual(expectedSelectedForecast);
    expect(state.forecasts.length).toBe(2);
    expect(state.forecasts[0]).toEqual(expect.objectContaining({
      date: '14 Nov 19',
      Celsius: -1.4800000000000182,
      Fahrenheit: 29.335999999999967
    }));
    expect(state.forecasts[0].segments).toEqual([
      mockedWeatherInfo[0],
      mockedWeatherInfo[1]
    ]);
    expect(state.forecasts[1]).toEqual(expect.objectContaining({
      date: '15 Nov 19',
      Celsius: -0.5649999999999409,
      Fahrenheit: 30.983000000000107
    }));
    expect(state.forecasts[1].segments).toEqual([
      mockedWeatherInfo[2],
      mockedWeatherInfo[3]
    ]);
  });

  it(`Should handle ${CHANGE_PAGE_INDEX}`, () => {
    const stateWithForecasts = {
      ...initialState,
      forecasts: [
        {
          date: '14 Nov 19',
          Celsius: -1.4800000000000182,
          Fahrenheit: 29.335999999999967,
          segments: []
        },
        {
          date: '15 Nov 19',
          Celsius: 2.6687499999999886,
          Fahrenheit: 36.80374999999998,
          segments: []
        },
        {
          date: '16 Nov 19',
          Celsius: 2.3600000000000136,
          Fahrenheit: 36.248000000000026,
          segments: []
        },
        {
          date: '17 Nov 19',
          Celsius: 3.490000000000009,
          Fahrenheit: 38.28200000000002,
          segments: []
        },
        {
          date: '18 Nov 19',
          Celsius: 2.3537500000000477,
          Fahrenheit: 36.236750000000086,
          segments: []
        },
        {
          date: '19 Nov 19',
          Celsius: 1.8666666666666742,
          Fahrenheit: 35.360000000000014,
          segments: []
        }
      ]
    };

    const state = weatherInfoReducer(stateWithForecasts, {
      type: CHANGE_PAGE_INDEX,
      pageIndex: 4
    });

    expect(state.pageIndex).toBe(4);
    expect(state.selectedForecast).toEqual(stateWithForecasts.forecasts[4]);
  });
});
