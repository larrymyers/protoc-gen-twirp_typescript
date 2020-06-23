"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTwirpAdapter = void 0;
var getTwirpError = function (err) {
    var resp = err.response;
    var twirpError = {
        code: 'unknown',
        msg: 'unknown error',
        meta: {}
    };
    if (resp) {
        var headers = resp.headers;
        var data = resp.data;
        if (headers['content-type'] === 'application/json') {
            var s = data.toString();
            if (s === "[object ArrayBuffer]") {
                s = new TextDecoder("utf-8").decode(new Uint8Array(data));
            }
            try {
                twirpError = JSON.parse(s);
            }
            catch (e) {
                twirpError.msg = "JSON.parse() error: " + e.toString();
            }
        }
    }
    return twirpError;
};
exports.createTwirpAdapter = function (axios, methodLookup) {
    return function (method, requestData, callback) {
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
            .then(function (resp) {
            callback(null, new Uint8Array(resp.data));
        })
            .catch(function (err) {
            var twirpError = getTwirpError(err);
            var error = new Error(twirpError.msg);
            callback(error, null);
        });
    };
};
