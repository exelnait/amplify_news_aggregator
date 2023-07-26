import { AppSyncResolverHandler } from 'aws-lambda';

import {
  getUserByEmail,
  getUserEmailFromEventIdentity,
} from '../../../../../src/repositories/user.repository';
import { GetNewsItemRSSQueryVariables, User } from '../../../../../src/API';

export const handler: AppSyncResolverHandler<
  GetNewsItemRSSQueryVariables,
  any,
  any
> = async (event) => {
  const userEmail = getUserEmailFromEventIdentity(event);
  return await getUserByEmail(userEmail);
};
