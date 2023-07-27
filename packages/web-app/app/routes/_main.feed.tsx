import { useGetNewsFeedQuery } from '../graphql/schema';
import { NewsItemModel } from '../data/data';
import { NewsCard } from '../presentation/news/components/NewsCard';
import { PageLoader } from '../presentation/common/components/PageLoader';

export default function NewsFeed() {
  const { data, loading, error } = useGetNewsFeedQuery();
  const news = data?.myUser.news?.items.map(NewsItemModel.fromGraphQL) ?? [];
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
