<template>
    <div id="job-pie"></div>
</template>

<script>
    import {Chart, registerShape} from '@antv/g2'

    export default {
        name: 'job-pie',
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
                let max = 0
                this.pieData.data.forEach(function(obj) {
                    if (obj[that.pieData.metric] > max) {
                        max = obj[that.pieData.metric]
                    }
                })

                // 自定义 other 的图形，增加两条线
                registerShape('interval', 'slice-shape', {
                    draw(cfg, container) {
                        const points = cfg.points
                        const origin = cfg.data
                        const percent = origin.value / max
                        const xWidth = points[2].x - points[1].x
                        const width = xWidth * percent
                        let path = []
                        path.push(['M', points[0].x, points[0].y])
                        path.push(['L', points[1].x, points[1].y])
                        path.push(['L', points[0].x + width, points[2].y])
                        path.push(['L', points[0].x + width, points[3].y])
                        path.push('Z')
                        path = this.parsePath(path)
                        return container.addShape('path', {
                            attrs: {
                                fill: cfg.color,
                                path
                            }
                        })
                    }
                })

                const chart = new Chart({
                    container: 'job-pie',
                    autoFit: true,
                    height: that.height
                })
                this.chart = chart
                chart.data(this.pieData.data)
                chart.coordinate('theta', {
                    radius: 0.85,
                    innerRadius: 0.8
                })
                chart.legend(this.pieData.dimension, {
                    position: 'right',
                    custom: true,
                    items: that.pieData.data.map((obj, index) => {
                        return {
                            name: obj[that.pieData.dimension],
                            value: obj[that.pieData.metric],
                            marker: {
                                symbol: 'square',
                                style: {
                                    r: 5,
                                    fill: chart.getTheme().colors10[index]
                                }
                            }
                        }
                    }),
                    itemValue: {
                        style: {
                            fill: '#313238',
                            fontSize: 12
                        }
                    },
                    itemName: {
                        spacing: 30
                    }
                })
                chart.tooltip(false)
                chart
                    .interval()
                    .adjust('stack')
                    .position(this.pieData.metric)
                    .color(this.pieData.dimension)
                    .shape('slice-shape')

                chart.interaction('element-highlight')
                chart.render()

                updateAnnotation(this.pieData.data[0])
                // 监听 element 上状态的变化来动态更新 Annotation 信息
                chart.on('element:statechange', (ev) => {
                    const {state, stateStatus, element} = ev.gEvent.originalEvent

                    // 本示例只需要监听 active 的状态变化
                    if (state === 'active') {
                        const data = element.getData()
                        if (stateStatus) {
                            // 更新 Annotation
                            updateAnnotation(data)
                        }
                    }
                })

                // 绘制 annotation
                let lastItem

                function updateAnnotation(data) {
                    if (data[that.pieData.dimension] !== lastItem) {
                        chart.annotation().clear(true)
                        chart
                            .annotation()
                            .text({
                                position: ['50%', '50%'],
                                content: `${data[that.pieData.metric]}%`,
                                style: {
                                    fontSize: 24,
                                    fill: '#63656E',
                                    textAlign: 'center'
                                },
                                offsetY: -20,
                                offsetX: 4
                            })
                            .text({
                                position: ['50%', '50%'],
                                content: data[that.pieData.dimension],
                                style: {
                                    fontSize: 14,
                                    fill: '#699DF4',
                                    textAlign: 'center'
                                },
                                offsetY: 20
                            })
                        chart.render(true)
                        lastItem = data[that.pieData.dimension]
                    }
                }
            }
        }
    }
</script>
