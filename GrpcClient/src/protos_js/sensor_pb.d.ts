import * as jspb from 'google-protobuf'



export class SensorListenRequest extends jspb.Message {
  getRequestsList(): Array<SensorRequest>;
  setRequestsList(value: Array<SensorRequest>): SensorListenRequest;
  clearRequestsList(): SensorListenRequest;
  addRequests(value?: SensorRequest, index?: number): SensorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SensorListenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SensorListenRequest): SensorListenRequest.AsObject;
  static serializeBinaryToWriter(message: SensorListenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SensorListenRequest;
  static deserializeBinaryFromReader(message: SensorListenRequest, reader: jspb.BinaryReader): SensorListenRequest;
}

export namespace SensorListenRequest {
  export type AsObject = {
    requestsList: Array<SensorRequest.AsObject>,
  }
}

export class SensorRequest extends jspb.Message {
  getSensorid(): string;
  setSensorid(value: string): SensorRequest;

  getConditon(): Condition;
  setConditon(value: Condition): SensorRequest;

  getConditionvalue(): number;
  setConditionvalue(value: number): SensorRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SensorRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SensorRequest): SensorRequest.AsObject;
  static serializeBinaryToWriter(message: SensorRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SensorRequest;
  static deserializeBinaryFromReader(message: SensorRequest, reader: jspb.BinaryReader): SensorRequest;
}

export namespace SensorRequest {
  export type AsObject = {
    sensorid: string,
    conditon: Condition,
    conditionvalue: number,
  }
}

export class SensorDataReply extends jspb.Message {
  getSensorid(): string;
  setSensorid(value: string): SensorDataReply;

  getMessage(): string;
  setMessage(value: string): SensorDataReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SensorDataReply.AsObject;
  static toObject(includeInstance: boolean, msg: SensorDataReply): SensorDataReply.AsObject;
  static serializeBinaryToWriter(message: SensorDataReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SensorDataReply;
  static deserializeBinaryFromReader(message: SensorDataReply, reader: jspb.BinaryReader): SensorDataReply;
}

export namespace SensorDataReply {
  export type AsObject = {
    sensorid: string,
    message: string,
  }
}

export enum Condition { 
  EQUAL = 0,
  NOTEQUAL = 1,
  GREATHERTHAN = 2,
  LESSTHAN = 3,
}
