import React, { useDeferredValue, useState } from 'react';
import Link from 'next/link';
import { Button } from '@aws-amplify/ui-react';
import { PlusIcon } from '@heroicons/react/20/solid';
import {
  ListPublishersDocument,
  ListPublishersQuery,
  SourceType,
  TopicModel,
  useCreatePublisherMutation,
  useCreateTopicMutation,
  useListPublishersQuery,
} from '../../../data/data';
import {
  CreateTopicFormData,
  CreateTopicModal,
  TopicsWrapper,
} from '../../topic/topic.presentation';
import {
  CreatePublisherFormData,
  CreatePublisherModal,
  PublisherCard,
} from '../../publisher/publisher.presentation';

export function Sidebar() {
  const [isOpenCreateTopicModal, setIsOpenCreateTopicModal] = useState(false);
  const [isOpenCreatePublisherModal, setIsOpenCreatePublisherModal] =
    useState(false);
  const [activeTopic, setActiveTopic] = useState<TopicModel | null>(null);
  const {
    loading: loadingListPublishers,
    error: errorListPublishers,
    data: dataListPublishers,
  } = useListPublishersQuery();
  const [
    createTopic,
    {
      loading: loadingCreateTopic,
      error: errorCreateTopic,
      data: dataCreateTopic,
    },
  ] = useCreateTopicMutation();
  const [
    createPublisher,
    {
      loading: loadingCreatePublisher,
      error: errorCreatePublisher,
      data: dataCreatePublisher,
    },
  ] = useCreatePublisherMutation();

  const userId = useDeferredValue(dataListPublishers?.myUser?.id);
  const topics =
    dataListPublishers?.myUser.topics?.items.map(TopicModel.fromGraphQL) ?? [];
  const expanded = topics.map((topic) => topic.id);

  const handleCreateTopic = async (data: CreateTopicFormData) => {
    if (!userId) {
      throw new Error('No user id');
    }
    await createTopic({
      variables: {
        input: {
          title: data.title,
          creatorID: userId,
        },
      },
      update: (cache, { data }) => {
        const newTopic = data?.createTopic;
        if (newTopic) {
          cache.updateQuery<ListPublishersQuery>(
            {
              query: ListPublishersDocument,
            },
            (data) => {
              if (data) {
                return {
                  myUser: {
                    ...data.myUser,
                    topics: {
                      items: [...(data?.myUser?.topics?.items ?? []), newTopic],
                    },
                  },
                };
              }
            }
          );
        }
      },
    });
    setIsOpenCreateTopicModal(false);
  };

  const handleCreatePublisher = async (
    data: CreatePublisherFormData & { topicId: string }
  ) => {
    await createPublisher({
      variables: {
        input: {
          title: data.title,
          websiteUrl: data.websiteUrl,
          topicID: data.topicId,
          sources: data.sources.map((source) => ({
            type: source.type,
            rss:
              source.type === SourceType.Rss
                ? {
                    url: source.url,
                  }
                : undefined,
            youtube:
              source.type === SourceType.Youtube
                ? {
                    url: source.url,
                  }
                : undefined,
            itunes:
              source.type === SourceType.Itunes
                ? {
                    url: source.url,
                  }
                : undefined,
          })),
        },
      },
    });
    setIsOpenCreatePublisherModal(false);
  };

  return (
    <div className="p-3">
      <ul className="space-y-2 font-medium mb-6 ">
        <li>
          <Link
            href="/app/feed"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">My Feed</span>
          </Link>
          <Link
            href="/app/settings"
            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
          </Link>
        </li>
      </ul>
      <TopicsWrapper>
        {topics.map((topic) => (
          <div key={topic.id}>
            <h3 className=" text-lg mb-2">{topic.title}</h3>
            {topic.publishers.map((publisher) => (
              <Link key={publisher.id} href={`/app/publisher/${publisher.id}`}>
                <PublisherCard publisher={publisher}></PublisherCard>
              </Link>
            ))}
            <div className="w-full flex justify-center p-2">
              <Button
                className="mt-10"
                onClick={() => {
                  setActiveTopic(topic);
                  setIsOpenCreatePublisherModal(true);
                }}
              >
                <PlusIcon className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ))}
      </TopicsWrapper>
      <div className="w-full flex justify-center p-2">
        <Button
          className="mt-10"
          onClick={() => setIsOpenCreateTopicModal(true)}
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      </div>
      {activeTopic && (
        <CreatePublisherModal
          isLoading={loadingCreatePublisher}
          isOpen={isOpenCreatePublisherModal}
          onClose={() => setIsOpenCreatePublisherModal(false)}
          topicTitle={activeTopic.title}
          onSubmit={(data) =>
            handleCreatePublisher({ ...data, topicId: activeTopic!.id })
          }
        />
      )}
      {userId && (
        <CreateTopicModal
          isLoading={loadingCreateTopic}
          isOpen={isOpenCreateTopicModal}
          onClose={() => setIsOpenCreateTopicModal(false)}
          onSubmit={handleCreateTopic}
        />
      )}
    </div>
  );
}
