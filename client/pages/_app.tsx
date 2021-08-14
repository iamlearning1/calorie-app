import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { store } from '../app/store';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
