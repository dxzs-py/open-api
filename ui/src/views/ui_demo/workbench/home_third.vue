<template>
    <div id="home-third">
        <bk-container flex :col="12" :gutter="16" ext-cls="home-container">
            <bk-row>
                <bk-col :span="6">
                    <Card style="padding: 0 0;" :show-border="false" :background-color="'inherit'" :show-header="false">
                        <template slot="content">
                            <stats-card :card-list="cardList1" :display-direction="'vertical'" :shape="'hexagon'"
                                @card-click="cardClick"></stats-card>
                        </template>
                    </Card>
                </bk-col>
                <bk-col :span="3">
                    <Card style="padding: 0 0;" :show-border="false" :background-color="'inherit'" :show-header="false">
                        <template slot="content">
                            <stats-card style="height: 230px;" :card-list="cardList2" :show-vertical="true" :shape="'hexagon'"></stats-card>
                        </template>
                    </Card>
                </bk-col>
                <bk-col :span="3">
                    <Card :title="'操作步骤指引'" style="height: 230px;">
                        <template slot="header">
                            <bk-button :text="true" title="primary" ext-cls="font-btn" @click="handleMoreInfo">查看详情
                            </bk-button>
                        </template>
                        <template slot="content">
                            <process-card :data="processData"></process-card>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="6">
                    <Card :title="'作业类型分布'">
                        <template slot="content">
                            <nested-pie :height="300" :pie-data="pieData" v-bind="$attrs"></nested-pie>
                        </template>
                    </Card>
                </bk-col>
                <bk-col :span="6">
                    <Card :show-header="false" style="padding: 16px 0;">
                        <template slot="content">
                            <bk-exception type="empty" scene="part" ext-cls="job-exception">
                                <span>暂无作业数据，请去</span>
                                <bk-button :text="true" ext-cls="job-btn" @click="handleAddJob">作业模块添加
                                </bk-button>
                            </bk-exception>
                            <display-card :card-list="jobInfo" :show-icon="false" :height="78" style="padding-top: 13px;border-top: 1px solid #DCDEE5;">
                            </display-card>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="0">
                    <Card :title="'作业趋势图'">
                        <template slot="header">
                            <div class="bk-button-group">
                                <bk-button size="small" @click="btnDays = '7'" :class="btnDays === '7' ? 'is-selected' : ''">
                                    近7天
                                </bk-button>
                                <bk-button size="small" @click="btnDays = '15'" :class="btnDays === '15' ? 'is-selected' : ''">
                                    近15天
                                </bk-button>
                                <bk-button size="small" @click="btnDays = '30'" :class="btnDays === '30' ? 'is-selected' : ''">
                                    近30天
                                </bk-button>
                            </div>
                        </template>
                        <template slot="content">
                            <job-line :line-data="lineData" v-bind="$attrs"></job-line>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>

