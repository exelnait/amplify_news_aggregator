import { randomUUID } from 'crypto';
import type { AppSyncResolverHandler } from 'aws-lambda';

import {
  CreatePublisherCustomMutationVariables,
  CreatePublisherSourceInput,
  Picture,
  PictureType,
  SourceType,
} from '../../../../../src/API';
import { saveFileByUrl } from '../../../../../src/aws-utils/s3';
import {
  createPublisher,
  createPublisherSources,
} from '../../../../../src/repositories/publisher.repository';
import { createPicture } from '../../../../../src/repositories/picture.repository';
import { parseRssFeed } from '../../../../../src/utils/rss/parse_feed';
import { parseYouTubeXMLFeed } from '../../../../../src/utils/youtube/parse_youtube_xml';
import { aggregateAllNewsItemsForPublisher } from '../../../../../src/services/publisher.service';
import {
  getChannelIdByUsername,
  getChannelInfoById,
  getChannelInfoByUsername,
} from '../../../../../src/utils/youtube/youtube_api';
import {
  getUserByEmail,
  getUserEmailFromEventIdentity,
} from '../../../../../src/repositories/user.repository';

export const handler: AppSyncResolverHandler<
  CreatePublisherCustomMutationVariables,
  any
> = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event, null, 2)}`);

  try {
    const userEmail = getUserEmailFromEventIdentity(event);
    const currentUser = await getUserByEmail(userEmail);
    const currentUserID = currentUser.id;

    let {
      title,
      description,
      avatarUrl,
      coverUrl,
      topicID,
      websiteUrl,
      sources,
    } = event.arguments.input;

    const publisherId = randomUUID();

    const sourcesToAggregate: SourceType[] = [];

    const sourceInputs = await Promise.all(
      sources.map(async (source) => {
        let title: string = null;
        switch (source.type) {
          case SourceType.RSS: {
            // const feed = await parseRssFeed(source.rss.url);
            title = 'RSS';
            sourcesToAggregate.push(SourceType.RSS);
            break;
          }
          case SourceType.YOUTUBE: {
            let channelInfo;
            if (source.youtube.url) {
              if (source.youtube.url.includes('channel')) {
                source.youtube.channelID =
                  source.youtube.url.split('channel/')[1];
                channelInfo = await getChannelInfoById(
                  source.youtube.channelID
                );
              } else {
                source.youtube.username = source.youtube.url
                  .split('youtube.com/')[1]
                  .replace('@', '');
                channelInfo = await getChannelInfoByUsername(
                  source.youtube.username
                );
                source.youtube.channelID = channelInfo.channelId;
              }
            }
            avatarUrl = channelInfo.thumbnails.default.url;
            title = 'YouTube';
            sourcesToAggregate.push(SourceType.YOUTUBE);
            break;
          }
          case SourceType.ITUNES: {
            // const feed = await parseRssFeed(source.itunes.url);
            title = 'Apple Podcasts';
            //TODO: parse itunes podcast link https://www.labnol.org/podcast/
            sourcesToAggregate.push(SourceType.ITUNES);
            break;
          }
        }
        return {
          title: title,
          type: source.type,
          publisherID: publisherId,
          publisherTopicID: topicID,
          isHidden: false,
          rss: source.rss,
          twitter: source.twitter,
          youtube: source.youtube,
          itunes: source.itunes,
          creatorID: currentUserID,
        } as CreatePublisherSourceInput;
      })
    );

    if (websiteUrl) {
      sourceInputs.push({
        type: SourceType.WEBSITE,
        publisherID: publisherId,
        publisherTopicID: topicID,
        creatorID: currentUserID,
        isHidden: false,
        website: {
          url: websiteUrl,
        },
      });
    }

    const avatarFile = await saveFileByUrl({
      url: avatarUrl,
      key: `public/publisher/${title}/avatar`,
    });
    const avatarPicture = await createPicture({
      type: PictureType.AVATAR,
      bucket: avatarFile.bucket,
      key: avatarFile.key,
    });

    let coverPicture: Picture | null = null;
    if (coverUrl) {
      const coverFile = await saveFileByUrl({
        url: coverUrl,
        key: `public/publisher/${title}/cover`,
      });
      coverPicture = await createPicture({
        type: PictureType.COVER,
        bucket: coverFile.bucket,
        key: coverFile.key,
      });
    }

    const createdPublisher = await createPublisher({
      id: publisherId,
      title,
      description,
      topicID: topicID,
      creatorID: currentUserID,
      avatarID: avatarPicture.id,
      coverID: coverPicture?.id,
    });

    await createPublisherSources(sourceInputs);

    await aggregateAllNewsItemsForPublisher(
      createdPublisher.id,
      sourcesToAggregate
    );

    return createdPublisher;
  } catch (e) {
    throw new Error(e.message);
  }
};
