export function calculateReadingTimeInMillisecondsByWordsCount(wordsCount: number): number {
    const wpm = 225;
    const time = Math.ceil(wordsCount / wpm);
    return time * 60000
}

export function getDomain(link): string {
    const domain = link ? link.split('/')[2] : link;
    let source = domain ? domain.replace('www.', '').toLowerCase() : null;

    if (source && source === 'feedproxy.google.com' || source === 'soundcloud.com') {
        source = link.split('/')[4];
    }
    if (source && source.includes('-') && !source.includes('.')) {
        source = source.replace('-', '.');
    }
    if (source && source.includes('?')) {
        source = source.split('?')[0]
    }
    return source;
}