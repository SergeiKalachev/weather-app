import createMuiTheme, { ThemeOptions, Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
   custom: {
     [index: string]: any
   };
  }

  interface ThemeOptions {
    custom: {
      [index: string]: any
    };
  }
}

export function createMyTheme(options: ThemeOptions) {
  return createMuiTheme(options)
}

export type MyTheme = ReturnType<typeof createMyTheme>;
