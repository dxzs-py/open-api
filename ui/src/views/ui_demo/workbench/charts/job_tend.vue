<template>
    <div :id="tendId" :style="{ height: height + 'px' }"></div>
</template>

<script>
    export default {
        name: 'job-tend',
        props: {
            tendData: {
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
            tendId() {
                return 'tend' + this._uid
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
            tendData: {
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
                const chartDom = document.getElementById(this.tendId)
                const myChart = this.$echarts.init(chartDom)
                this.chart = myChart

                //  数据格式化，json转二维数组
                const that = this
                const data = [[that.tendData.dimension]]
                this.tendData.data.barData.forEach(function(item) {
                    let colIndex = data[0].indexOf(item[that.tendData.legend])
                    if (colIndex < 1) {
                        data[0].push(item[that.tendData.legend])
                        colIndex = data[0].length - 1
                    }
                    let rowIndex = 0
                    for (let i = 1; i < data.length; i++) {
                        if (data[i][0] === item[that.tendData.dimension]) {
                            rowIndex = i
                            break
                        }
                    }
                    if (rowIndex === 0) {
                        data.push([item[that.tendData.dimension]])
                        rowIndex = data.length - 1
                    }
                    data[rowIndex][colIndex] = item[that.tendData.metric]
                })
                const lineData = []
                this.tendData.data.lineData.forEach(function(item) {
                    lineData.push(item[that.tendData.line])
                })

                //  配置设置
                const option = {
                    dataset: [
                        {
                            source: data
                        }
                    ],
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
                        bottom: 'bottom'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '15%',
                        top: '5%',
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
                            type: 'bar',
                            barWidth: '60%',
                            barMaxWidth: 35,
                            stack: 'tend',
                            itemStyle: {
                                color: '#5D7092'
                            }
                        },
                        {
                            type: 'bar',
                            barWidth: '60%',
                            barMaxWidth: 35,
                            stack: 'tend',
                            itemStyle: {
                                color: '#5AD8A6'
                            }
                        },
                        {
                            type: 'bar',
                            barWidth: '60%',
                            barMaxWidth: 35,
                            stack: 'tend',
                            itemStyle: {
                                color: '#699DF4'
                            }
                        },
                        {
                            type: 'line',
                            name: '阈值',
                            data: lineData,
                            itemStyle: {
                                color: '#FFCD7E'
                            }
                        }
                    ]
                }
                window.addEventListener('resize', () => {
                    myChart.resize()
                })
                option && myChart.setOption(option)
            }
        }
    }
</script>
