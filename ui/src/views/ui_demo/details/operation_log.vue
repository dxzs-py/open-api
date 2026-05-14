<template>
    <div class="operation-log">
        <div class="header">
            <div class="search-item">
                <span style="display: inline-block;width: 60px;">操作类型</span>
                <bk-select class="header-select" :clearable="true" style="background-color: #fff;width: 140px;"
                    v-model="searchForm.type" placeholder="请选择">
                    <bk-option v-for="(item, index) in operatTypeList" :key="index" :id="item.value" :name="item.name">
                    </bk-option>
                </bk-select>
            </div>
            <div class="search-item">
                <span style="display: inline-block;width: 60px;">操作者</span>
                <bk-input style="width: 240px;" clearable :placeholder="'请输入操作者'" :right-icon="'bk-icon icon-search'"
                    v-model="searchForm.operator">
                </bk-input>
            </div>
            <div class="search-item">
                <bk-date-picker v-model="searchForm.eta" :placeholder="'选择日期时间'" :type="'datetime'"
                    format="yyyy-MM-dd HH:mm:ss" style="width: 260px;" :transfer="true"></bk-date-picker>
            </div>
            <div class="search-item">
                <bk-button>重置</bk-button>
            </div>
        </div>
        <div style="clear: both;"></div>
        <div class="content">
            <bk-table ref="table" :data="tableList" :pagination="pagination" ext-cls="custom-table" :max-height="690">
                <bk-table-column label="操作者" prop="name1" :show-overflow-tooltip="true" width="250"></bk-table-column>
                <bk-table-column label="操作对象" prop="name2" :show-overflow-tooltip="true"></bk-table-column>
                <bk-table-column label="操作类型" prop="name3" :show-overflow-tooltip="true" width="120"></bk-table-column>
                <bk-table-column label="操作时间" prop="name4" :show-overflow-tooltip="true"></bk-table-column>
                <bk-table-column label="概要" prop="name5" :show-overflow-tooltip="true"></bk-table-column>
            </bk-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'operation-log',
        data() {
            return {
                tableList: [],
                pagination: {
                    current: 1,
                    count: 1,
                    limit: 20
                },
                searchForm: {
                    type: 'all',
                    operator: '',
                    eta: ''
                },
                operatTypeList: [{
                    value: 'all',
                    name: '所有'
                }]
            }
        },
        created() {
            this.$api.Test.getLogList().then(res => {
                this.tableList = res.data.list
                this.pagination.count = res.data.count
            })
        }
    }
</script>

<style lang="scss" scoped>
    .operation-log {
        padding: 20px 24px;

        .header {
            width: 100%;
            font-size: 0;
            margin-bottom: 20px;
            float: left;
            display: flex;

            .search-item {
                display: flex;
                margin-right: 16px;

                span {
                    display: inline-block;
                    height: 32px;
                    line-height: 32px;
                    font-size: 14px;
                    margin-right: 12px;
                }
            }
        }

        .content {
            .custom-table {
                /deep/ .bk-table-pagination-wrapper {
                    background-color: #fff;
                }

                /deep/ .bk-table-empty-block {
                    background-color: #fff;
                }
            }
        }
    }
</style>
