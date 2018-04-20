package generator

import (
	"github.com/golang/protobuf/proto"
	plugin "github.com/golang/protobuf/protoc-gen-go/plugin"
)

func RuntimeLibrary() *plugin.CodeGeneratorResponse_File {
	tmpl := `
export interface TwirpErrorJSON {
    code: string;
    msg: string;
    meta: {[index:string]: string};
}

export class TwirpError extends Error {
    code: string;
    meta: {[index:string]: string};

    constructor(te: TwirpErrorJSON) {
        super(te.msg);

        this.code = te.code;
        this.meta = te.meta;
    }
}

export const throwTwirpError = (resp: Response) => {
    return resp.json().then((err: TwirpErrorJSON) => { throw new TwirpError(err); })
};

export const createTwirpRequest = (url: string, body: object): Request => {
    return new Request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
};

export type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
`
	cf := &plugin.CodeGeneratorResponse_File{}
	cf.Name = proto.String("twirp.ts")
	cf.Content = proto.String(tmpl)

	return cf
}
