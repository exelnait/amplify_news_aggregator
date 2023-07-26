import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import { createUser } from '../../../../../src/repositories/user.repository';

export const handler: PostConfirmationTriggerHandler = async (
  event,
  context
) => {
  console.log(JSON.stringify(event, null, 2));

  const { userName } = event;
  const { sub, email } = event.request.userAttributes;

  await createUser({
    userName,
    email,
  });
  return event;
};
