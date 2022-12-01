import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    50: '#FAF5FF',
    100: '#E9D8FD',
    200: '#D6BCFA',
    300: '#B794F4',
    400: '#9F7AEA',
    500: '#805AD5',
    600: '#6B46C1',
    700: '#553C9A',
    800: '#44337A',
    900: '#322659',
  },
};

const styles = {
  global: () => ({
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      color: 'gray.900',
      bg: 'white',
    },
    '#__next': {
      minH: '100vh',
      pb: 20,
    },
  }),
};

const theme = extendTheme({ colors, styles });

export default theme;

export const containerProps = {
  m: '0 auto',
  maxW: '6xl',
  px: { base: 6, lg: 4 },
  w: 'full',
};
