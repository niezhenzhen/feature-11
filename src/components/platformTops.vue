<template>
    <div class="v-progress platform">
        <div class="progress-logo"
             v-for='(item,index) in platformTops'
             v-bind:key="index"
             v-if="platformTops !== undefined && platformTops.length > 1">
            <div class="pinkbg">
                <img :src="item.iconUrl"/>
            </div>
            <div class="probg1">
                <div class="probg" style="margin-top: 4px;"></div>
                <div class="probg" style="margin-top: 3px;"></div>
            </div>
        </div>
        <div id="progressChart" style="height: 857px; width: 300px"></div>
        <div class="yeartitle">
            <p class="pink float-left"></p>
            <p class="float-left">2018</p>
            <div class="blue float-left"></div>
            <p class="float-left">2017</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'platformtops',
    props: ['platformTops', 'reload'],
    data () {
        return {
            xAxisData: [],
            yAxisData: [],
            yAxisLastData: [],
            iconUrl: [],
            chart: false,
            cData: {},
            saleslast: ''
        }
    },
    watch: {
        platformTops: function (newVal, oldVal) {
            this.cData = newVal
            if (!this.reload) {
                this.chart = false
            }
            if (this.cData && this.chart === false) {
                this.xAxisData = []
                this.yAxisData = []
                this.yAxisLastData = []
                this.iconUrl = []
                this.cData.forEach(item => {
                    this.xAxisData.push(item.platformName)
                    this.yAxisLastData.push(item.salesLastYear)
                    this.yAxisData.push(item.sales)
                    this.iconUrl.push(item.iconUrl)
                })
                this.chart = true
            }
            this.progress()
        },
        reload: function (newVal, oldVal) {
            if (newVal) {
                this.chart = true
            }
        }
    },
    mounted () {
    },
    methods: {
        eval (fn) {
            var Fn = Function
            return new Fn('return ' + fn)()
        },
        progress () {
            let _this = this
            let myChart = this.$echarts.init(document.getElementById('progressChart'))
            myChart.clear()
            myChart.resize()
            this.saleslast = this.eval(this.yAxisLastData.join('+'))
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: ''
                },
                grid: {
                    left: '9%',
                    right: '8%',
                    bottom: '11%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        textStyle: {
                            fontSize: 30
                        }
                    },
                    min: 0,
                    splitNumber: 10
                },
                xAxis: [{
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#363e83'
                        }
                    },
                    axisLabel: {
                        rotate: 90,
                        textStyle: {
                            color: '#fff',
                            align: 'left',
                            fontSize: 16,
                            baseline: 'middle'
                        },
                        formatter: function (value, index) {
                            return '{' + index + '|}{value|' + value + '}'
                        },
                        margin: 50,
                        rich: {
                            value: {
                                width: 60,
                                height: 30,
                                align: 'left'
                            }
                        }
                    },
                    data: _this.xAxisData
                }, {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: _this.xAxisData
                }
                ],
                series: [{
                    type: 'bar',
                    xAxisIndex: 1,
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                            barBorderRadius: [20, 20, 20, 20],
                            shadowBlur: {
                                shadowColor: 'rgba(255,255,255,0.1)',
                                shadowBlur: 2,
                                shadowOffsetX: 0,
                                shadowOffsetY: 1
                            }
                        }
                    },
                    barWidth: 15,
                    data: [this.saleslast, this.saleslast, this.saleslast, this.saleslast, this.saleslast]
                }, {
                    type: 'bar',
                    xAxisIndex: 1,
                    barGap: '20%',
                    data: [this.saleslast, this.saleslast, this.saleslast, this.saleslast, this.saleslast],
                    zlevel: 1,
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                            barBorderRadius: [20, 20, 20, 20],
                            shadowBlur: {
                                shadowColor: 'rgba(255,255,255,0.1)'
                            }
                        }
                    }
                }, {
                    name: '2018年',
                    type: 'bar',
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            color: 'rgb(228,17,104)',
                            barBorderRadius: [20, 20, 20, 20],
                            label: {
                                show: true
                            }
                        },
                        emphasis: {
                            barBorderRadius: 50
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            padding: [0, -70, -6, 0],
                            position: 'top',
                            rotate: 90,
                            color: '#fff',
                            formatter: function (params) {
                                return params.value + '万'
                            }
                        }
                    },
                    data: _this.yAxisData,
                    zlevel: 2
                }, {
                    name: '2017年',
                    type: 'bar',
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            color: 'rgb(19,42,136)',
                            barBorderRadius: [20, 20, 20, 20],
                            label: {
                                show: true,
                                rotate: 90
                            }
                        },
                        emphasis: {
                            barBorderRadius: 50
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            padding: [0, -70, -6, 0],
                            color: '#fff',
                            position: 'top',
                            formatter: function (params) {
                                return params.value + '万'
                            }
                        }
                    },
                    data: _this.yAxisLastData,
                    zlevel: 2,
                    barGap: '20%'
                }
                ]
            }, false)
        }
    }
}
</script>

<style scoped>
    .v-progress {
        position: absolute;
        top: 770px;
        left: 45px;
        right: 0;
        margin: auto;
        width: 846px;
        height: 250px;
    }

    .mt-progress {
        width: 100%;
        margin-top: 20px;
    }

    #progressChart {
        margin: auto;
        top: -550px;
        left: -70px;
        z-index: 9999;
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        -o-transform: rotate(90deg);
    }

    .pink {
        width: 30px;
        height: 14px;
        background: rgb(228, 17, 104);
        margin-top: 5px;
    }

    .blue {
        width: 30px;
        height: 14px;
        background: rgb(19, 42, 136);
        margin-top: 5px;
    }

    .yeartitle {
        position: absolute;
        right: 55px;
        bottom: 10px;
        font-size: 14px;
        width: 80px;
    }

    .float-left {
        width: 40%;
        margin-left: 10%;
    }

    .progress-logo {
        width: 40px;
        height: 40px;
        margin-top: 10px;
    }

    .pinkbg {
        width: 45px;
        height: 45px;
        background: rgba(228, 17, 104, 0.15);
        border-radius: 45px;
        line-height: 45px;
        float: left;
    }

    .pinkbg img {
        width: 70%;
        margin-top: 10px;
        margin-left: 15%;
    }

    .probg1 {
        width: 100%;
        position: absolute;
        left: 116px;
    }

    .probg {
        width: 70%;
        height: 15px;
        border-radius: 10px;
        background: rgba(39, 48, 113, 0.2);
    }
</style>
