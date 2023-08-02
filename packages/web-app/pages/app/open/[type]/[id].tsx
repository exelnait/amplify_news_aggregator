import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useFragment } from '@apollo/client';

import {
  BaseNewsItemFragmentDoc,
  NewsItemModel,
  SourceType,
  useGetNewsItemLazyQuery,
} from '../../../../data/data';
import { PageLoader } from '../../../../presentation/common/common.presentation';
import AppLayout from '../../layout';

import {
  Article,
  Video,
} from '../../../../presentation/news/news.presentation';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Button } from '@aws-amplify/ui-react';

export default function OpenNewsItem() {
  const router = useRouter();
  const { data: newsItemFragment } = useFragment({
    fragment: BaseNewsItemFragmentDoc,
    fragmentName: 'BaseNewsItem',
    from: {
      __typename: 'NewsItem',
      id: router.query?.id,
    },
  });
  const [getNewsItem, { data, loading, error }] = useGetNewsItemLazyQuery();
  useEffect(() => {
    const { id: newsItemId, type: newsItemType } = router.query;
    if (newsItemId && newsItemType) {
      getNewsItem({
        // fetchPolicy: 'cache-and-network',
        variables: {
          id: newsItemId as string,
        },
      });
    }
  }, [router.query]);
  const newsItem = data?.getNewsItemRSS
    ? NewsItemModel.fromGraphQL(data?.getNewsItemRSS)
    : newsItemFragment?.id && NewsItemModel.fromGraphQL(newsItemFragment);
  return (
    <div className="mx-auto w-full max-w-[1000px] p-3">
      <Button onClick={() => router.back()}>
        <ArrowLeftIcon className="h-6 w-6" />
      </Button>
      <div className="h-5"></div>
      {newsItem && newsItem.type === SourceType.Rss && (
        <Article item={newsItem} />
      )}
      {newsItem && newsItem.type === SourceType.Youtube && (
        <Video item={newsItem} />
      )}
      {loading && <PageLoader />}
    </div>
  );
}

OpenNewsItem.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