<script>
    import Card from '@/components/base/card'
    import JobLine from './charts/job_lines'
    import NestedPie from './charts/nested_pie'
    import StatsCard from '@/components/custom/stats_cards'
    import DisplayCard from '@/components/custom/display_card'
    import ProcessCard from '@/components/custom/process_card'

    export default {
        name: 'home-third',
        components: {
            ProcessCard,
            Card,
            JobLine,
            NestedPie,
            StatsCard,
            DisplayCard
        },
        data() {
            return {
                btnDays: '7',
                cardList1: [{
                                'num': 2014,
                                'name': '作业名称',
                                'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                                'info': '作业名称解释，tooltips位置视情况调试',
                                'color': 'rgba(58, 132, 255, 0.8)',
                                'background': 'rgba(58, 132, 255, 0.3)'
                            },
                            {
                                'num': 2046,
                                'name': '业务名称',
                                'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                                'info': '',
                                'color': 'rgba(58, 132, 255, 0.8)',
                                'background': 'rgba(58, 132, 255, 0.3)'
                            },
                            {
                                'num': 1024,
                                'name': '实例名称',
                                'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                                'info': '',
                                'color': 'rgba(58, 132, 255, 0.8)',
                                'background': 'rgba(58, 132, 255, 0.3)'
                            }
                ],
                cardList2: [{
                                'num': 2046,
                                'name': '业务名称',
                                'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                                'info': '',
                                'color': 'rgba(58, 132, 255, 0.8)',
                                'background': 'rgba(58, 132, 255, 0.3)'
                            },
                            {
                                'num': 1024,
                                'name': '实例名称',
                                'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                                'info': '试',
                                'color': 'rgba(58, 132, 255, 0.8)',
                                'background': 'rgba(58, 132, 255, 0.3)'
                            }
                ],
                lineData: {
                    data: [],
                    dimension: 'month',
                    metric: 'value',
                    legend: 'name',
                    isArea: true
                },
                tendData: {
                    '7': [{
                              name: '作业一',
                              month: '1st',
                              value: 1300
                          },
                          {
                              name: '作业一',
                              month: '2nd',
                              value: 200
                          },
                          {
                              name: '作业一',
                              month: '3rd',
                              value: 600
                          },
                          {
                              name: '作业一',
                              month: '4th',
                              value: 500
                          },
                          {
                              name: '作业一',
                              month: '5th',
                              value: 400
                          },
                          {
                              name: '作业二',
                              month: '1st',
                              value: 800
                          },
                          {
                              name: '作业二',
                              month: '2nd',
                              value: 600
                          },
                          {
                              name: '作业二',
                              month: '3rd',
                              value: 1100
                          },
                          {
                              name: '作业二',
                              month: '4th',
                              value: 300
                          },
                          {
                              name: '作业二',
                              month: '5th',
                              value: 1000
                          }
                    ],
                    '15': [{
                               name: '作业一',
                               month: '6th',
                               value: 300
                           },
                           {
                               name: '作业一',
                               month: '9th',
                               value: 1200
                           },
                           {
                               name: '作业一',
                               month: '13th',
                               value: 600
                           },
                           {
                               name: '作业一',
                               month: '14th',
                               value: 500
                           },
                           {
                               name: '作业一',
                               month: '15th',
                               value: 400
                           },
                           {
                               name: '作业二',
                               month: '6th',
                               value: 200
                           },
                           {
                               name: '作业二',
                               month: '9th',
                               value: 1600
                           },
                           {
                               name: '作业二',
                               month: '13th',
                               value: 1100
                           },
                           {
                               name: '作业二',
                               month: '14th',
                               value: 700
                           },
                           {
                               name: '作业二',
                               month: '15th',
                               value: 1000
                           }
                    ],
                    '30': [{
                               name: '作业一',
                               month: '17th',
                               value: 1300
                           },
                           {
                               name: '作业一',
                               month: '20th',
                               value: 200
                           },
                           {
                               name: '作业一',
                               month: '23th',
                               value: 800
                           },
                           {
                               name: '作业一',
                               month: '27th',
                               value: 500
                           },
                           {
                               name: '作业一',
                               month: '29th',
                               value: 1400
                           },
                           {
                               name: '作业二',
                               month: '17th',
                               value: 800
                           },
                           {
                               name: '作业二',
                               month: '20th',
                               value: 600
                           },
                           {
                               name: '作业二',
                               month: '23th',
                               value: 400
                           },
                           {
                               name: '作业二',
                               month: '27th',
                               value: 1300
                           },
                           {
                               name: '作业二',
                               month: '29th',
                               value: 1000
                           }
                    ]
                },
                pieData: {
                    data: [{
                               value: 50,
                               type: '类型1',
                               name: '类型1-1'
                           },
                           {
                               value: 30,
                               type: '类型1',
                               name: '类型1-2'
                           },
                           {
                               value: 10,
                               type: '类型2',
                               name: '类型2-1'
                           },
                           {
                               value: 8,
                               type: '类型2',
                               name: '类型2-2'
                           },
                           {
                               value: 2,
                               type: '类型3',
                               name: '类型3-1'
                           }
                    ],
                    dimension: 'name',
                    metric: 'value',
                    legend: 'type'
                },
                processData: [{
                                  info: '最重要的配置前提提示信息，卡片内只放主要信息。。',
                                  color: '#EA3636',
                                  background: '#FFDDDD'
                              },
                              {
                                  info: '次重要配置前提提示信息，字数控制在1-2行。',
                                  color: '#FF9C01',
                                  background: '#FFE8C3'
                              },
                              {
                                  info: '次要的配置提示信息，或操作指引步骤。。',
                                  color: '#3A84FF',
                                  background: '#E1ECFF'
                              },
                              {
                                  info: '其他信息。点击“查看详情”展开抽屉，显示具体配置或操作信息详情。',
                                  color: '#979BA5',
                                  background: '#F0F1F5'
                              }
                ],
                jobInfo: [{
                              'num': 2046,
                              'name': '成功',
                              'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                              'info': '',
                              'color': '#2DCB56'
                          },
                          {
                              'num': 1024,
                              'name': '异常',
                              'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                              'info': '',
                              'color': '#FF8000'
                          },
                          {
                              'num': 4068,
                              'name': '进行中',
                              'icon': 'iconfont icon-mianxingtubiao-zuoyejiankongdaping',
                              'info': '',
                              'color': '#3A84FF'
                          }
                ]
            }
        },
        watch: {
            btnDays: {
                handler(val) {
                    this.lineData.data.splice(0, this.lineData.data.length, ...this.tendData[val])
                },
                immediate: true
            }
        },
        created() {
            this.lineData.data.splice(0, this.lineData.data.length, ...this.tendData[this.btnDays])
        },
        methods: {
            handleMoreInfo() {
                console.log('查看详情')
            },
            handleAddJob() {
                console.log('作业模块添加')
            },
            cardClick() {
                console.log('card click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    #home-third {
        padding: 20px 24px 20px 24px;

        .home-container {
            padding: 0 0 !important;

            .bk-grid-row + .bk-grid-row {
                margin-top: 16px;
            }

            .font-btn {
                font-size: 12px;
            }

            .job-btn {
                color: #3A84FF;
                font-size: 14px;
            }

            .job-exception {
                height: 260px;

                /deep/ .bk-exception-img {
                    height: 60%;
                }
            }
        }
    }
</style>
