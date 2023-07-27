import React, { useCallback } from 'react';

import { Modal, IModalProps } from '../../common/components/Modal';
import { CreatePublisher } from '../../../../ui-components';
import { SourceType } from '../../../graphql/schema';

interface IProps extends IModalProps {
  topicTitle: string;
  onSubmit: (data: CreatePublisherFormData) => void;
}

interface PublisherSourceFormData {
  type: SourceType;
  url: string;
}

export interface CreatePublisherFormData {
  title: string;
  websiteUrl?: string;
  sources: PublisherSourceFormData[];
}

export function CreatePublisherModal({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
  topicTitle,
}: IProps) {
  const handleSubmit = useCallback((fields) => {
    const sources = fields.Field0.map((url) => {
      if (url.includes('youtube.com')) {
        return {
          type: SourceType.Youtube,
          url,
        };
      } else {
        return {
          type: SourceType.Rss,
          url,
        };
      }
    });
    onSubmit({
      title: fields.Field1,
      websiteUrl: fields.Field4,
      sources,
    });
  }, []);
  return (
    <Modal
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      title={`Add a new publisher to topic "${topicTitle}"`}
    >
      <CreatePublisher onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
}
