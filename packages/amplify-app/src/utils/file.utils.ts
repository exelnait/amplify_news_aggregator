import axios, {AxiosResponse} from "axios";

export function downloadFileFromURL(fileUrl: string): Promise<Buffer> {
    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'arraybuffer'
    }).then((response: AxiosResponse) => Buffer.from(response.data, 'binary'))
}