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
    <>
      <ul className="space-y-2 font-medium mb-6">
        <li>
          <Link
            href="/feed"
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
        </li>
      </ul>
      <TopicsWrapper>
        {topics.map((topic) => (
          <div key={topic.id}>
            <h3 className=" text-lg mb-2">{topic.title}</h3>
            {topic.publishers.map((publisher) => (
              <Link key={publisher.id} href={`/publisher/${publisher.id}`}>
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
    </>
  );
}
