const Vibrant = require('node-vibrant');
const gm = require('gm').subClass({imageMagick: true});

export function getPalette(imageBuffer: Buffer): {
    type: string,
    color: string,
    text: string,
    body: string
}[] {
    if (!imageBuffer)
        return null;
    const v = new Vibrant(imageBuffer);
    return v.getSwatches().then(data => {
        const types = Object.getOwnPropertyNames(data);
        const swatches = [];

        types.forEach((key) => {
            const swatch = data[key];
            let text, body;
            if (swatch && swatch.getBodyTextColor() === '#fff') {
                body = '#ffffff'
            }
            if (swatch && swatch.getBodyTextColor() === '#000') {
                body = '#000000'
            }
            if (swatch && swatch.getTitleTextColor() === '#fff') {
                text = '#ffffff'
            }
            if (swatch && swatch.getTitleTextColor() === '#000') {
                text = '#000000'
            }
            if (swatch) {
                swatches.push({
                    type: key,
                    color: swatch.getHex(),
                    text,
                    body
                });
            }
        });

        return swatches;
    })
}
export function getNormalizedImage(imageBuffer, width, height): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            gm(imageBuffer)
                .setFormat("jpeg")
                .resize(width, height)
                .crop(width, height)
                .gravity('Center')
                .flatten()
                .toBuffer(function (err, buffer) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                });
        } catch (e) {
            reject(e)
        }
    });
}
export function getImageThumbnail(imageBuffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        try {
            gm(imageBuffer)
                .setFormat("jpeg")
                .resize(56, 56)
                .gravity('Center')
                .flatten()
                .toBuffer(function (err, buffer) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(buffer);
                    }
                });
        } catch (e) {
            reject(e)
        }
    });
}