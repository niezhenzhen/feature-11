<template>
    <div class="v-echarts">
        <p class="margin-left-70">实时销售金额（元）</p>
        <div id="myChart" :style="{width: '857px', height: '445px'}"></div>
        <p class="hour-right">时间(小时)</p>
    </div>
</template>
<script>

export default {
    name: 'saleshours',
    props: ['salesHours', 'reload', 'lineSalesHours'],
    data () {
        return {
            cData: [],
            xAxisData: [],
            yAxisData: [],
            yAxisLastData: [],
            yoyPercent: [],
            type: 'bar',
            boundaryGap: true,
            borderColor: '',
            chart: false,
            cData1: [],
            xAxisData1: [],
            yAxisData1: [],
            yAxisLastData1: [],
            yoyPercent1: [],
            chart1: false
        }
    },
    watch: {
        salesHours: function (newVal, oldVal) {
            this.cData = newVal
            if (!this.reload) {
                this.chart = false
            }
            if (this.cData && this.chart === false) {
                this.xAxisData = []
                this.yAxisData = []
                this.yAxisLastData = []
                this.yoyPercent = []
                this.cData.forEach(item => {
                    this.xAxisData.push(item.hour)
                    this.yAxisLastData.push(item.salesLastYear)
                    if (item.yoyPercent) {
                        this.yAxisData.push(item.sales)
                        this.yoyPercent.push(item.yoyPercent)
                    }
                })
                this.chart = true
            }
            this.drawLine('bar')
        },
        lineSalesHours: function (newVal, oldVal) {
            this.cData1 = newVal
            if (!this.reload) {
                this.chart1 = false
            }
            if (this.cData1 && this.chart1 === false) {
                this.xAxisData1 = []
                this.yAxisData1 = []
                this.yAxisLastData1 = []
                this.yoyPercent1 = []
                this.cData1.forEach(item => {
                    this.xAxisData1.push(item.hour)
                    this.yAxisLastData1.push(item.salesLastYear)
                    if (item.yoyPercent) {
                        this.yAxisData1.push(item.sales)
                        this.yoyPercent1.push(item.yoyPercent)
                    }
                })
                this.chart1 = true
            }
            this.drawLine('line')
        },
        reload: function (newVal, oldVal) {
            if (newVal) {
                this.chart = true
            }
        }
    },
    mounted () {
        let _this = this
        setInterval(function () {
            if (_this.type === 'bar') {
                _this.type = 'line'
                _this.boundaryGap = false
                _this.borderColor = '#fff'
            } else {
                _this.type = 'bar'
                _this.boundaryGap = true
                _this.borderColor = 'rgb(228,17,104)'
            }
            _this.drawLine(_this.type)
        }, 8000)
    },
    methods: {
        drawLine (type) {
            let _this = this
            let len = _this.yoyPercent.length - 1
            let AxisData = _this.yAxisData[len]
            let len1 = _this.yoyPercent1.length - 1
            let AxisData1 = _this.yAxisData1[len1]
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            myChart.clear()
            myChart.resize()
            // 绘制图表
            myChart.setOption({
                toolbox: {
                    show: false
                },
                title: {
                    subtext: '（万元）',
                    subtextStyle: {
                        color: 'rgb(93,205,236)'
                    }
                },
                grid: {
                    left: '2%',
                    right: '5%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: _this.boundaryGap,
                    axisTick: {show: false},
                    // 横、纵坐标颜色宽度
                    axisLine: {
                        lineStyle: {
                            color: 'rgb(39,48,113)',
                            width: 4
                        }
                    },
                    // 网格线
                    splitLine: {
                        show: true,
                        lineStyle: {
                            width: 0.2,
                            color: 'rgba(68,138,202,0.5)',
                            type: 'dashed'
                        },
                        startLine: {
                            show: false
                        }
                    },
                    // 字体颜色
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'rgb(93,205,236)'
                        }
                    },
                    data: _this.type === 'bar' ? _this.xAxisData : _this.xAxisData1
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgb(39,48,113)',
                            width: 4
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            width: 0.2,
                            color: 'rgba(68,138,202,0.5)',
                            show: true,
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: 'rgb(93,205,236)'
                        }
                    },
                    min: 0,
                    max: function (value) {
                        return Math.ceil(value.max / 100) * 100 + 2000
                    },
                    splitNumber: 10
                },
                series: [
                    {
                        type: 'effectScatter',
                        symbolSize: 15,
                        data: _this.type === 'line' ? [[len1, _this.yAxisData1[ len1 ]]] : '',
                        rippleEffect: {
                            period: 3,
                            scale: 2.5
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'bottom',
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(255,16,110)'
                            }
                        }
                    },
                    {
                        name: '2018年',
                        data: _this.type === 'bar' ? _this.yAxisData : _this.yAxisData1,
                        type: _this.type,
                        symbol: 'circle',
                        smooth: true,
                        color: 'rgb(228,17,104)',
                        itemStyle: {
                            emphasis: {
                                barBorderRadius: [5, 5, 0, 0]
                            },
                            normal: {
                                color: _this.type === 'line' ? '#fff' : 'rgb(228,17,104)',
                                lineStyle: {
                                    color: 'rgb(228,17,104)'// 折线的颜色
                                },
                                barBorderRadius: [5, 5, 0, 0],
                                show: true,
                                borderColor: _this.borderColor
                            }
                        },
                        markPoint: {
                            symbolSize: _this.type === 'bar' ? [90, 60] : [80, 40],
                            symbol: '#fff',
                            symbolOffset: [0, -50],
                            itemStyle: {
                                normal: {
                                    color: 'rgb(228,17,104)',
                                    position: 'top',
                                    label: {
                                        formatter: function (param) {
                                            let yoyPercent
                                            let hour
                                            let mon
                                            if (_this.type === 'bar') {
                                                yoyPercent = _this.yoyPercent[len]
                                                hour = _this.xAxisData[len]
                                                mon = _this.yAxisData[len]
                                                return hour + '时销售额:\n' + mon + '万\n同比增长\n' + yoyPercent + '%'
                                            } else {
                                                yoyPercent = _this.yoyPercent1[len1]
                                                return '同比增长\n' + yoyPercent + '%'
                                            }
                                        }
                                    }
                                }
                            },
                            data: [
                                {name: '2018年', xAxis: _this.type === 'bar' ? len : len1, yAxis: _this.type === 'bar' ? AxisData : AxisData1}
                            ]
                        },
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(228,17,104)'
                            }, {
                                offset: 1,
                                color: 'rgba(255, 255, 255,0.2)'
                            }])
                        }
                    },
                    {
                        name: '2017年',
                        type: _this.type,
                        symbol: 'circle',
                        smooth: true,
                        itemStyle: {
                            emphasis: {
                                barBorderRadius: [5, 5, 0, 0]
                            },
                            normal: {
                                barBorderRadius: [5, 5, 0, 0],
                                show: false,
                                width: 0,
                                color: 'rgb(49,82,150)',
                                borderColor: 'rgb(49,82,150)'
                            }
                        },
                        data: _this.type === 'bar' ? _this.yAxisLastData : _this.yAxisLastData1
                    }
                ]
            }, true)
        }
    }
}
</script>
<style scoped>
    .v-echarts {
        position: absolute;
        top: 286px;
        left: 0;
        right: 0;
        margin: auto;
        width: 842px;
        height: 473px;
    }
    #myChart, #main {
        margin: auto
    }
    .hour-right{
        float: right;
        color: rgb(93,205,236);
        font-size: 12px;
        margin-right: 20px;
    }
    .margin-left-70{
        font-size: 18px;
    }
</style>
