<template>
    <div class="host-list">
        <div class="search-host">
            <bk-input clearable :placeholder="'请输入主机IP'" :right-icon="'bk-icon icon-search'"></bk-input>
        </div>
        <div class="table-host">
            <bk-table :data="tableList" style="margin-top: 10px;" :max-height="300" :pagination="pagination">
                <bk-table-column type="selection" width="60"></bk-table-column>
                <bk-table-column label="作业区域名称" prop="name1" :show-overflow-tooltip="true"></bk-table-column>
                <bk-table-column label="操作系统2" prop="name2" :show-overflow-tooltip="true"></bk-table-column>
                <bk-table-column label="主机IP" prop="name3" :show-overflow-tooltip="true"></bk-table-column>
                <bk-table-column label="主机名称" prop="name4" :show-overflow-tooltip="true"></bk-table-column>
            </bk-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                basicLoading: false,
                tableList: [],
                pagination: {
                    current: 1,
                    count: 1,
                    limit: 10
                }
            }
        },
        created() {
            this.basicLoading = true
            this.$api.Test.getLinuxHostList().then(res => {
                this.tableList = res.data.list
                this.pagination.count = res.data.count
            })
        }
    }
</script>

<style lang="scss" scoped>
    .host-list {
        .table-host {
            margin-bottom: 24px;
        }
    }
</style>
