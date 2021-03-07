import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export class ChartData {
    constructor(id: string) {
        this.id = id;
        this.chartOptions.yAxis.title.text = "Sensor " + this.id + " Temperature";
    }
    id: string;
    xCounter: number = 0;
    chartOptions: {
        chart: {
            width: number,
            height: number,
            type: string,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: string
        },
        legend: {
            enabled: false
        },
        pane: {
            center: [string, string],
            size: string,
            startAngle: number,
            endAngle: number,
            background: {
                backgroundColor: string,
                innerRadius: string,
                outerRadius: string,
                shape: string
            }
        },
        yAxis: {
            min: number,
            max: number,
            stops: [
                [number, string],
                [number, string],
                [number, string]
            ],
            ceiling: number,
            maxPadding: number,
            minPadding: number,
            endOnTick: boolean,
            lineWidth: number,
            minorTicks: boolean,
            tickWidth: number,
            tickAmount: number,
            tickPositions: [number, number],
            title: {
                y: number,
                text: string
            },
            labels: {
                y: number
            }
        },
        tooltip: {
            enabled: false
        },
        series: [
            {
                name: string,
                data: Array<number>,
                dataLabels: {
                    y:number,
                    format: string
                }
            }
        ],
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: number,
                    borderWidth: number,
                    useHTML: boolean
                }
            }
        }
    }
        =
        {
            chart: {
                width: 150,
                height: 150,
                type: 'solidgauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: ""
            },
            legend: {
                enabled: false
            },
            pane: {
                center: ['50%', '50%'],
                size: '100%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            yAxis: {
                min: -100,
                max: 250,
                stops: [
                    [0.1, '#55BF3B'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.7, '#DF5353'] // red
                ],
                ceiling: 250,
                maxPadding: 0,
                minPadding: 0,
                endOnTick: false,
                lineWidth: 0,
                minorTicks: false,
                tickWidth: 0,
                tickAmount: 2,
                tickPositions: [-100, 250],
                title: {
                    y: 59,
                    text: ""
                },
                labels: {
                    y: 10
                }
            },
            tooltip: {
                enabled: false
            },
            series: [
                {
                    name: 'Temperature',
                    data: [-100],
                    dataLabels: {
                        y: -33,
                        format: '<div style="text-align:center"><span style="font-size:12px">{y}</span><br/><span style="font-size:12px;opacity:0.4">C</span></div>'
                    }
                }
            ],
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };
}

type ChartMap = Record<string, ChartData>
var charts: ChartMap = {};
var addChartsFunc = function (charts: ChartMap, chartId: string) {
    charts[chartId] = new ChartData(chartId);
};

const store = new Vuex.Store({
    state: {
        charts: charts
    },
    mutations: {
        addCharts(state, chartId: string) { return addChartsFunc(state.charts, chartId); },
        addPoint(state, payload: { id: string, point: number }) {
            let chart = state.charts[payload.id];
            if (chart) {
                chart.chartOptions.series[0].data = [
                    payload.point
                ];
                chart.xCounter++;
            }
        }
    },
    getters: {
        getChartOptions: (state) => (id: string) => {
            let chart = state.charts[id];
            if (chart) {
                return chart.chartOptions;
            }
            else {
                addChartsFunc(state.charts, id);
                return state.charts[id].chartOptions;
            }
        },
        getXCounter: state => (id: string) => {
            let chart = state.charts[id];
            if (chart) {
                return chart.xCounter;
            }
            else {
                return 0;
            }
        }
    }
});

export default store;
