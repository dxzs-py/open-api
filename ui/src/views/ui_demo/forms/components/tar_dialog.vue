<template>
    <div class="choose-target-dialog">
        <bk-tab :active.sync="tabActive" ext-cls="custom-tab" :label-height="42" type="unborder-card">
            <bk-tab-panel v-for="(panel, index) in panels" v-bind="panel" :key="index">
                <linux-tab v-if="panel.name === tabActive ? true : false"></linux-tab>
                <span v-else-if="panel.name === tabActive ? true : false">Windows</span>
                <span v-else-if="panel.name === tabActive ? true : false">AIX</span>
            </bk-tab-panel>
        </bk-tab>
    </div>
</template>

<script>
    import linuxTab from './linux_tab.vue'
    export default {
        components: {
            linuxTab
        },
        data() {
            return {
                tabActive: 'Linux',
                panels: [{
                    name: 'Linux',
                    label: 'Linux'
                }, {
                    name: 'Windows',
                    label: 'Windows'
                }, {
                    name: 'AIX',
                    label: 'AIX'
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .choose-target-dialog {
        .custom-tab {
            /deep/ .bk-tab-section {
                padding: 20px 0 0 0;
            }
        }
    }
</style>
