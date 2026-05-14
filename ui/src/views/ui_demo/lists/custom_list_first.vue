<template>
    <div class="custom-list-first">
        <bk-tab :active.sync="tabActive" ext-cls="custom-tab" :label-height="42">
            <bk-tab-panel v-for="(panel, index) in panels" v-bind="panel" :key="index">
                <template slot="label">
                    <span>{{panel.label}}</span>
                    <span>({{panel.count}})</span>
                </template>
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
                    <custom-table v-if="panel.name === tabActive ? true : false"></custom-table>
                </div>
            </bk-tab-panel>
        </bk-tab>
    </div>
</template>

<script>
    import customTable from './components/custom_table.vue'
    export default {
        name: 'custom-list-first',
        components: {
            customTable
        },
        data() {
            return {
                tabActive: 0,
                panels: [{
                    name: 0,
                    label: '全部',
                    count: 100
                }, {
                    name: 1,
                    label: '任务一',
                    count: 0
                }, {
                    name: 2,
                    label: '任务二',
                    count: 64
                }, {
                    name: 3,
                    label: '任务三',
                    count: 36
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .custom-list-first {
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
