import { useRouter } from 'next/router';

import { useGetPublisherNewsFeedQuery } from '../../../graphql/schema';
import { NewsItemModel } from '../../../data/data';
import { NewsCard } from '../../../presentation/news/components/NewsCard';
import { PageLoader } from '../../../presentation/common/common.presentation';

export default function NewsFeed() {
  const router = useRouter();
  const { publisherId } = router.query;
  if (!publisherId) {
    throw new Error('No publisher id');
  }
  const { data, loading, error } = useGetPublisherNewsFeedQuery({
    variables: {
      id: publisherId as string,
    },
  });
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
