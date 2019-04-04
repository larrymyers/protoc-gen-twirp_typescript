import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {Message, Method, rpc, RPCImpl, RPCImplCallback} from 'protobufjs';

interface TwirpError {
    code: string;
    msg: string;
}

const getTwirpError = (err: AxiosError): TwirpError => {
    const resp = err.response;
    let twirpError = {
        code: 'unknown',
        msg: 'unknown error'
    };

    if (resp) {
        const headers = resp.headers;
        const data = resp.data;

        if (headers['content-type'] === 'application/json') {
            let s = data.toString();

            if (s === "[object ArrayBuffer]") {
                s = String.fromCharCode.apply(null, new Uint8Array(data));
            }

            try {
                twirpError = JSON.parse(s);
            } catch (e) {
                twirpError.msg = `JSON.parse() error: ${e.toString()}`
            }
        }
    }

    return twirpError;
};

export interface adapterOptions {
    methodLookup: (fn: any) => string,
    headers: () => any
};

export const createTwirpAdapter = (axios: AxiosInstance, options: adapterOptions): RPCImpl => {
    if (!options || typeof options.methodLookup !== "function")
        throw "options.methodLookup must be defined";

    const requestHeaders = (options && typeof options.headers === "function" ? options.headers : ((): any => { return {}; }));

    return (method: Method | rpc.ServiceMethod<Message<{}>,Message<{}>>, requestData: Uint8Array, callback: RPCImplCallback) => {
        axios({
            method: 'POST',
            url: options.methodLookup(method),
            headers: Object.assign({
                'Content-Type': 'application/protobuf'
            }, requestHeaders()),
            // required to get an arraybuffer of the actual size, not the 8192 buffer pool that protobuf.js uses
            // see: https://github.com/dcodeIO/protobuf.js/issues/852
            data: requestData.slice(),
            responseType: 'arraybuffer'
        })
        .then((resp: AxiosResponse<Uint8Array|ArrayBuffer>) => {
            callback(null, new Uint8Array(resp.data));

        })
        .catch((err: AxiosError) => {
            callback(new Error(getTwirpError(err).msg), null);
        });
    };
};
