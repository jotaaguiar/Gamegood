import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider } from '@chakra-ui/react';

import NavBar from 'components/layout/NavBar';
import Footer from 'components/layout/Footer';

import theme from 'styles/theme';
import 'styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <NavBar router={router} />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
