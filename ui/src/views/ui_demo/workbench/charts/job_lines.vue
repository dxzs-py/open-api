<template>
    <div :id="lineId" :style="{ height: height + 'px' }"></div>
</template>

<script>

    export default {
        name: 'job-lines',
        props: {
            lineData: {
                type: Object,
                default: () => ({})
            },
            height: {
                type: Number,
                default: 240
            },
            navToggle: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                chart: null
            }
        },
        computed: {
            lineId() {
                return 'line' + this._uid
            }
        },
        watch: {
            navToggle: {
                handler(val, old) {
                    if (this.chart) {
                        setTimeout(() => {
                            this.chart.resize()
                        }, 200)
                    }
                },
                immediate: true
            },
            lineData: {
                handler(val, old) {
                    if (this.chart) {
                        this.chart.dispose()
                        this.initChart()
                    }
                },
                immediate: true,
                deep: true
            }

        },
        mounted() {
            this.initChart()
        },
        methods: {
            initChart() {
                const chartDom = document.getElementById(this.lineId)
                const myChart = this.$echarts.init(chartDom)
                this.chart = myChart

                //  数据格式化，json转二维数组
                const that = this
                const data = [[that.lineData.dimension]]
                this.lineData.data.forEach(function(item) {
                    let colIndex = data[0].indexOf(item[that.lineData.legend])
                    if (colIndex < 1) {
                        data[0].push(item[that.lineData.legend])
                        colIndex = data[0].length - 1
                    }
                    let rowIndex = 0
                    for (let i = 1; i < data.length; i++) {
                        if (data[i][0] === item[that.lineData.dimension]) {
                            rowIndex = i
                            break
                        }
                    }
                    if (rowIndex === 0) {
                        data.push([item[that.lineData.dimension]])
                        rowIndex = data.length - 1
                    }
                    data[rowIndex][colIndex] = item[that.lineData.metric]
                })

                //  配置设置
                const option = {
                    dataset: {
                        source: data
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        textStyle: {
                            color: '#63656E'
                        }
                    },
                    legend: {
                        left: 'left'
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        top: '20%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                color: '#979BA5'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#F0F1F5'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                color: '#979BA5'
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#F0F1F5'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            itemStyle: {
                                color: '#97BAF6'
                            }
                        },
                        {
                            type: 'line',
                            itemStyle: {
                                color: '#FFCD7E'
                            }
                        }
                    ]
                }
                if (this.lineData.isArea) {
                    option.series.forEach(function(item) {
                        item['areaStyle'] = {
                            opacity: 0.3
                        }
                    })
                }
                window.addEventListener('resize', () => {
                    myChart.resize()
                })
                option && myChart.setOption(option)
            }
        }
    }
</script>
