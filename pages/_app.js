import Head from 'next/head';
import { Provider } from 'react-redux';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { PersistGate } from 'redux-persist/integration/react';
import 'rsuite/dist/rsuite.min.css';

import { store, persistor } from '~/store';
import MainLayout from '~/layouts/MainLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <Head>
        <title>Questionnaire</title>
        <meta name="description" content="Questionnaire app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
        </PersistGate>
      </Provider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
