import { createTheme } from '@material-ui/core';
import HuninnRef from './fonts/jf-openhuninn-1.1.ttf';

const colors = {
  blackPearl: '#111C26',
  goldenYellow: '#FFDD00',
  perano: '#ADBDF0',
  illusionPink: '#F69DAB',
  softAmber: '#D7BFA3',
  salomie: '#FFD179',
  waterLeaf: '#ADF0E0',
  linen: '#F5EFE8',
  solitude: '#F2F5FD',
  whisper: '#E9E6E6',
  solitarie: '#E6D7C6',
  white: '#FFFFFF',
};

const Huninn = {
  fontFamily: 'Huninn',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `local('jf-openhuninn-1.1'), url(${HuninnRef})`,
};

export const theme = createTheme({
  colors,
  shape: {
    borderRadius: 28,
  },
  palette: {
    primary: {
      main: colors.blackPearl,
      hyperlinkColor: colors.blackPearl,
    },
    secondary: {
      main: colors.goldenYellow,
    },
    text: {
      primary: colors.blackPearl,
      secondary: colors.white,
    },
  },
  typography: {
    fontFamily: 'Noto Sans TC',
    fontSize: 16,
    allVariants: {
      color: colors.blackPearl,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Huninn],
      },
    },
  },
});
