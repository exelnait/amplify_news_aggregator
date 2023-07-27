import linkifyHtml from 'linkify-html';

export interface INormalizedITunesPodcast {
  title?: string;
  description?: string;
  description_html?: string;
  link?: string;
  image?: string;
  published_date?: string;
  duration: string; //1:30:45
  keywords: string[];
  author?: string;
  audio_url?: string;
  is_explicit: boolean;
}

export function normalizeITunesXMLFeedData(
  podcastsArray
): INormalizedITunesPodcast[] {
  return podcastsArray.item.map((podcast) => {
    return {
      title: podcast.title ? podcast.title[0] : null,
      link: podcast.link ? podcast.link[0] : null,
      published_date: podcast.pubDate
        ? new Date(podcast.pubDate[0]).toISOString()
        : null,
      duration: normalizeDuration(podcast),
      keywords: normalizeKeywords(podcast),
      author: normalizeAuthor(podcast),
      audio_url: normalizeAudio(podcast),
      image: normalizeImage(podcast),
      description: normalizeDescription(podcast),
      description_html: normalizeDescriptionHTML(podcast),
      is_explicit: podcast['itunes:explicit']
        ? podcast['itunes:explicit'][0] == 'yes'
        : false,
    };
  });
}

function normalizeDuration(podcast: object): string {
  var duration = podcast['itunes:duration']
    ? podcast['itunes:duration'][0]
    : null;
  if (duration && !duration.includes(':')) {
    duration = duration.substring(0, 2) + ':' + duration.substring(2, 4);
  }
  if (!duration) {
    duration = '00:00';
  }
  return duration;
}

function normalizeKeywords(podcast: object): string[] {
  var keywords = null;
  if (podcast['itunes:keywords']) {
    keywords = podcast['itunes:keywords'][0];
  }

  if (keywords && keywords[0] == '') {
    keywords = null;
  }
  if (keywords) {
    keywords = keywords.replace(/,/g, ', ');
  }
  return keywords ? keywords.split(',') : [];
}

function normalizeAuthor(podcast: object): string {
  let author = podcast['itunes:author'] ? podcast['itunes:author'][0] : null;
  if (!author) {
    author = podcast['author'] ?? null;
  }
  if (!author) {
    author = podcast['dc:creator'] ? podcast['dc:creator'][0] : null;
  }
  if (!author) {
    author = podcast['dc:author'] ? podcast['dc:author'][0] : null;
  }
  if (author && typeof author == 'object') {
    author = author[0];
  }
  return author;
}

function normalizeAudio(podcast: object): string | null {
  let audio = podcast['enclosure'] ? podcast['enclosure'][0]['$'] : null;
  if (audio?.url?.includes('?')) {
    return audio.url.substring(0, audio.url.indexOf('?'));
  }
  return audio?.url;
}

function normalizeDescription(podcast: object): string {
  var description = podcast['itunes:summary']
    ? podcast['itunes:summary'][0]
    : null;
  if (!description) {
    description = podcast['itunes:subtitle']
      ? podcast['itunes:subtitle'][0]
      : null;
  }
  if (description && typeof description == 'object') {
    description = description[0];
  }
  return description ? linkifyHtml(description) : null;
}

function normalizeDescriptionHTML(podcast: object): string {
  let description_html = null;
  if (podcast['content:encoded']) {
    description_html = podcast['content:encoded'][0];
  } else if (podcast['description']) {
    description_html = podcast['description'][0];
  }
  return description_html;
}

function normalizeImage(podcast: string): string {
  let image = podcast['itunes:image']
    ? podcast['itunes:image'][0]['$']['href']
    : null;
  if (!image) {
    image = podcast['media:thumbnail']
      ? podcast['media:thumbnail'][0]['$']['url']
      : null;
  }
  return image;
}
