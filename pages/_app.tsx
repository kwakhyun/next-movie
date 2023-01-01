import { useState } from 'react';
import Head from 'next/head';
import App, { AppContext, AppProps } from 'next/app';
import { PaletteMode } from '@mui/material';

import {
  DehydratedState,
  Hydrate,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import AppLayout from '../components/layout/AppLayout';
import BaseDefaultSeo from '../components/seo/BaseDefaultSeo';
import PageProgressBar from '../components/common/PageProgressBar';

import BaseThemeProvider, {
  getInitialPaletteMode,
} from '../theme/BaseThemeProvider';
import createEmotionCache from '../theme/createEmotionCache';

import { APP_TITLE } from '../shared/constants/commonConstants';
import { createQueryClient } from '../shared/clients/queryClient';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type PageProps = { dehydratedState: DehydratedState };

type MyAppProps = AppProps<PageProps> & {
  emotionCache?: EmotionCache;
  initialPaletteMode: PaletteMode;
};

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
  initialPaletteMode,
}: MyAppProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <title>{APP_TITLE}</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            {process.env.GOOGLE_SITE_VERIFICATION && (
              <meta
                name="google-site-verification"
                content={process.env.GOOGLE_SITE_VERIFICATION}
              />
            )}
          </Head>
          <BaseDefaultSeo />
          <BaseThemeProvider initialPaletteMode={initialPaletteMode}>
            <PageProgressBar />
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </BaseThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
    initialPaletteMode: getInitialPaletteMode(appContext.ctx),
  };
};

export default MyApp;
