import { useGetNewsFeedQuery } from '../graphql/schema';
import { NewsItemModel } from '../data/data';

export default function NewsFeed() {
  const { data, loading, error } = useGetNewsFeedQuery();
  const news = data?.myUser.news?.items.map(NewsItemModel.fromGraphQL) ?? [];
  return (
    <div className="w-full flex">
      <div className="mx-auto w-full max-w-[800px]">
        {news.map((newsItem) => {
          return (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {newsItem.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  publisher
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
