import { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { useGetPublisherNewsFeedQuery } from '../graphql/schema';
import { NewsItemModel } from '../data/data';
import { NewsCard } from '../presentation/news/components/NewsCard';
import { PageLoader } from '../presentation/common/common.presentation';

export const loader = async ({ params }: LoaderArgs) => {
  return {
    publisherId: params.id,
  };
};

export default function NewsFeed() {
  const { publisherId } = useLoaderData<typeof loader>();
  if (!publisherId) {
    throw new Error('No publisher id');
  }
  const { data, loading, error } = useGetPublisherNewsFeedQuery({
    variables: {
      id: publisherId,
    },
  });
  const news =
    data?.getPublisher?.news?.items.map(NewsItemModel.fromGraphQL) ?? [];
  return (
    <div className="w-full flex">
      <div className="mx-auto w-full max-w-[800px] p-3">
        {loading && <PageLoader />}
        {news.map((newsItem) => {
          return <NewsCard data={newsItem} key={newsItem.id} />;
        })}
      </div>
    </div>
  );
}
