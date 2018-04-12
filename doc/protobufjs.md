# Twirp Protobuf.js Client

## Generate Protobuf.js Code

    pbjs -t static-module -w commonjs -o <path-to-project>/service.pb.js <path-to-proto-file>
    pbts --no-comments -o <path-to-project>/service.pb.d.ts <path-to-project>/service.pb.js
 
## Generate Protobuf.js Twirp Adapter

    protoc --twirp_typescript_out=library=pbjs:<path-to-project> <path-to-proto-file>

## Dependencies
 
* axios
* protobufjs
* typescript
