import { Item } from './models';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
declare function parseAxiosRequest(axiosRequest: AxiosRequestConfig | null, previewItems: Array<Item> | null): Array<Item>;
declare function parseAxiosResponse(axiosResponse: AxiosResponse | null, previewItems: Array<Item> | null): Array<Item>;
declare function parseAxiosError(axiosError: AxiosError | null, previewItems: Array<Item> | null): Array<Item>;
export { parseAxiosRequest, parseAxiosResponse, parseAxiosError };
