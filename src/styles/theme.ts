import { getApplicationName } from 'react-native-device-info';
import { Theme } from '../types';

const appName = getApplicationName();

const theme: Theme = {
  colors: {
    primary: '#ffd761',
    secondary: '#000',
    error: '#FF4F4F',
    primaryText: '#000',
    secondaryText: '#7E7E7E',
    background: '#FFF',
    foreground: '#FFF',
    formsBackground: '#F0F3F8',
    border: '#F0F3F8',
    toast: {
      danger: '#FF4F4F',
      success: '#21BA45',
      warning: '#FBBD08',
    },
  },
  fonts: {
    light: {
      fontFamily: 'CircularStd-Book',
    },
    medium: {
      fontFamily: 'CircularStd-Medium',
    },
    bold: {
      fontFamily: 'CircularStd-Bold',
    },
    black: {
      fontFamily: 'CircularStd-Black',
    },
  },
};

switch (appName) {
  case 'Prime Gestão de Serviços': {
    theme.colors = {
      ...theme.colors,
      primary: '#F36133',
      secondary: '#FF7A00',
    };
    break;
  }

  case 'Link Gestão de Serviços': {
    theme.colors = {
      ...theme.colors,
      primary: '#1B2D6E',
      secondary: '#FF9318',
    };
    break;
  }

  case 'Neo Gestão de Serviços': {
    theme.colors = {
      ...theme.colors,
      primary: '#007DF1',
      secondary: '#1B2D6F',
    };
    break;
  }

  case 'Fitcard Gestão de Serviços': {
    theme.colors = {
      ...theme.colors,
      primary: '#D43438',
      secondary: '#E000',
    };
    break;
  }

  default: break;
}

export default theme;
