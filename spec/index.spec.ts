import "jasmine";
import axios, { AxiosInstance } from 'axios'
import { LsDocMakerAxiosMiddleware, LsDocMakerAxiosMiddlewareBuildOptions, attatchLsDocMaker, buildLsDocMaker } from '../dist/index';

let options: LsDocMakerAxiosMiddlewareBuildOptions
let lsDocMaker: LsDocMakerAxiosMiddleware
let axiosInstance: AxiosInstance

describe('All Tests', () => {
    beforeAll(() => {
        axiosInstance = axios.create({ baseURL: 'https://lesimoes.com.br/' })
        lsDocMaker = attatchLsDocMaker(axiosInstance)
    })

    it('Must be defined', () => {
        expect(lsDocMaker).toBeDefined()
        expect(LsDocMakerAxiosMiddlewareBuildOptions).toBeDefined()
        expect(attatchLsDocMaker).toBeDefined()
        expect(buildLsDocMaker).toBeDefined()

        options = new LsDocMakerAxiosMiddlewareBuildOptions([__dirname], __dirname, 'Test', 'https://lesimoes.com.br/', 'Test')
        expect(options).toBeDefined()
        expect(options instanceof LsDocMakerAxiosMiddlewareBuildOptions).toBe(true)
        expect(typeof attatchLsDocMaker === 'function').toBe(true)
        expect(typeof buildLsDocMaker === 'function').toBe(true)
    })

    it('Must throw error', () => {
        expect(() => { lsDocMaker.toJsonFile('') }).toThrowError('Files path must be provided')
        expect(() => { lsDocMaker.clearJsonFiles('') }).toThrowError('Files path must be provided')
        expect(() => { buildLsDocMaker(new LsDocMakerAxiosMiddlewareBuildOptions([], '', '', '', '')) }).toThrowError('At least one item path must be provided')
        expect(() => { buildLsDocMaker(new LsDocMakerAxiosMiddlewareBuildOptions([__dirname], '', '', '', '')) }).toThrowError('Output path must be provided')
        expect(() => { buildLsDocMaker(new LsDocMakerAxiosMiddlewareBuildOptions([__dirname], __dirname, '', '', '')) }).toThrowError('Title must be provided')
        expect(() => { buildLsDocMaker(new LsDocMakerAxiosMiddlewareBuildOptions([__dirname], __dirname, 'Title', '', '')) }).toThrowError('URL must be provided')
    })
})