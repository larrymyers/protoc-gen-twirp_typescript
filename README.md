# Twirp Typescript Plugin

A protoc plugin for generating a twirp client suitable for use in browser and node.js projects.  
The generated code is a commonjs module that can be used in both typescript and javascript projects.

Both a Promise and fetch implementation much be provided in the global namespace.

Suggested polyfills for complete browser and node.js support:

* [es6-promise](https://github.com/stefanpenner/es6-promise)
* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)

An optional package.json and index.js can be generated so that the code can be published to an NPM repository.
If this option is used the isomorphic-fetch polyfill will be automatically included so IE11 and node.js
support works without any extra effort. 

## Usage

    protoc --twirp_typescript_out=./example/ts_client ./example/service.proto
    
All generated files will be placed relative to the output directory for the plugin.  This is different behavior than
the twirp go plugin, which places the files relative to the input proto files.

This decision is intentional, since only client code is generated, and the destination is likely somewhere different
than the server code.

Using the Twirp hashberdasher proto:
    
    import {Haberdasher} from 'service';
    
    const hab = new Haberdasher('http://localhost:8080');
    
    hab.makeHat({inches: 10})
        .then((hat) => {
            console.log(hat);
        })
        .catch((err) => {
            console.error(err);
        });
    
### Parameters

The plugin parameters should be added in the same manner as other protoc plugins. 
Key/value pairs separated by a single equal sign, and multiple parameters comma separated.

#### package_name

If you'd like to publish the generated code as an npm module then use this parameter to set the
name in the package.json file.  An index module will be created as well that will expose all
exported interfaces and classes, as well as reference the isomorphic-fetch polyfill.

    protoc --twirp_typescript_out=package_name=example_client:./example/ts_client ./example/service.proto

## Using the Example

    make run
    cd example/ts_client
    npm install
    ./node_modules/.bin/tsc index.ts