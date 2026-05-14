<template>
    <div class="custom-table">
        <bk-table ref="table" :data="tableList" :pagination="pagination" ext-cls="default-custom-table" :max-height="690">
            <bk-table-column label="指标1" prop="name1" :show-overflow-tooltip="true">
                <template slot-scope="props">
                    <div style="padding: 10px 0 10px 0;">
                        <div style="color: #3A84FF;cursor: pointer;">{{props.row.name1}}</div>
                        <div style="margin-top: 5px;">{{props.row.name1}}</div>
                    </div>
                </template>
            </bk-table-column>
            <bk-table-column label="指标2" prop="name2"></bk-table-column>
            <bk-table-column label="指标3" prop="name3">
                <template slot-scope="props">
                    <span style="color: #3A84FF;">{{props.row.name3}}</span>
                </template>
            </bk-table-column>
            <bk-table-column label="指标4" prop="name4"></bk-table-column>
            <bk-table-column
                label="节点状态"
                prop="name5"
                :filters="statusFilters"
                :filter-method="statusFilterMethod"
                :filter-multiple="true">
                <template slot-scope="props">
                    <div v-if="props.row.name5 === 'success'">
                        <div class="round-color success"></div>
                        <span>成功</span>
                    </div>
                    <div v-else-if="props.row.name5 === 'fail'">
                        <div class="round-color fail"></div>
                        <span>失败</span>
                    </div>
                    <div v-else-if="props.row.name5 === 'run'" style="display: flex;align-items: center;">
                        <cw-loading-icon :size="`12px`" :color="`#3A84FF`" style="margin-right: 11px;"></cw-loading-icon>
                        <span>执行中</span>
                    </div>
                    <div v-else-if="props.row.name5 === 'wait'" style="display: flex;align-items: center;">
                        <cw-loading-icon :size="`12px`" :color="`#979BA5`" style="margin-right: 11px;"></cw-loading-icon>
                        <span>等待</span>
                    </div>
                    <div v-else-if="props.row.name5 === 'pause'">
                        <div class="round-color pause"></div>
                        <span>暂停</span>
                    </div>
                    <div v-else-if="props.row.name5 === 'stop'">
                        <div class="round-color stop"></div>
                        <span>终止</span>
                    </div>
                    <div v-else-if="props.row.name5 === 'error'">
                        <div class="round-color error"></div>
                        <span>错误</span>
                    </div>
                    <div v-else-if="props.row.name5 === 'deadly'">
                        <div class="round-color deadly"></div>
                        <span>致命</span>
                    </div>
                </template>
            </bk-table-column>
            <bk-table-column label="指标4" prop="name6" :show-overflow-tooltip="true"></bk-table-column>
            <bk-table-column label="操作" width="150">
                <template>
                    <bk-button class="mr10" theme="primary" text style="margin-top: 10px;">编辑</bk-button>
                    <bk-button class="mr10" theme="primary" text>操作</bk-button>
                    <div style="display: inline-block;position: relative;">
                        <bk-popover ext-cls="cw-dot-menu" placement="bottom-start" theme="dot-menu light" trigger="click"
                            :arrow="false" :distance="0" offset="15">
                            <span class="dot-menu-trigger"></span>
                            <ul class="dot-menu-list" slot="content">
                                <li class="dot-menu-item">测试</li>
                            </ul>
                        </bk-popover>
                    </div>
                </template>
            </bk-table-column>
        </bk-table>
    </div>
</template>

<script>
    import cwLoadingIcon from '@/components/custom/cw_loading_icon.vue'
    export default {
        components: {
            cwLoadingIcon
        },
        data() {
            return {
                statusFilters: [
                    { text: '成功', value: '成功' },
                    { text: '失败', value: '失败' }
                ],
                tableList: [],
                pagination: {
                    current: 1,
                    count: 1,
                    limit: 20
                }
            }
        },
        created() {
            this.$api.Test.getCustomList().then(res => {
                this.tableList = res.data.list
                this.pagination.count = res.data.count
            })
        },
        methods: {
            statusFilterMethod(value, row, column) {
                console.log(value, row, column)
                const property = column.property
                return row[property] === value
            }
        }
    }
</script>

<style lang="scss" scoped>
    .custom-table {
        .default-custom-table {
            /deep/ .bk-table-pagination-wrapper {
                background-color: #fff;
            }

            /deep/ .is-first {
                .cell {
                    -webkit-line-clamp: 2;
                }
            }

            // .status-color {
            //     display: inline-block;
            //     width: 10px;
            //     height: 10px;
            //     border-radius: 50%;
            //     margin-right: 10px;
            // }

            .dot-menu-trigger {
                position: relative;
                bottom: 2px;
                display: block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                border-radius: 50%;
                text-align: center;
                font-size: 0;
                cursor: pointer;
            }

            .dot-menu-trigger:hover {
                color: #3A84FF;
                background-color: #DCDEE5;
            }

            .dot-menu-trigger::before {
                content: "";
                color: #3A84FF;
                display: inline-block;
                width: 3px;
                height: 3px;
                border-radius: 50%;
                background-color: currentColor;
                box-shadow: 0 -4px 0 currentColor, 0 4px 0 currentColor;
            }
        }
    }
</style>
