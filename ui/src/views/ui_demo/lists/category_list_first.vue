<template>
    <div class="category-list-first">
        <div class="header">
            <div style="float: left;">
                <bk-button theme="primary" class="mr10">新建</bk-button>
                <bk-button class="mr10">导入</bk-button>
                <bk-button>批量导出</bk-button>
            </div>
            <div style="float: right;">
                <bk-input style="width: 300px;" clearable :placeholder="'请输入搜索项名'" :right-icon="'bk-icon icon-search'">
                </bk-input>
            </div>
        </div>
        <div style="clear: both;"></div>
        <div class="content">
            <category-table></category-table>
        </div>
    </div>
</template>

<script>
    import categoryTable from './components/category_table.vue'
    export default {
        name: 'category-list-first',
        components: {
            categoryTable
        }
    }
</script>

<style lang="scss" scoped>
    .category-list-first {
        padding: 20px 24px 20px 24px;
        .header {
            font-size: 0;
        }

        .content {
            margin-top: 20px;
        }
    }
</style>
