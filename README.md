# Twirp Typescript Plugin

A protoc plugin for generating a twirp client suitable for browser and node.js projects.

This plugin supports two different outputs when generating code:

1. A minimal standalone client that supports JSON transport only.
2. [Protobuf.js](https://github.com/dcodeIO/protobuf.js) adapter for RPC calls to a twirp server. 

## Setup

The protobuf v3 compiler is required. You can get the latest precompiled binary for your system here:

https://github.com/google/protobuf/releases

### Twirp Go Server (optional)

While not required for generating the client code, it is required to run the server component of the example.

    go get github.com/twitchtv/twirp/protoc-gen-twirp
    go get -u github.com/golang/protobuf/protoc-gen-go

## Usage
    
All generated files will be placed relative to the specified output directory for the plugin.  
This is different behavior than the twirp Go plugin, which places the files relative to the input proto files.

This decision is intentional, since only client code destination is likely somewhere different
than the server code.

* [Minimal JSON Client Usage](doc/minimal.md)
* [Protobuf.js Client Usage](doc/protobufjs.md)
