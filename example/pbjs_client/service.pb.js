/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.twitch = (function() {

    /**
     * Namespace twitch.
     * @exports twitch
     * @namespace
     */
    var twitch = {};

    twitch.twirp = (function() {

        /**
         * Namespace twirp.
         * @memberof twitch
         * @namespace
         */
        var twirp = {};

        twirp.example = (function() {

            /**
             * Namespace example.
             * @memberof twitch.twirp
             * @namespace
             */
            var example = {};

            example.Hat = (function() {

                /**
                 * Properties of a Hat.
                 * @memberof twitch.twirp.example
                 * @interface IHat
                 * @property {number|null} [size] Hat size
                 * @property {string|null} [color] Hat color
                 * @property {string|null} [name] Hat name
                 * @property {google.protobuf.ITimestamp|null} [createdOn] Hat createdOn
                 */

                /**
                 * Constructs a new Hat.
                 * @memberof twitch.twirp.example
                 * @classdesc Represents a Hat.
                 * @implements IHat
                 * @constructor
                 * @param {twitch.twirp.example.IHat=} [properties] Properties to set
                 */
                function Hat(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Hat size.
                 * @member {number} size
                 * @memberof twitch.twirp.example.Hat
                 * @instance
                 */
                Hat.prototype.size = 0;

                /**
                 * Hat color.
                 * @member {string} color
                 * @memberof twitch.twirp.example.Hat
                 * @instance
                 */
                Hat.prototype.color = "";

                /**
                 * Hat name.
                 * @member {string} name
                 * @memberof twitch.twirp.example.Hat
                 * @instance
                 */
                Hat.prototype.name = "";

                /**
                 * Hat createdOn.
                 * @member {google.protobuf.ITimestamp|null|undefined} createdOn
                 * @memberof twitch.twirp.example.Hat
                 * @instance
                 */
                Hat.prototype.createdOn = null;

                /**
                 * Creates a new Hat instance using the specified properties.
                 * @function create
                 * @memberof twitch.twirp.example.Hat
                 * @static
                 * @param {twitch.twirp.example.IHat=} [properties] Properties to set
                 * @returns {twitch.twirp.example.Hat} Hat instance
                 */
                Hat.create = function create(properties) {
                    return new Hat(properties);
                };

                /**
                 * Encodes the specified Hat message. Does not implicitly {@link twitch.twirp.example.Hat.verify|verify} messages.
                 * @function encode
                 * @memberof twitch.twirp.example.Hat
                 * @static
                 * @param {twitch.twirp.example.IHat} message Hat message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Hat.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.size != null && message.hasOwnProperty("size"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.size);
                    if (message.color != null && message.hasOwnProperty("color"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.color);
                    if (message.name != null && message.hasOwnProperty("name"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                    if (message.createdOn != null && message.hasOwnProperty("createdOn"))
                        $root.google.protobuf.Timestamp.encode(message.createdOn, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Hat message, length delimited. Does not implicitly {@link twitch.twirp.example.Hat.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof twitch.twirp.example.Hat
                 * @static
                 * @param {twitch.twirp.example.IHat} message Hat message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Hat.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Hat message from the specified reader or buffer.
                 * @function decode
                 * @memberof twitch.twirp.example.Hat
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {twitch.twirp.example.Hat} Hat
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Hat.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.twitch.twirp.example.Hat();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.size = reader.int32();
                            break;
                        case 2:
                            message.color = reader.string();
                            break;
                        case 3:
                            message.name = reader.string();
                            break;
                        case 4:
                            message.createdOn = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Hat message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof twitch.twirp.example.Hat
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {twitch.twirp.example.Hat} Hat
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Hat.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Hat message.
                 * @function verify
                 * @memberof twitch.twirp.example.Hat
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Hat.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.size != null && message.hasOwnProperty("size"))
                        if (!$util.isInteger(message.size))
                            return "size: integer expected";
                    if (message.color != null && message.hasOwnProperty("color"))
                        if (!$util.isString(message.color))
                            return "color: string expected";
                    if (message.name != null && message.hasOwnProperty("name"))
                        if (!$util.isString(message.name))
                            return "name: string expected";
                    if (message.createdOn != null && message.hasOwnProperty("createdOn")) {
                        var error = $root.google.protobuf.Timestamp.verify(message.createdOn);
                        if (error)
                            return "createdOn." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Hat message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof twitch.twirp.example.Hat
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {twitch.twirp.example.Hat} Hat
                 */
                Hat.fromObject = function fromObject(object) {
                    if (object instanceof $root.twitch.twirp.example.Hat)
                        return object;
                    var message = new $root.twitch.twirp.example.Hat();
                    if (object.size != null)
                        message.size = object.size | 0;
                    if (object.color != null)
                        message.color = String(object.color);
                    if (object.name != null)
                        message.name = String(object.name);
                    if (object.createdOn != null) {
                        if (typeof object.createdOn !== "object")
                            throw TypeError(".twitch.twirp.example.Hat.createdOn: object expected");
                        message.createdOn = $root.google.protobuf.Timestamp.fromObject(object.createdOn);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Hat message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof twitch.twirp.example.Hat
                 * @static
                 * @param {twitch.twirp.example.Hat} message Hat
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Hat.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.size = 0;
                        object.color = "";
                        object.name = "";
                        object.createdOn = null;
                    }
                    if (message.size != null && message.hasOwnProperty("size"))
                        object.size = message.size;
                    if (message.color != null && message.hasOwnProperty("color"))
                        object.color = message.color;
                    if (message.name != null && message.hasOwnProperty("name"))
                        object.name = message.name;
                    if (message.createdOn != null && message.hasOwnProperty("createdOn"))
                        object.createdOn = $root.google.protobuf.Timestamp.toObject(message.createdOn, options);
                    return object;
                };

                /**
                 * Converts this Hat to JSON.
                 * @function toJSON
                 * @memberof twitch.twirp.example.Hat
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Hat.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Hat;
            })();

            example.Size = (function() {

                /**
                 * Properties of a Size.
                 * @memberof twitch.twirp.example
                 * @interface ISize
                 * @property {number|null} [inches] Size inches
                 */

                /**
                 * Constructs a new Size.
                 * @memberof twitch.twirp.example
                 * @classdesc Represents a Size.
                 * @implements ISize
                 * @constructor
                 * @param {twitch.twirp.example.ISize=} [properties] Properties to set
                 */
                function Size(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Size inches.
                 * @member {number} inches
                 * @memberof twitch.twirp.example.Size
                 * @instance
                 */
                Size.prototype.inches = 0;

                /**
                 * Creates a new Size instance using the specified properties.
                 * @function create
                 * @memberof twitch.twirp.example.Size
                 * @static
                 * @param {twitch.twirp.example.ISize=} [properties] Properties to set
                 * @returns {twitch.twirp.example.Size} Size instance
                 */
                Size.create = function create(properties) {
                    return new Size(properties);
                };

                /**
                 * Encodes the specified Size message. Does not implicitly {@link twitch.twirp.example.Size.verify|verify} messages.
                 * @function encode
                 * @memberof twitch.twirp.example.Size
                 * @static
                 * @param {twitch.twirp.example.ISize} message Size message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Size.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.inches != null && message.hasOwnProperty("inches"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.inches);
                    return writer;
                };

                /**
                 * Encodes the specified Size message, length delimited. Does not implicitly {@link twitch.twirp.example.Size.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof twitch.twirp.example.Size
                 * @static
                 * @param {twitch.twirp.example.ISize} message Size message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Size.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Size message from the specified reader or buffer.
                 * @function decode
                 * @memberof twitch.twirp.example.Size
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {twitch.twirp.example.Size} Size
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Size.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.twitch.twirp.example.Size();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1:
                            message.inches = reader.int32();
                            break;
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Size message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof twitch.twirp.example.Size
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {twitch.twirp.example.Size} Size
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Size.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Size message.
                 * @function verify
                 * @memberof twitch.twirp.example.Size
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Size.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.inches != null && message.hasOwnProperty("inches"))
                        if (!$util.isInteger(message.inches))
                            return "inches: integer expected";
                    return null;
                };

                /**
                 * Creates a Size message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof twitch.twirp.example.Size
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {twitch.twirp.example.Size} Size
                 */
                Size.fromObject = function fromObject(object) {
                    if (object instanceof $root.twitch.twirp.example.Size)
                        return object;
                    var message = new $root.twitch.twirp.example.Size();
                    if (object.inches != null)
                        message.inches = object.inches | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a Size message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof twitch.twirp.example.Size
                 * @static
                 * @param {twitch.twirp.example.Size} message Size
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Size.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.inches = 0;
                    if (message.inches != null && message.hasOwnProperty("inches"))
                        object.inches = message.inches;
                    return object;
                };

                /**
                 * Converts this Size to JSON.
                 * @function toJSON
                 * @memberof twitch.twirp.example.Size
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Size.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                return Size;
            })();

            example.Haberdasher = (function() {

                /**
                 * Constructs a new Haberdasher service.
                 * @memberof twitch.twirp.example
                 * @classdesc Represents a Haberdasher
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function Haberdasher(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (Haberdasher.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Haberdasher;

                /**
                 * Creates new Haberdasher service using the specified rpc implementation.
                 * @function create
                 * @memberof twitch.twirp.example.Haberdasher
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {Haberdasher} RPC service. Useful where requests and/or responses are streamed.
                 */
                Haberdasher.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };

                /**
                 * Callback as used by {@link twitch.twirp.example.Haberdasher#makeHat}.
                 * @memberof twitch.twirp.example.Haberdasher
                 * @typedef MakeHatCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {twitch.twirp.example.Hat} [response] Hat
                 */

                /**
                 * Calls MakeHat.
                 * @function makeHat
                 * @memberof twitch.twirp.example.Haberdasher
                 * @instance
                 * @param {twitch.twirp.example.ISize} request Size message or plain object
                 * @param {twitch.twirp.example.Haberdasher.MakeHatCallback} callback Node-style callback called with the error, if any, and Hat
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Haberdasher.prototype.makeHat = function makeHat(request, callback) {
                    return this.rpcCall(makeHat, $root.twitch.twirp.example.Size, $root.twitch.twirp.example.Hat, request, callback);
                }, "name", { value: "MakeHat" });

                /**
                 * Calls MakeHat.
                 * @function makeHat
                 * @memberof twitch.twirp.example.Haberdasher
                 * @instance
                 * @param {twitch.twirp.example.ISize} request Size message or plain object
                 * @returns {Promise<twitch.twirp.example.Hat>} Promise
                 * @variation 2
                 */

                return Haberdasher;
            })();

            return example;
        })();

        return twirp;
    })();

    return twitch;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.seconds = reader.int64();
                        break;
                    case 2:
                        message.nanos = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
