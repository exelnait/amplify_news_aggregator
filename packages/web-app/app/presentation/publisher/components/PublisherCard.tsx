import { Button } from '@aws-amplify/ui-react';
import { PublisherModel } from '../../../data/publisher/Publisher.model';
interface IProps {
  publisher: PublisherModel;
}

export function PublisherCard({ publisher }: IProps) {
  return (
    <Button
      isFullWidth={true}
      variation="link"
      key={publisher.id}
      className="mx-1 !justify-start"
    >
      <div className="flex gap-x-6">
        <img className="h-8 w-8 rounded-md" src={publisher.avatarUrl} alt="" />
        <div>
          <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
            {publisher.title}
          </h3>
        </div>
      </div>
    </Button>
  );
}
