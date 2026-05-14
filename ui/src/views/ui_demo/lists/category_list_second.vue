<template>
    <div class="category-list-second">
        <div class="header">
            <div style="float: left;">
                <bk-input style="width: 420px;" clearable :placeholder="'请输入搜索项名，多条件同时搜索用｜隔开'" :right-icon="'bk-icon icon-search'">
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
        name: 'category-list-second',
        components: {
            categoryTable
        }
    }
</script>

<style lang="scss" scoped>
    .category-list-second {
        padding: 20px 24px 20px 24px;
        .header {
            font-size: 0;
        }

        .content {
            margin-top: 20px;
        }
    }
</style>
