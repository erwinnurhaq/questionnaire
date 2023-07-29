import { Fragment, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Provider } from 'react-redux';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Analytics } from '@vercel/analytics/react';
import NProgress from 'nprogress';
import 'rsuite/dist/rsuite.min.css';
import 'nprogress/nprogress.css';

import { store } from '~/store';
import MainLayout from '~/layouts/MainLayout';
import '../styles/globals.css';

NProgress.configure({ easing: 'ease', trickleSpeed: 100 });

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const onRouteChangeStart = () => NProgress.start();
  const onRouteChangeEnd = () => NProgress.done();

  useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart);
    Router.events.on('routeChangeComplete', onRouteChangeEnd);
    Router.events.on('routeChangeError', onRouteChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart);
      Router.events.off('routeChangeComplete', onRouteChangeEnd);
      Router.events.off('routeChangeError', onRouteChangeEnd);
    };
  }, []);

  return (
    <Fragment>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <Head>
          <title>Questionnaire</title>
          <meta name="description" content="Questionnaire app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Provider store={store}>
          <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
        </Provider>
      </GoogleReCaptchaProvider>
      <Analytics />
    </Fragment>
  );
}

export default MyApp;
