import { NewsItemModel } from '../../../data/news/NewsItem.model';
import styles from './Article.module.css';

interface IProps {
  item: NewsItemModel;
}

export function Article({ item }: IProps) {
  return (
    <main className="flex justify-between">
      <article className="mx-auto w-full">
        <header className="mb-4 lg:mb-6 not-format">
          <img className="w-full rounded-lg mb-4" src={item.coverUrl} />
          <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
            {item.title}
          </h1>
          <div className="flex justify-between">
            <div className="flex gap-x-6">
              <img
                className="h-4 w-4 rounded-sm"
                src={item.publisher.avatarUrl}
                alt=""
              />
              <div>
                <h3 className="text-base leading-4 tracking-tight text-gray-900">
                  {item.publisher.title}
                </h3>
              </div>
            </div>
            <p className="text-sm">{item.publishedAtFormatted}</p>
          </div>
        </header>
        {item?.content && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
        )}
      </article>
    </main>
  );
}
