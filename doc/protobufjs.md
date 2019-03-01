# Twirp Protobuf.js Client

This generator creates an RPC implementation for twirp that can be used with [protobuf.js](https://github.com/dcodeIO/ProtoBuf.js).

See: https://github.com/dcodeIO/ProtoBuf.js/#using-services

The `pbjs` and `pbts` commands provided by protobuf.js still need to be used to generate the protobuf client.

There is a provided [example](example/pbjs_client) that shows how to use the generated code.

## Generate Protobuf.js Code

    pbjs -t static-module -w commonjs -o <path-to-project>/service.pb.js <path-to-proto-file>
    pbts --no-comments -o <path-to-project>/service.pb.d.ts <path-to-project>/service.pb.js

## Generate Protobuf.js Twirp Adapter

    protoc --twirp_typescript_out=library=pbjs:<path-to-project> <path-to-proto-file>

## Dependencies

- axios
- pbjs-twirp
- protobufjs
- typescript

## Required polyfill for non-evergreen browsers

Non-[evergreen](https://www.techopedia.com/definition/31094/evergreen-browser) browsers (like IE11) require the use of a polyfill for the `Uint8Array.slice()` that is needed to send protobuf over the wire.  A known working polyfill that can be used it [typedarray-slice](https://www.npmjs.com/package/typedarray-slice).  If using Anguar, just drop `import 'typedarray-slice';` into `polyfills.ts`.
