import React, { useCallback, useState } from 'react';
import { Button, Expander, ExpanderItem } from '@aws-amplify/ui-react';
import { Outlet } from '@remix-run/react';
import { PlusIcon } from '@heroicons/react/20/solid';
import {
  ListPublishersDocument,
  ListPublishersQuery,
  SourceType,
  TopicModel,
  useCreatePublisherMutation,
  useCreateTopicMutation,
  useListPublishersQuery,
} from '../data/data';
import {
  CreateTopicFormData,
  CreateTopicModal,
} from '../presentation/topic/topic.presentation';
import {
  CreatePublisherFormData,
  CreatePublisherModal,
  PublisherCard,
} from '../presentation/publisher/publisher.presentation';

export default function MainLayout() {
  let [isOpenCreateTopicModal, setIsOpenCreateTopicModal] = useState(false);
  let [isOpenCreatePublisherModal, setIsOpenCreatePublisherModal] =
    useState(false);
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

  const userId = dataListPublishers?.myUser?.id;
  const topics =
    dataListPublishers?.myUser.topics?.items.map(TopicModel.fromGraphQL) ?? [];
  const expanded = topics.map((topic) => topic.id);

  const handleCreateTopic = useCallback(
    async (data: CreateTopicFormData) => {
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
                        items: [
                          ...(data?.myUser?.topics?.items ?? []),
                          newTopic,
                        ],
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
    },
    [createTopic, userId]
  );

  const handleCreatePublisher = useCallback(
    async (data: CreatePublisherFormData & { topicId: string }) => {
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
    },
    [createPublisher]
  );

  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div>Navbar</div>
      <div className="grid md:grid-cols-sidebar">
        <div className="p-2">
          <Expander type="multiple" value={expanded}>
            {topics.map((topic) => (
              <ExpanderItem title={topic.title} value={topic.id}>
                {topic.publishers.map((publisher) => (
                  <PublisherCard publisher={publisher}></PublisherCard>
                ))}
                <CreatePublisherModal
                  isOpen={isOpenCreatePublisherModal}
                  onClose={() => setIsOpenCreatePublisherModal(false)}
                  onSubmit={(data) =>
                    handleCreatePublisher({ ...data, topicId: topic.id })
                  }
                />
                <div className="w-full flex justify-center p-2">
                  <Button
                    className="mt-10"
                    onClick={() => setIsOpenCreatePublisherModal(true)}
                  >
                    <PlusIcon className="h-6 w-6" />
                  </Button>
                </div>
              </ExpanderItem>
            ))}
          </Expander>
          <div className="w-full flex justify-center p-2">
            <Button
              className="mt-10"
              onClick={() => setIsOpenCreateTopicModal(true)}
            >
              <PlusIcon className="h-6 w-6" />
            </Button>
          </div>
          <CreateTopicModal
            isOpen={isOpenCreateTopicModal}
            onClose={() => setIsOpenCreateTopicModal(false)}
            onSubmit={handleCreateTopic}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
