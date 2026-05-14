<template>
    <div id="nested-pie"></div>
</template>

<script>
    import {Chart} from '@antv/g2'
    import {DataView} from '@antv/data-set'

    export default {
        name: 'nested-pie',
        props: {
            pieData: {
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
        watch: {
            navToggle: {
                handler(val, old) {
                    if (this.chart) {
                        setTimeout(() => {
                            this.chart.forceFit()
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
                const that = this
                const dv = new DataView()
                dv.source(that.pieData.data).transform({
                    type: 'percent',
                    field: that.pieData.metric,
                    dimension: that.pieData.legend,
                    as: 'percent'
                })
                const chart = new Chart({
                    container: 'nested-pie',
                    autoFit: true,
                    height: that.height
                })
                that.chart = chart
                chart.data(dv.rows)
                chart.scale({
                    percent: {
                        formatter: (val) => {
                            val = (val * 100).toFixed(2) + '%'
                            return val
                        }
                    }
                })
                chart.coordinate('theta', {
                    radius: 0.6
                })
                chart.tooltip({
                    showTitle: false,
                    showMarkers: false
                })
                chart.legend({
                    position: 'right'
                })
                chart
                    .interval()
                    .adjust('stack')
                    .position('percent')
                    .color(that.pieData.legend, ['#5890ED', '#5AD8A6', '#5D7092'])
                    .tooltip(`${that.pieData.legend}*percent`, (item, percent) => {
                        percent = (percent * 100).toFixed(2) + '%'
                        return {
                            name: item,
                            value: percent
                        }
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    })

                const outterView = chart.createView()
                const dv1 = new DataView()
                dv1.source(that.pieData.data).transform({
                    type: 'percent',
                    field: that.pieData.metric,
                    dimension: that.pieData.dimension,
                    as: 'percent'
                })

                outterView.data(dv1.rows)
                outterView.scale({
                    percent: {
                        formatter: (val) => {
                            val = (val * 100).toFixed(2) + '%'
                            return val
                        }
                    }
                })
                outterView.coordinate('theta', {
                    innerRadius: 0.75 / 0.9,
                    radius: 0.9
                })
                outterView
                    .interval()
                    .adjust('stack')
                    .position('percent')
                    .color(that.pieData.dimension, ['#8FB9FE', '#A3B2FB', '#9FE2C7', '#78C270', '#7585A2'])
                    .tooltip(`${that.pieData.dimension}*percent`, (item, percent) => {
                        percent = (percent * 100).toFixed(2) + '%'
                        return {
                            name: item,
                            value: percent
                        }
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    })

                chart.interaction('element-highlight')

                chart.render()
            }
        }
    }
</script>
