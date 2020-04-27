import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {Message, Method, rpc, RPCImpl, RPCImplCallback} from 'protobufjs';

interface InternalTwirpError {
    code: string;
    msg: string;
    meta?:{[key:string]:string};
}

class TwirpError extends Error {
    code: string;
    meta?: {[key: string]: string};

    constructor(message: string, twirpError: InternalTwirpError) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
        
        this.code = twirpError.code;
        this.meta = twirpError.meta;
    }
}

const getTwirpError = (err: AxiosError): TwirpError => {
    const resp = err.response;
    let twirpError = {
        code: 'unknown',
        msg: 'unknown error',
        meta: {}
    };

    if (resp) {
        const headers = resp.headers;
        const data = resp.data;

        if (headers['content-type'].match(/^(?=.*application\/json).*$/)) {
            let s = data.toString();

            if (s === "[object ArrayBuffer]") {
                s = new TextDecoder("utf-8").decode(new Uint8Array(data));
            }

            try {
                twirpError = JSON.parse(s);
            } catch (e) {
                twirpError.msg = `JSON.parse() error: ${e.toString()}`
            }
        }
    }

    return new TwirpError(twirpError.msg, twirpError);
};

export const createTwirpAdapter = (axios: AxiosInstance, methodLookup: (fn: any) => string): RPCImpl => {
    return (method: Method | rpc.ServiceMethod<Message<{}>,Message<{}>>, requestData: Uint8Array, callback: RPCImplCallback) => {
        axios({
            method: 'POST',
            url: methodLookup(method),
            headers: {
                'Content-Type': 'application/protobuf'
            },
            // required to get an arraybuffer of the actual size, not the 8192 buffer pool that protobuf.js uses
            // see: https://github.com/dcodeIO/protobuf.js/issues/852
            data: requestData.slice(),
            responseType: 'arraybuffer'
        })
        .then((resp: AxiosResponse<Uint8Array|ArrayBuffer>) => {
            callback(null, new Uint8Array(resp.data));

        })
        .catch((err: AxiosError) => {
            callback(getTwirpError(err), null);
        });
    };
};
