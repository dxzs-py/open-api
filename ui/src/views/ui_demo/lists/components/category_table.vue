<template>
    <div class="category-table">
        <bk-tab :active.sync="tabActive" ext-cls="custom-tab" :label-height="42">
            <bk-tab-panel v-for="(panel, index1) in panels" v-bind="panel" :key="index1">
                <bk-table ref="table" :data="tableList" :pagination="pagination" ext-cls="custom-table" :size="setting.size"
                    :max-height="690" :outer-border="false">
                    <bk-table-column :label="item.label" :prop="item.id" v-for="(item, index2) in setting.selectedFields"
                        :key="index2" :show-overflow-tooltip="item.overflowTooltip" :width="item.hasOwnProperty('width') ? item.width : ''">
                        <template slot-scope="props">
                            <div v-if="item.id === 'name5'">
                                <div v-if="props.row.name5 === 'success'" style="display: flex;align-items: center;">
                                    <div class="line-color success"></div>
                                    <div>成功</div>
                                </div>
                                <div v-else-if="props.row.name5 === 'info'" style="display: flex;align-items: center;">
                                    <div class="line-color info"></div>
                                    <div>提醒</div>
                                </div>
                                <div v-else-if="props.row.name5 === 'deadly'" style="display: flex;align-items: center;">
                                    <div class="line-color deadly"></div>
                                    <div>致命</div>
                                </div>
                                <div v-else-if="props.row.name5 === 'warning'" style="display: flex;align-items: center;">
                                    <div class="line-color warning"></div>
                                    <div>预警</div>
                                </div>
                            </div>
                            <span v-else>{{props.row[item.id]}}</span>
                        </template>
                    </bk-table-column>
                    <bk-table-column type="setting">
                        <bk-table-setting-content :fields="setting.fields" :selected="setting.selectedFields"
                            @setting-change="handleSettingChange" :size="setting.size">
                        </bk-table-setting-content>
                    </bk-table-column>
                </bk-table>
            </bk-tab-panel>
        </bk-tab>
    </div>
</template>

<script>
    export default {
        data() {
            const fields = [{
                id: 'name1',
                label: '指标1',
                overflowTooltip: true,
                width: '300px'
            }, {
                id: 'name2',
                label: '指标2',
                overflowTooltip: true,
                width: ''
            }, {
                id: 'name3',
                label: '指标3',
                overflowTooltip: false,
                width: '100px'
            }, {
                id: 'name4',
                label: '指标4',
                overflowTooltip: true
            }, {
                id: 'name5',
                label: '任务状态',
                overflowTooltip: false
            }, {
                id: 'name6',
                label: '指标4',
                overflowTooltip: true
            }, {
                id: 'name7',
                label: '指标4',
                overflowTooltip: true,
                width: '150px'
            }]
            return {
                tableList: [],
                setting: {
                    size: 'small', // 表格大小
                    fields: fields, // 表格所有列
                    selectedFields: fields.slice(0, 8) // 表格当前显示列
                },
                tabActive: 0,
                pagination: {
                    current: 1,
                    count: 1,
                    limit: 20
                },
                panels: [{
                             name: 0,
                             label: '全部'
                         },
                         {
                             name: 1,
                             label: '任务一'
                         },
                         {
                             name: 2,
                             label: '任务二'
                         },
                         {
                             name: 3,
                             label: '任务三'
                         }
                ]
            }
        },
        created() {
            this.getCateData()
        },
        methods: {
            // 处理表格字段显隐
            handleSettingChange({
                fields,
                size
            }) {
                this.setting.size = size
                this.setting.selectedFields = fields
            },
            // 数据获取
            async getCateData() {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .category-table {
        .custom-tab {
            /deep/ .bk-tab-section {
                padding: 20px 0 0 0;
                background-color: #fff;
            }
        }

        .custom-table {
            /deep/ .bk-table-pagination-wrapper {
                background-color: #fff;
            }

            /deep/ .bk-table-empty-block {
                background-color: #fff;
            }
            /deep/ {
                .bk-table-column-setting {
                    border-top: 1px solid #dfe0e5;
                }
            }
        }
    }
</style>
