import Head from 'next/head';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import 'rsuite/dist/rsuite.min.css';
import MainLayout from '~/layouts/MainLayout';
import { GlobalProvider } from '~/context';
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
      <GlobalProvider>
        <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
      </GlobalProvider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
