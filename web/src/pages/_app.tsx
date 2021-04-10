import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import React from 'react';
import { Provider } from 'urql';
import theme from '../theme';
import { createUrqlClient } from '../utils/createUrqlClient';

function MyApp({ Component, pageProps }: any ) {
  return (
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
  );
}

export default MyApp
