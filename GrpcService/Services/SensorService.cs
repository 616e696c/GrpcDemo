using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrpcService
{
    public class SensorService : Sensor.SensorBase
    {
        private readonly ILogger<SensorService> _logger;
        public SensorService(ILogger<SensorService> logger)
        {
            _logger = logger;
        }

        public async override Task ListenSensors(SensorListenRequest request, IServerStreamWriter<SensorDataReply> responseStream, ServerCallContext context)
        {
            //When client sends a cancel request it triggers CancellationToken
            while (!context.CancellationToken.IsCancellationRequested)
            {
                var rng = new Random();
                var now = DateTime.UtcNow;
                //We can handle multiple sensor request in the same request because of our request model
                foreach (var sensorRequest in request.Requests)
                {
                    //Some random business
                    var value = rng.Next(-20, 250);
                    var satisfiesCondition = false;
                    switch (sensorRequest.Conditon)
                    {
                        case Condition.Equal:
                            satisfiesCondition = value == sensorRequest.ConditionValue;
                            break;
                        case Condition.Notequal:
                            satisfiesCondition = value != sensorRequest.ConditionValue;
                            break;
                        case Condition.Greatherthan:
                            satisfiesCondition = value > sensorRequest.ConditionValue;
                            break;
                        case Condition.Lessthan:
                            satisfiesCondition = value < sensorRequest.ConditionValue;
                            break;
                        default:
                            break;
                    }
                    if (satisfiesCondition)
                    {
                        //Create response data for sensor
                        var response = new SensorDataReply
                        {
                            SensorId = sensorRequest.SensorId,
                            Message = value.ToString(),
                            TimeStamp = Timestamp.FromDateTime(now)
                        };
                        //Write data to stream
                        await responseStream.WriteAsync(response);
                    }
                }
                //if you want some realism
                //await Task.Delay(500);
            }
        }
    }
}
