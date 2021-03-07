import * as grpcWeb from 'grpc-web';

import * as sensor_pb from './sensor_pb';


export class SensorClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listenSensors(
    request: sensor_pb.SensorListenRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<sensor_pb.SensorDataReply>;

}

export class SensorPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  listenSensors(
    request: sensor_pb.SensorListenRequest,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<sensor_pb.SensorDataReply>;

}

