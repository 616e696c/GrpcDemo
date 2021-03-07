<template>
    <div id="app">
        <button v-on:click="listenSensors">Start To Listen Sensors</button>
        <button v-on:click="stopSensors">Stop Listening Sensors</button>
        <!--<ul id="example-1">
            <li v-for="message in Messages">
                {{ message }}
            </li>
        </ul>-->
        <div class="grid-container">
            <template v-for="chart in Charts">
                <chart :id="chart.id"></chart>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { SensorDataService } from './services/sensorService';
    import { SensorListenRequest, SensorRequest, SensorDataReply } from './protos_js/sensor_pb';
    import ChartVue from './components/Chart.vue';
    import store from './chartDataStore';
    import { ClientReadableStream } from 'grpc-web';



    let chartCount = 7000;
    let stream: ClientReadableStream<SensorDataReply>;
    @Component({
        components: {
            chart: ChartVue
        },
        data: function () {
            let charts = [];
            for (var i = 0; i < chartCount; i++) {
                charts.push({ id: i.toString() });
            }
            return {
                Charts: charts
            }
        },
        methods: {
            listenSensors: async function () {
                var req = new SensorListenRequest();
                for (var i = 0; i < chartCount; i++) {
                    let sensorRequest = new SensorRequest();
                    sensorRequest.setSensorid(i.toString());
                    sensorRequest.setConditon(2);
                    sensorRequest.setConditionvalue(25);
                    req.addRequests(sensorRequest);
                    //store.commit("addCharts", i.toString());
                }

                stream = SensorDataService.GetData(req).on("data",
                    response => {
                        let sensorId = response.getSensorid();
                        //store.commit("addPoint", { id: sensorId, point: [store.getters.getXCounter(sensorId), +response.getMessage()] });
                        store.commit("addPoint", { id: sensorId, point: +response.getMessage() });
                    }).on("error", reason => console.log(reason));
            },
            stopSensors: async function () {
                if (stream) {
                    stream.cancel();
                }
            }
        }
    })
    export default class App extends Vue { }
</script>

<style>
    .grid-container {
        
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto auto;
        background-color: #2196F3;
        padding: 50px;
        grid-row-gap: 30px;
    }
</style>
