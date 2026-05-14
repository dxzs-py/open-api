<template>
    <div class="custom-list-third">
        <div class="tab">
            <div class="bk-button-group" style="margin-bottom: 16px;">
                <bk-button @click="handleSelectTab(item.name)" :class="tabSelected === item.name ? 'is-selected' : ''"
                    v-for="(item, index) in panels" :key="index">{{item.label}} ({{item.count}})</bk-button>
            </div>
        </div>
        <div class="line"></div>
        <div class="header">
            <div style="float: left;">
                <bk-button theme="primary" class="mr10">主要按钮</bk-button>
                <bk-button class="mr10">次要按钮</bk-button>
                <bk-button class="mr10">次要按钮</bk-button>
                <bk-button class="mr10">次要按钮</bk-button>
                <bk-button title="toggle-lock" icon="icon-cog" class="mr10" style="color: #979BA5;"></bk-button>
            </div>
            <div style="float: right;">
                <bk-input style="width: 300px;" clearable :placeholder="'请输入搜索项名'" :right-icon="'bk-icon icon-search'">
                </bk-input>
            </div>
        </div>
        <div style="clear: both;"></div>
        <div class="content">
            <custom-table></custom-table>
        </div>
    </div>
</template>

<script>
    import customTable from './components/custom_table.vue'
    export default {
        name: 'custom-list-third',
        components: {
            customTable
        },
        data() {
            return {
                tabSelected: 'all',
                panels: [{
                    name: 'all',
                    label: '全部',
                    count: 100
                }, {
                    name: 'task1',
                    label: '任务一',
                    count: 0
                }, {
                    name: 'task2',
                    label: '任务二',
                    count: 64
                }, {
                    name: 'task3',
                    label: '任务三',
                    count: 36
                }]
            }
        },
        methods: {
            handleSelectTab(str) {
                this.tabSelected = str
            }
        }
    }
</script>

<style lang="scss" scoped>
    .custom-list-third {
        padding: 20px 24px 20px 24px;
        .line {
            width: 100%;
            height: 1px;
            background-color: #DCDEE5;
            margin-bottom: 15px;
        }

        .header {
            font-size: 0;
        }

        .content {
            margin-top: 20px;
        }
    }
</style>
