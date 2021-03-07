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
            var i = 0;
            while (!context.CancellationToken.IsCancellationRequested && i < 1000)
            {
                var rng = new Random();
                var now = DateTime.UtcNow;
                foreach (var sensorRequest in request.Requests)
                {
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
                        var response = new SensorDataReply
                        {
                            SensorId = sensorRequest.SensorId,
                            Message = value.ToString()
                        };
                        await responseStream.WriteAsync(response);
                    }
                }
                await Task.Delay(1500);
            }
            //var rng = new random();
            //var now = datetime.utcnow;
            //var i = 0;
            //while (!context.cancellationtoken.iscancellationrequested && i < 20)
            //{
            //    await task.delay(500); // gotta look busy

            //    var response = new sensordatareply
            //    {
            //        sensorid = request.sensorid,
            //        message = "hello " + request.name + " -> " + rng.next(-20, 55) + " - " + timestamp.fromdatetime(now.adddays(i++))
            //    };

            //    _logger.loginformation("sending hello response");

            //    await responsestream.writeasync(response);
            //}
        }
    }
}
