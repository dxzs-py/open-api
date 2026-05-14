<template>
    <div class="home-second">
        <bk-container :col="8" :gutter="16" ext-cls="home-container">
            <bk-row>
                <bk-col :span="0">
                    <Card :show-header="false">
                        <template slot="content">
                            <display-card :card-list="cardList" :height="66"></display-card>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="3">
                    <Card :title="'作业TOP10'">
                        <template slot="content">
                            <job-bar :bar-data="barData" :height="250" v-bind="$attrs"></job-bar>
                        </template>
                    </Card>
                </bk-col>
                <bk-col :span="5">
                    <Card :title="'作业动态分布'">
                        <template slot="content">
                            <job-pie :pie-data="pieData" :height="250" v-bind="$attrs"></job-pie>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="0">
                    <Card :title="'作业执行趋势'">
                        <template slot="header">
                            <div class="bk-button-group">
                                <bk-button
                                    size="small"
                                    @click="btnDays = '7'"
                                    :class="btnDays === '7' ? 'is-selected' : ''">
                                    近7天
                                </bk-button>
                                <bk-button
                                    size="small"
                                    @click="btnDays = '15'"
                                    :class="btnDays === '15' ? 'is-selected' : ''">
                                    近15天
                                </bk-button>
                                <bk-button
                                    size="small"
                                    @click="btnDays = '30'"
                                    :class="btnDays === '30' ? 'is-selected' : ''">
                                    近30天
                                </bk-button>
                            </div>
                        </template>
                        <template slot="content">
                            <job-tend :tend-data="tendData" :height="270" v-bind="$attrs"></job-tend>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>

