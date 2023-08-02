import Link from 'next/link';
import { NewsItemModel } from '../../../data/data';

interface IProps {
  data: NewsItemModel;
}

export function NewsCard({ data }: IProps) {
  return (
    <Link href={`/app/open/${data.type.toLowerCase()}/${data.id}`}>
      <button
        type="button"
        className="bg-white hover:bg-gray-100 shadow overflow-hidden sm:rounded-lg mb-4 px-4 py-5 sm:px-6 w-full"
      >
        <div className="flex mb-3">
          {data.coverUrl && (
            <div className="w-96 aspect-square overflow-hidden mr-5">
              <img
                className=" rounded-sm max-w-none h-[140%] mt-[-20%] ml-[-50%] "
                src={data.coverUrl}
                alt={data.title}
              />
            </div>
          )}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {data.title}
            </h3>
            <p className="text-sm text-ellipsis overflow-hidden">
              {data.description}
            </p>
            <div className="flex justify-between">
              <div className="flex gap-x-6">
                <img
                  className="h-4 w-4 rounded-sm"
                  src={data.publisher.avatarUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base leading-4 tracking-tight text-gray-900">
                    {data.publisher.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm">{data.publishedAtFormatted}</p>
            </div>
          </div>
        </div>
      </button>
    </Link>
  );
}
