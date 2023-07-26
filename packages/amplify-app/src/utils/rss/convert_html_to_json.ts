import {promisify} from "util";
import imageSize from "request-image-size";
const sizeOf = promisify(imageSize)
import HtmlToArticleJsonConverter from "html-to-article-json";

const htmlToArticleJson = HtmlToArticleJsonConverter();

enum ArticleJsonChildType {
    paragraph = 'paragraph',
    text = 'text',
    linebreak = 'linebreak',
    embed = 'embed',
    blockquote = 'blockquote',
    header1 = 'header1',
    header2 = 'header2',
    header3 = 'header3',
    header4 = 'header4',
    header5 = 'header5',
    header6 = 'header6'
}
enum ArticleJsonEmbedType {
    custom = 'custom',
    image = 'image',
    facebook = 'facebook',
    instagram = 'instagram',
    twitter = 'twitter',
    youtube = 'youtube',
    video = 'video'
}

interface ConvertHtmlToJsonOptions {
    requestImageDimensions?: boolean;
}

export async function convertHtmlToJson(html: string, options: ConvertHtmlToJsonOptions = {
    requestImageDimensions: false
}): Promise<ArticleJsonChild[]> {
    const contentJson: ArticleJsonChild[] = htmlToArticleJson(html);
    for (let item_index = 0; item_index < contentJson.length; item_index++) {
        const item = contentJson[item_index];
        const {type, embedType, width, height, src} = item;
        if (type === ArticleJsonChildType.paragraph) {
            item.children = item.children.map((children, children_index) => {
                if (children.type === ArticleJsonChildType.embed) {
                    contentJson.splice(Number(item_index), 0, children);
                    return null
                }
                return children
            }).filter(Boolean)
        }
        if (type === ArticleJsonChildType.embed) {
            if (embedType === ArticleJsonEmbedType.image) {
                if ((!width|| !height) && src) {
                    if (options.requestImageDimensions) {
                        try {
                            const dimensions = await getImageDimensions(item_index, src);
                            item.width = dimensions.width;
                            item.height = dimensions.height;
                        } catch (e) {
                            console.log(`Invalid image: ${src}`);
                            contentJson[item_index] = null;
                        }
                    } else {
                        item.width = 400;
                        item.height = 250;
                    }
                }
            }
        }
    }

    return contentJson.filter(Boolean);
}
function getImageDimensions(index, src): Promise<{
    width: number;
    height: number;
}> {
    return sizeOf({ uri: src, timeout: 5000 })
}

interface ArticleJsonChild {
    type: ArticleJsonChildType;
    children?: ArticleJsonChild[];

    // text
    content?: string;
    href?: string;
    italic?: boolean;
    bold?: boolean;
    mark?: boolean;
    markClass?: string;
    strikethrough?: boolean;

    // embed
    embedType?: ArticleJsonEmbedType;
    caption?: ArticleJsonChild[];
    attribution?: [any];
    width?: number; // image, video
    height?: number; // image, video
    secure?: boolean; // custom
    src?: string; // image
    headline?: string; //f b
    url?: string; // fb, instagram, twitter
    date?: string; // fb, instagram
    user?: string; // fb, instagram, twitter
    id?: string; // instagram, twitter
    text?: string; // fb, instagram, twitter
    embedAs?: string; // fb, twitter,
    youtubeId?: string // youtube,
    sources?: any // video

    //blockquote
    pullQuote?: boolean;
}
