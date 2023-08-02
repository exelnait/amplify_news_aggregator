import { useRouter } from 'next/router';

import { useGetPublisherNewsFeedLazyQuery } from '../../../graphql/schema';
import { NewsItemModel } from '../../../data/data';
import { NewsCard } from '../../../presentation/news/components/NewsCard';
import { PageLoader } from '../../../presentation/common/common.presentation';
import { useEffect } from 'react';
import AppLayout from '../layout';

export default function PublisherNewsFeed() {
  const router = useRouter();
  const [getPublisherNewsFeed, { data, loading, error }] =
    useGetPublisherNewsFeedLazyQuery();
  useEffect(() => {
    const { id: publisherId } = router.query;
    if (publisherId) {
      getPublisherNewsFeed({
        variables: {
          id: publisherId as string,
        },
      });
    }
  }, [router.query]);
  const news =
    data?.getPublisher?.news?.items.map(NewsItemModel.fromGraphQL) ?? [];
  return (
    <div className="mx-auto w-full max-w-[800px] p-3">
      {loading && <PageLoader />}
      {news.map((newsItem) => {
        return <NewsCard data={newsItem} key={newsItem.id} />;
      })}
    </div>
  );
}
PublisherNewsFeed.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
