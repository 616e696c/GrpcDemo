/**
 * @fileoverview gRPC-Web generated client stub for Sensor
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.Sensor = require('./sensor_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.Sensor.SensorClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.Sensor.SensorPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Sensor.SensorListenRequest,
 *   !proto.Sensor.SensorDataReply>}
 */
const methodDescriptor_Sensor_ListenSensors = new grpc.web.MethodDescriptor(
  '/Sensor.Sensor/ListenSensors',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.Sensor.SensorListenRequest,
  proto.Sensor.SensorDataReply,
  /**
   * @param {!proto.Sensor.SensorListenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Sensor.SensorDataReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Sensor.SensorListenRequest,
 *   !proto.Sensor.SensorDataReply>}
 */
const methodInfo_Sensor_ListenSensors = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Sensor.SensorDataReply,
  /**
   * @param {!proto.Sensor.SensorListenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Sensor.SensorDataReply.deserializeBinary
);


/**
 * @param {!proto.Sensor.SensorListenRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.Sensor.SensorDataReply>}
 *     The XHR Node Readable Stream
 */
proto.Sensor.SensorClient.prototype.listenSensors =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/Sensor.Sensor/ListenSensors',
      request,
      metadata || {},
      methodDescriptor_Sensor_ListenSensors);
};


/**
 * @param {!proto.Sensor.SensorListenRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.Sensor.SensorDataReply>}
 *     The XHR Node Readable Stream
 */
proto.Sensor.SensorPromiseClient.prototype.listenSensors =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/Sensor.Sensor/ListenSensors',
      request,
      metadata || {},
      methodDescriptor_Sensor_ListenSensors);
};


module.exports = proto.Sensor;

