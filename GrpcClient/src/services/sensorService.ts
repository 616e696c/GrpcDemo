import { ClientReadableStream } from 'grpc-web';
import { SensorDataReply, SensorListenRequest } from '../protos_js/sensor_pb';
import { SensorPromiseClient } from '../protos_js/sensor_grpc_web_pb';

export class SensorDataService {
    public static GetData(request: SensorListenRequest): ClientReadableStream<SensorDataReply> {
        var client = new SensorPromiseClient('http://localhost:8080');
        return client.listenSensors(request);
    }
}