<script>
    import Card from '@/components/base/card'
    import DisplayCard from '@/components/custom/display_card'
    import JobBar from './charts/job_bars'
    import JobPie from './charts/job_pie'
    import JobTend from './charts/job_tend'

    export default {
        name: 'home-second',
        components: {
            Card,
            DisplayCard,
            JobBar,
            JobPie,
            JobTend
        },
        data() {
            return {
                btnDays: '7',
                cardList: [
                    {
                        'num': 2014,
                        'name': '作业名称',
                        'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                        'info': '作业名称解释，tooltips位置视情况调试',
                        'color': '#63656E'
                    },
                    {
                        'num': 2046,
                        'name': '业务名称',
                        'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                        'info': '',
                        'color': '#63656E'
                    },
                    {
                        'num': 1024,
                        'name': '实例名称',
                        'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                        'info': '',
                        'color': '#63656E'
                    },
                    {
                        'num': 4068,
                        'name': '模型名称',
                        'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                        'info': '',
                        'color': '#63656E'
                    }
                ],
                barData: {
                    data: [
                        {name: '指标1', value: 588},
                        {name: '指标2', value: 570},
                        {name: '指标3', value: 500},
                        {name: '指标4', value: 400},
                        {name: '指标5', value: 400},
                        {name: '指标6', value: 290},
                        {name: '指标7', value: 180},
                        {name: '指标8', value: 165},
                        {name: '指标9', value: 150},
                        {name: '指标10', value: 88}
                    ],
                    dimension: 'name',
                    metric: 'value'
                },
                pieData: {
                    data: [
                        {name: '正常', value: 72},
                        {name: '异常', value: 28}
                    ],
                    dimension: 'name',
                    metric: 'value'
                },
                tendData: {
                    data: {},
                    dimension: 'month',
                    metric: 'value',
                    legend: 'name',
                    line: 'limit',
                    name: 'test'
                },
                data: {
                    '7': {
                        barData: [
                            {name: '作业一', month: '1st', value: 1300},
                            {name: '作业一', month: '2nd', value: 200},
                            {name: '作业一', month: '3rd', value: 600},
                            {name: '作业一', month: '4th', value: 500},
                            {name: '作业一', month: '5th', value: 400},
                            {name: '作业二', month: '1st', value: 800},
                            {name: '作业二', month: '2nd', value: 600},
                            {name: '作业二', month: '3rd', value: 1100},
                            {name: '作业二', month: '4th', value: 300},
                            {name: '作业二', month: '5th', value: 1000},
                            {name: '作业三', month: '1st', value: 1400},
                            {name: '作业三', month: '2nd', value: 100},
                            {name: '作业三', month: '3rd', value: 300},
                            {name: '作业三', month: '4th', value: 600},
                            {name: '作业三', month: '5th', value: 700}
                        ],
                        lineData: [
                            {limit: 300, month: '1st'},
                            {limit: 400, month: '2nd'},
                            {limit: 400, month: '3rd'},
                            {limit: 400, month: '4th'},
                            {limit: 400, month: '5th'}
                        ]
                    },
                    '15': {
                        barData: [
                            {name: '作业一', month: '6th', value: 200},
                            {name: '作业一', month: '8th', value: 200},
                            {name: '作业一', month: '12th', value: 600},
                            {name: '作业一', month: '13th', value: 500},
                            {name: '作业一', month: '15th', value: 1200},
                            {name: '作业二', month: '6th', value: 800},
                            {name: '作业二', month: '8th', value: 600},
                            {name: '作业二', month: '12th', value: 1100},
                            {name: '作业二', month: '13th', value: 300},
                            {name: '作业二', month: '15th', value: 1000},
                            {name: '作业三', month: '6th', value: 400},
                            {name: '作业三', month: '8th', value: 100},
                            {name: '作业三', month: '12th', value: 1300},
                            {name: '作业三', month: '13th', value: 600},
                            {name: '作业三', month: '15th', value: 700}
                        ],
                        lineData: [
                            {limit: '300', month: '6th'},
                            {limit: '400', month: '8th'},
                            {limit: '400', month: '12th'},
                            {limit: '400', month: '13th'},
                            {limit: '400', month: '15th'}
                        ]
                    },
                    '30': {
                        barData: [
                            {name: '作业一', month: '12th', value: 300},
                            {name: '作业一', month: '15th', value: 200},
                            {name: '作业一', month: '17th', value: 600},
                            {name: '作业一', month: '20th', value: 500},
                            {name: '作业一', month: '28th', value: 400},
                            {name: '作业二', month: '12th', value: 500},
                            {name: '作业二', month: '15th', value: 600},
                            {name: '作业二', month: '17th', value: 1100},
                            {name: '作业二', month: '20th', value: 300},
                            {name: '作业二', month: '28th', value: 1000},
                            {name: '作业三', month: '12th', value: 1400},
                            {name: '作业三', month: '15th', value: 1100},
                            {name: '作业三', month: '17th', value: 300},
                            {name: '作业三', month: '20th', value: 600},
                            {name: '作业三', month: '28th', value: 200}
                        ],
                        lineData: [
                            {limit: '300', month: '12th'},
                            {limit: '400', month: '15th'},
                            {limit: '400', month: '17th'},
                            {limit: '400', month: '20th'},
                            {limit: '400', month: '28th'}
                        ]
                    }
                }
            }
        },
        watch: {
            btnDays: {
                handler(val) {
                    this.tendData.data = this.data[val]
                    // this.tendData.data.splice(0, this.tendData.data.length, ...this.data[val])
                },
                immediate: true
            }
        },
        created() {
            this.tendData.data = this.data[this.btnDays]
            // this.tendData.data.splice(0, this.tendData.data.length, ...this.data[this.btnDays])
        },
        methods: {
            handleMoreInfo() {
                console.log('查看更多')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home-second {
        padding: 20px 24px 20px 24px;
        .home-container {
            padding: 0 0 !important;
            .bk-grid-row + .bk-grid-row {
                margin-top: 16px;
            }

            .font-btn {
                font-size: 12px;
            }
        }
    }
</style>
