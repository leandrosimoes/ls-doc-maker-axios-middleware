import { Item, Header, Parameter, Response } from './models'
import qs from 'qs';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import * as _ from 'lodash'

function mapHeadersToHeaderClasses(headers: any | null, currentHeaders: Array<Header> | null = null): Array<Header> | null {
    if (!headers) return null

    let result = new Array<Header>()

    for (let key in headers) {
        if (!currentHeaders || !currentHeaders.find(c => c.key === key))
            result.push(new Header('Header generated automatically by ls-doc-maker-axios-middleware', key.toString(), headers[key].toString()))
    }
    return result.length > 0 ? result : null
}

function mapParametersToParameterClasses(parameters: Array<Parameter> | string | null): Array<Parameter> | null {
    if (!parameters) return null

    let parsedParams: any = parameters

    if (typeof parameters === 'string') {
        parsedParams = qs.parse(parameters)
    }

    let result = new Array<Parameter>()

    if (!parsedParams) return result

    for (let key in parsedParams) {
        result.push(new Parameter('Parameter generated automatically by ls-doc-maker-axios-middleware', key.toString(), parsedParams[key].toString()))
    }
    return result
}

function parseAxiosRequest(axiosRequest: AxiosRequestConfig | null, previewItems: Array<Item> | null): Array<Item> {
    if (!axiosRequest) return new Array<Item>()

    if (!previewItems) previewItems = new Array<Item>()

    // previewDoc.title = `Documentation for ${axiosRequest.baseURL}`
    // previewDoc.url = axiosRequest.baseURL || '/'
    // previewDoc.observations = 'Documentation generated automatically by ls-doc-maker-axios-middleware'

    // new Group(
    //     axiosRequest.url || '/',
    //     [
    //         new Item(
    //             axiosRequest.url || '',
    //             'Item generated automatically by ls-doc-maker-axios-middleware',
    //             axiosRequest.method || 'GET',
    //             axiosRequest.url || '',
    //             mapHeadersToHeaderClasses(axiosRequest.headers[axiosRequest.method || '']),
    //             mapParametersToParameterClasses(axiosRequest.data)
    //         )
    //     ]
    // )

    let item = previewItems.find(i => i.title === axiosRequest.url)
    if (!item) {
        previewItems.push(new Item(
            axiosRequest.url || '',
            'Item generated automatically by ls-doc-maker-axios-middleware',
            axiosRequest.method || 'GET',
            axiosRequest.url || '',
            mapHeadersToHeaderClasses(axiosRequest.headers[axiosRequest.method || '']),
            mapParametersToParameterClasses(axiosRequest.data)
        ))
    } else {
        item.headers = mapHeadersToHeaderClasses(axiosRequest.headers[axiosRequest.method || ''], item.headers)
        item.parameters = mapParametersToParameterClasses(axiosRequest.data)

        item.headers = _.uniqBy(item.headers, "key")
        item.parameters = _.uniqBy(item.parameters, "key")
    }

    return previewItems
}

function parseAxiosResponse(axiosResponse: AxiosResponse | null, previewItems: Array<Item> | null): Array<Item> {
    if (!axiosResponse || !previewItems) return new Array<Item>()

    let item = previewItems.find(i => i.title === axiosResponse.request.path)

    if (!item) return previewItems

    if (!item.responses) {
        item.responses = [
            new Response('Item generated automatically by ls-doc-maker-axios-middleware', axiosResponse.status, axiosResponse.data)
        ]
    } else {
        let response = item.responses.find(r => r.code === axiosResponse.status)
        if (!response) {
            item.responses.push(new Response('Item generated automatically by ls-doc-maker-axios-middleware', axiosResponse.status, axiosResponse.data))
        }
    }

    item.responses = _.uniqBy(item.responses, "code")

    return previewItems
}

function parseAxiosError(axiosError: AxiosError | null, previewItems: Array<Item> | null): Array<Item> {
    if (!axiosError || !axiosError.response) return (previewItems || new Array<Item>())

    return parseAxiosResponse(axiosError.response, previewItems)
}

export {
    parseAxiosRequest,
    parseAxiosResponse,
    parseAxiosError
}