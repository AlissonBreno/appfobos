export interface Font {
  fontFamily: string;
  fontWeight?:
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
}

export interface Fonts {
  light: Font;
  medium: Font;
  bold: Font;
  black: Font;
}

interface ToastColors {
  danger: string;
  success: string;
  warning: string;
}

export interface Colors {
  primary: string;
  secondary: string;
  error: string;
  primaryText: string;
  secondaryText: string;
  background: string;
  foreground: string;
  formsBackground: string;
  border: string;
  toast: ToastColors;
}

export interface Theme {
  colors: Colors;
  fonts: Fonts;
}
