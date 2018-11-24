import { AxiosInstance } from 'axios';
import { Doc, Item } from './models';
declare class LsDocMakerAxiosMiddlewareBuildOptions {
    readonly _itemsPaths: Array<string>;
    readonly _outputPath: string;
    _title: string;
    _url: string;
    _observation: string;
    _clearJsonFilesAfterBuild: boolean;
    constructor(itemsPaths: Array<string>, outputPath: string, title: string, url: string, observation: string, clearJsonFilesAfterBuild?: boolean);
}
declare class LsDocMakerAxiosMiddleware {
    items: Array<Item> | null;
    private _active;
    constructor(axiosInstance: AxiosInstance);
    pauseListening(): void;
    resumeListening(): void;
    toJsonFile(path: string): void;
    clearJsonFiles(path: string): void;
}
declare function attatchLsDocMaker(axiosInstance: AxiosInstance): LsDocMakerAxiosMiddleware;
declare function buildLsDocMaker(options: LsDocMakerAxiosMiddlewareBuildOptions): Doc;
export { attatchLsDocMaker, buildLsDocMaker, LsDocMakerAxiosMiddlewareBuildOptions };
