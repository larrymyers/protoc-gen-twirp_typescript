import * as $protobuf from "protobufjs";
export namespace twitch {

    namespace twirp {

        namespace example {

            interface IHat {
                size?: (number|null);
                color?: (string|null);
                name?: (string|null);
                createdOn?: (google.protobuf.ITimestamp|null);
            }

            class Hat implements IHat {
                constructor(properties?: twitch.twirp.example.IHat);
                public size: number;
                public color: string;
                public name: string;
                public createdOn?: (google.protobuf.ITimestamp|null);
                public static create(properties?: twitch.twirp.example.IHat): twitch.twirp.example.Hat;
                public static encode(message: twitch.twirp.example.IHat, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: twitch.twirp.example.IHat, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): twitch.twirp.example.Hat;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): twitch.twirp.example.Hat;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): twitch.twirp.example.Hat;
                public static toObject(message: twitch.twirp.example.Hat, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            interface ISize {
                inches?: (number|null);
            }

            class Size implements ISize {
                constructor(properties?: twitch.twirp.example.ISize);
                public inches: number;
                public static create(properties?: twitch.twirp.example.ISize): twitch.twirp.example.Size;
                public static encode(message: twitch.twirp.example.ISize, writer?: $protobuf.Writer): $protobuf.Writer;
                public static encodeDelimited(message: twitch.twirp.example.ISize, writer?: $protobuf.Writer): $protobuf.Writer;
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): twitch.twirp.example.Size;
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): twitch.twirp.example.Size;
                public static verify(message: { [k: string]: any }): (string|null);
                public static fromObject(object: { [k: string]: any }): twitch.twirp.example.Size;
                public static toObject(message: twitch.twirp.example.Size, options?: $protobuf.IConversionOptions): { [k: string]: any };
                public toJSON(): { [k: string]: any };
            }

            class Haberdasher extends $protobuf.rpc.Service {
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Haberdasher;
                public makeHat(request: twitch.twirp.example.ISize, callback: twitch.twirp.example.Haberdasher.MakeHatCallback): void;
                public makeHat(request: twitch.twirp.example.ISize): Promise<twitch.twirp.example.Hat>;
            }

            namespace Haberdasher {

                type MakeHatCallback = (error: (Error|null), response?: twitch.twirp.example.Hat) => void;
            }
        }
    }
}

export namespace google {

    namespace protobuf {

        interface ITimestamp {
            seconds?: (number|Long|null);
            nanos?: (number|null);
        }

        class Timestamp implements ITimestamp {
            constructor(properties?: google.protobuf.ITimestamp);
            public seconds: (number|Long);
            public nanos: number;
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;
            public static verify(message: { [k: string]: any }): (string|null);
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };
            public toJSON(): { [k: string]: any };
        }
    }
}
