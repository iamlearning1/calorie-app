import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '../components/Layout';

import { store } from '../app/store';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
