import createMuiTheme, { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    custom: {
      [index: string]: any;
    };
  }

  interface ThemeOptions {
    custom: {
      [index: string]: any;
    };
  }
}

export function createMyTheme(options: ThemeOptions) {
  return createMuiTheme(options);
}

export type MyTheme = ReturnType<typeof createMyTheme>;

const boxShadow1 = '0 0 5px rgb(58, 58, 58)';

export const theme = createMyTheme({
  custom: {
    bgGray: 'rgb(192, 192, 192)',
    boxShadowDark: 'rgb(58, 58, 58)',
    boxShadow1,
    lightAqua: '#d9ffff',
    blue: '#008ec5',
    orange: '#ff8100',
    card: {
      padding: '0 10px',
      boxShadow: boxShadow1
    }
  }
});
