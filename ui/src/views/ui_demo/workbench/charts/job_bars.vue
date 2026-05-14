<template>
    <div :id="barId" :style="{ height: height + 'px' }"></div>
</template>

<script>
    export default {
        name: 'job-bars',
        props: {
            barData: {
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
            barId() {
                return 'bar' + this._uid
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
            }
        },
        mounted() {
            this.initChart()
        },
        methods: {
            initChart() {
                const chartDom = document.getElementById(this.barId)
                const myChart = this.$echarts.init(chartDom)
                this.chart = myChart

                //  数据格式化
                const that = this
                const axisData = []
                const seriesData = []
                this.barData.data.forEach(function(item) {
                    axisData.push(item[that.barData.dimension])
                    seriesData.push(item[that.barData.metric])
                })

                //  配置设置
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        textStyle: {
                            color: '#63656E'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: axisData,
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
                            name: this.barData.name,
                            type: 'bar',
                            barWidth: '60%',
                            barMaxWidth: 35,
                            itemStyle: {
                                color: '#699DF4'
                            },
                            data: seriesData
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
