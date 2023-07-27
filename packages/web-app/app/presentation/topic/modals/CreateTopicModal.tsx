import React, { useCallback } from 'react';

import { Modal, IModalProps } from '../../common/components/Modal';
import { CreateTopic } from '../../../../ui-components';

interface IProps extends IModalProps {
  onSubmit: (data: CreateTopicFormData) => void;
}

export interface CreateTopicFormData {
  title: string;
}

export function CreateTopicModal({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: IProps) {
  const handleSubmit = useCallback((fields) => {
    onSubmit({
      title: fields.Field0,
    });
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      title="Create topic"
    >
      <CreateTopic onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
}
