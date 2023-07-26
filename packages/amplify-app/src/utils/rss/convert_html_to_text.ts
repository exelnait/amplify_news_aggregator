import {convert} from 'html-to-text';

export function convertHtmlToText(html: string): string {
    return convert(html, {
        wordwrap: false,
        ignoreHref: true,
        ignoreImage: true,
        singleNewLineParagraphs: true
    }).replace(/\[.+?\]/g, '');
}
