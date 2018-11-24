import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { createFileSync, writeFileSync, existsSync, removeSync, readdirSync, readFileSync } from 'fs-extra';
import { forEach, reduce } from 'lodash';
import { v4 as uuidv4 } from 'uuid'

import { parseAxiosRequest, parseAxiosResponse, parseAxiosError } from './axios-parser'
import { Doc, Group, Item } from './models'

const __ls_path__ = '818bb882-dae5-4fbe-9861-fdcf27f1361b'
class LsDocMakerAxiosMiddlewareBuildOptions {
    readonly _itemsPaths: Array<string>
    readonly _outputPath: string
    public _title: string
    public _url: string
    public _observation: string
    public _clearJsonFilesAfterBuild: boolean

    constructor(itemsPaths: Array<string>, outputPath: string, title: string, url: string, observation: string, clearJsonFilesAfterBuild: boolean = false) {
        this._itemsPaths = itemsPaths
        this._outputPath = outputPath
        this._title = title
        this._url = url
        this._observation = observation
        this._clearJsonFilesAfterBuild = clearJsonFilesAfterBuild
    }
}

class LsDocMakerAxiosMiddleware {
    public items: Array<Item> | null
    private _active: boolean

    constructor(axiosInstance: AxiosInstance) {
        this.items = null
        this._active = true

        axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            if (this._active)
                this.items = parseAxiosRequest(config, this.items)

            return config
        }, (error: any) => {
            this.items = parseAxiosError(error, this.items)

            return Promise.reject(error)
        });

        axiosInstance.interceptors.response.use((response: AxiosResponse) => {
            if (this._active)
                this.items = parseAxiosResponse(response, this.items)

            return response;
        }, (error: any) => {
            if (this._active)
                this.items = parseAxiosError(error, this.items)

            return Promise.reject(error)
        });
    }

    pauseListening() {
        this._active = false
    }

    resumeListening() {
        this._active = true
    }

    toJsonFile(path: string): void {
        if (!path) throw new Error('File path must be provided')

        let filePath = `${path}\\${__ls_path__}\\${uuidv4()}.json`
        createFileSync(filePath)
        writeFileSync(filePath, JSON.stringify(this.items, null, 2))
    }

    clearJsonFiles(path: string): void {
        if (!path) throw new Error('File path must be provided')

        if (existsSync(`${path}/${__ls_path__}`)) {
            removeSync(`${path}/${__ls_path__}`)
        }
    }
}

function attatchLsDocMaker(axiosInstance: AxiosInstance): LsDocMakerAxiosMiddleware {
    return new LsDocMakerAxiosMiddleware(axiosInstance)
}

function buildLsDocMaker(options: LsDocMakerAxiosMiddlewareBuildOptions): Doc {
    if (!options._itemsPaths || options._itemsPaths.length <= 0) throw new Error("At least one item path must be provided")
    if (!options._outputPath) throw new Error("Output path must be provided")
    if (!options._title) throw new Error("Title must be provided")
    if (!options._url) throw new Error("URL must be provided")

    let parsedGroups = new Array<Group>()

    forEach(options._itemsPaths, itemsPath => {
        let parsedItems = new Array<Item>()
        readdirSync(`${itemsPath}\\${__ls_path__}\\`).forEach(file => {
            let items: any = readFileSync(`${itemsPath}\\${__ls_path__}\\${file}`).toString()
            items = JSON.parse(items)
            parsedItems.push(...items)
        })

        options._observation = options._observation || ''

        let groups = reduce(parsedItems, (array, item) => {
            let existent = array.find(a => a.title === item.path)
            if (!existent) {
                array.push(new Group(item.path, [item]))
            } else {
                existent.items.push(item)
            }
            return array
        }, new Array<Group>())

        if (groups.length > 0) parsedGroups.push(...groups)
    })

    let result = new Doc(options._title, options._url, options._observation, parsedGroups)

    if (!!options._clearJsonFilesAfterBuild) {
        forEach(options._itemsPaths, itemsPath => {
            if (existsSync(`${itemsPath}\\${__ls_path__}`)) {
                removeSync(`${itemsPath}\\${__ls_path__}`)
            }
        })
    }

    const outputFilePath = `${options._outputPath}\\${__ls_path__}\\${uuidv4()}.json`
    createFileSync(outputFilePath)
    writeFileSync(outputFilePath, JSON.stringify(result, null, 2))

    console.warn(`Output file created at: "${outputFilePath}"`)

    return result
}

export {
    attatchLsDocMaker,
    buildLsDocMaker,
    LsDocMakerAxiosMiddlewareBuildOptions
}