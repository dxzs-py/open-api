<template>
    <div class="custom-list-second">
        <bk-tab :active.sync="tabActive" ext-cls="custom-tab" :label-height="42">
            <bk-tab-panel v-for="(panel, index) in panels" v-bind="panel" :key="index">
                <div class="header">
                    <bk-input style="width: 420px;" clearable :placeholder="'请输入搜索项名，多条件同时搜索用｜隔开'" :right-icon="'bk-icon icon-search'">
                    </bk-input>
                </div>
                <div class="content">
                    <custom-table v-if="panel.name === tabActive ? true : false"></custom-table>
                </div>
            </bk-tab-panel>
        </bk-tab>
    </div>
</template>

<script>
    import customTable from './components/custom_table.vue'
    export default {
        name: 'custom-list-second',
        components: {
            customTable
        },
        data() {
            return {
                tabActive: 0,
                panels: [{
                    name: 0,
                    label: '全部'
                }, {
                    name: 1,
                    label: '任务一'
                }, {
                    name: 2,
                    label: '任务二'
                }, {
                    name: 3,
                    label: '任务三'
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .custom-list-second {
        padding: 20px 24px 20px 24px;
        .custom-tab {
            /deep/ .bk-tab-section {
                background-color: #fff;
            }

            .header {
                font-size: 0;
            }

            .content {
                margin-top: 20px;
            }
        }
    }
</style>
