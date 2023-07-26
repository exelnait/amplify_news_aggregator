import cheerio from "cheerio";
import {parseSrcset, SrcSetDefinition} from './parse_srcset';

export function normalizeHtml({html, domain, coverUrl}): string {
    const $ = cheerio.load(html);
    (function images() {
        $('img').each(function (i) {
            let src = $(this).attr('src');
            if (i == 0 && getStringSimilarity(src , coverUrl) > 50) {
                $(this).remove();
            } else {
                const srcSetAttr = $(this).attr('srcset');
                const image = normalizeImagesSet(src, $(this).attr('srcset'));

                if (!image.src || image.src === coverUrl) {
                    $(this).remove();
                } else {
                    $(this).removeAttr('alt');
                    $(this).removeAttr('title');
                    if (image.type === 'set') {
                        const parsedSrcSet: SrcSetDefinition[] = parseSrcset(srcSetAttr);
                        const averageSrcSet = getAverageImageFromSrcSet(parsedSrcSet);
                        if (i == 0 && getStringSimilarity(averageSrcSet.url , coverUrl) > 50) {
                            $(this).remove();
                        } else {
                            $(this).attr('src', averageSrcSet.url);
                            $(this).attr('width', averageSrcSet.width.toString());
                            $(this).attr('height', averageSrcSet.height?.toString() ?? (averageSrcSet.width * 10 / 16).toString());
                        }
                    } else {
                        $(this).attr('src', normalizeImageUrl(src, domain));
                    }
                }
            }
        });
    })();
    (function iframe() {
        $('iframe').each(function () {
            const src = $(this).attr('src');
            if (src && !src.includes('https')) {
                $(this).attr('src', src.replace('http', 'https'));
            }
        });
    })();
    (function link() {
        $('a').each(function () {
            let href = $(this).attr('href');
            if (href) {
                href = deleteSpan(href);
                $(this).removeAttr('title');
                $(this).attr('href', href);
                $(this).attr('target', '_blank');
            }
        });
    })();
    (function p() {
        $('p').removeAttr('style');
    })();
    (function scripts() {
        $('script').remove();
    })();
    return $.html({decodeEntities: false})
}

function normalizeImagesSet(src, src_set) {
    let result = {
        type: 'null',
        src: null
    };
    if (src && src.includes('%20')) {
        result = {
            type: 'set',
            src: src.replace(/%20/ig, ' ')
        }
    } else if (src_set) {
        result = {
            type: 'set',
            src: src_set
        }
    } else if (src) {
        result = {
            type: 'image',
            src
        }
    }
    return result
}

function deleteSpan(string) {
    const regex = /<\/?span[^>]*>/g;
    if (string.match(regex)) {
        return string.replace(regex, "").replace(/\s+/g, "");
    }
    return string;
}

function normalizeImageUrl(src, domain) {
    if (src.startsWith('/') && !src.startsWith('//') && domain) {
        return 'http://' + domain + src
    }
    if (src.startsWith('//')) {
        return src.replace('//', 'http://')
    }
    if (src.startsWith('https://')) {
        return src.replace('https://', 'http://')
    }
    return src
}

function returnAverageNumberInArray(array) {
    const sum = array.reduce((a, b) => a + b, 0);
    const avg = (sum / array.length) || 0;
    return avg;
}

function getAverageImageFromSrcSet(srcSet: SrcSetDefinition[]): SrcSetDefinition {
    let sum = 0;
    for (const image of srcSet) {
        sum += image.width;
    }
    const avg = sum / srcSet.length;

    let closestDiff = Number.MAX_VALUE;
    let closestSrcSet: SrcSetDefinition;
    for (const image of srcSet) {
        const diff = Math.abs(image.width - avg);
        if (diff < closestDiff) {
            closestDiff = diff;
            closestSrcSet = image;
        }
    }

    return closestSrcSet;
}

function getStringSimilarity(string1: string, string2: string): number {
    const maxLength = string1.length + string2.length;
    let numMatchingChars = 0;

    for (let i = 0; i < maxLength; i++) {
        if (string1[i] === string2[i]) {
            numMatchingChars++;
        } else {
            break;
        }
    }

    for (let i = 0; i < maxLength; i++) {
        if (string1[string1.length - 1 - i] === string2[string2.length - 1 - i]) {
            numMatchingChars++;
        } else {
            break;
        }
    }

    let maxSubstringLength = 0;
    for (let i = 0; i < string1.length; i++) {
        for (let j = 0; j < string2.length; j++) {
            let substringLength = 0;
            while (string1[i + substringLength] === string2[j + substringLength] && (i + substringLength) < string1.length && (j + substringLength) < string2.length) {
                substringLength++;
            }
            maxSubstringLength = Math.max(maxSubstringLength, substringLength);
        }
    }

    numMatchingChars += maxSubstringLength;

    return (numMatchingChars / maxLength) * 100;
}

