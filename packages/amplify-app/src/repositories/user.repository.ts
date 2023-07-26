import {putItem, queryItems, TABLES} from "../aws-utils/dynamodb";
import {CreateUserInput, UserPublisherSubscription, User} from "../API";

export function createUser(input: CreateUserInput) {
    return putItem<User, CreateUserInput>(TABLES.User, input, "User");
}

export function getUserPublisherSubscriptions(userId: string) {
    return queryItems<UserPublisherSubscription>({
        KeyConditionExpression: "userID = :userID",
        ExpressionAttributeValues: {
            ":userID": { S: userId }
        },
        IndexName: 'byUser',
        TableName: TABLES.UserPublisherSubscription,
    });
}