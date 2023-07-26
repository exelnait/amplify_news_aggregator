import {
  getItem,
  putItem,
  queryItems,
  scanItems,
  TABLES,
} from '../aws-utils/dynamodb';
import { CreateUserInput, User } from '../API';
import { AppSyncIdentityCognito } from 'aws-lambda/trigger/appsync-resolver';
import { DynamoDB } from '@aws-sdk/client-dynamodb';

export function getUserEmailFromEventIdentity(event): string {
  const identity = event.identity as AppSyncIdentityCognito;
  return event.identity.claims?.email;
}

export function createUser(input: CreateUserInput) {
  return putItem<User, CreateUserInput>(TABLES.User, input, 'User');
}

export function getUserByEmail(email: string): Promise<User> {
  return scanItems<User>({
    TableName: TABLES.User,
    ExpressionAttributeValues: {
      ':email': {
        S: email,
      },
    },
    FilterExpression: 'email = :email',
  }).then((data) => {
    if (data.length === 0) {
      throw new Error(`Unable to find user with email: ${email}`);
    } else {
      return data[0];
    }
  });
}
