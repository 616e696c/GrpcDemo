<template>
    <div id="app">
        <fixed-header>
            <div class="navbar">
                <button v-on:click="listenSensors" style="margin-right:20px;">Start To Listen Sensors</button>
                <button v-on:click="stopSensors" style="margin-right:20px;">Stop Listening Sensors</button>
                <label style="margin-right:20px;">Incoming Data Rate:  {{ DataCount }}/sec </label>
                <label>Max Data Rate:  {{ MaxDataCount }}/sec </label>
            </div>
        </fixed-header>
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
    import FixedHeader from 'vue-fixed-header'



    let chartCount = 7000;
    let stream: ClientReadableStream<SensorDataReply>;
    @Component({
        components: {
            chart: ChartVue,
            FixedHeader
        },
        data: function () {
            let charts = [];
            let dataCount = 0;
            let maxDataCount = 0;
            for (var i = 0; i < chartCount; i++) {
                charts.push({ id: i.toString() });
            }
            return {
                Charts: charts,
                DataCount: dataCount,
                MaxDataCount: maxDataCount
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

                let dataCount = 0;
                let max = 0;
                var that: App = this;
                setInterval(function () {
                    that.$data.DataCount = dataCount;
                    if (max < dataCount) {
                        max = dataCount;
                        that.$data.MaxDataCount = max;
                    }
                    dataCount = 0;
                }.bind(this), 1000);
                stream = SensorDataService.GetData(req).on("data",
                    response => {
                        let sensorId = response.getSensorid();
                        let timestamp = response.getTimestamp();
                        dataCount++;
                        //For line chart
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
    .navbar.vue-fixed-header {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        background-color: white;
        padding: 30px;
        z-index:9999;
    }

    </styl

    .navbar.vue-fixed-header--isFixed {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        background-color: white;
        padding: 30px;
        z-index: 9999;
    }
</style>
