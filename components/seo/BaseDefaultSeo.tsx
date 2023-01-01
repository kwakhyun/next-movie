import { useRouter } from 'next/router';
import { DefaultSeo, DefaultSeoProps } from 'next-seo';

import { APP_TITLE } from '../../shared/constants/commonConstants';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const url = `${baseUrl}${pathname}`;
  const description = `TMDB 기반 영화 정보 사이트 ${APP_TITLE}`;
  return {
    titleTemplate: `%s | ${APP_TITLE}`,
    description,
    canonical: url,
    openGraph: {
      title: APP_TITLE,
      description,
      type: 'website',
      locale: 'ko_KR',
      url,
      site_name: APP_TITLE,
      images: [
        { url: `${baseUrl}/next-movie-screen.png`, width: 640, height: 422 },
      ],
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        property: 'dc:creator',
        content: 'kwakhyun',
      },
      {
        name: 'application-name',
        content: APP_TITLE,
      },
    ],
  };
};

function BaseDefaultSeo() {
  const router = useRouter();
  return <DefaultSeo {...getDefaultSeoConfig(router.asPath)} />;
}

export default BaseDefaultSeo;
