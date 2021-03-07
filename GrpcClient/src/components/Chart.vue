<template id="chart-template">
    <div class="grid-item">
        <div class="signal">

        </div>
        <div  class="chart-container">
            <highcharts v-if="visible" class="hc" :options="chartOptions" :updateArgs="updateArgs"></highcharts>
        </div>        
    </div>
</template>

<script>
    import store from "./../chartDataStore";
    var scrollMonitor = require("scrollmonitor");
    const containerMonitor = scrollMonitor.createContainer(document.body);

    export default {
        template: "chart-template",
        props: ["id"],
        data() {
            return {
                visible: false,
                updateArgs: [true, false, false],
                xCounter: store.getters.getXCounter(this.id),
                chartOptions: store.getters.getChartOptions(this.id)
            };
        },
        mounted() {
            const elementWatcher = containerMonitor.create(this.$el.querySelector('.signal'));
            elementWatcher.enterViewport(() => {
                this.visible = true;
            });
            elementWatcher.exitViewport(() => {
                this.visible = false;
            });
        }
    };
</script>

<style>
    .signal {
        height: 10px;
        width: 10px;
    }
    .chart-container {
        width:150px;
        height:150px;
    }
    .grid-item {
        min-height:150px;
        max-width:150px;
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(0, 0, 0, 0.8);
        padding: 20px;
        align-content:center;
        text-align: center;
    }
</style>
