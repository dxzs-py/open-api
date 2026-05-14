<template>
    <div class="linux-tab">
        <bk-radio-group v-model="radioValue">
            <bk-radio :value="item.value" v-for="(item, index) in radioList" :key="index" style="margin-right: 12px;">
                {{item.label}}
            </bk-radio>
        </bk-radio-group>
        <div class="mt20">
            <biz-node v-if="radioValue === '业务节点'"></biz-node>
            <span v-else-if="radioValue === '主机拓扑'">主机拓扑</span>
            <host-list v-else-if="radioValue === '主机列表'"></host-list>
            <span v-else-if="radioValue === '动态分组'">动态分组</span>
        </div>
    </div>
</template>

<script>
    import bizNode from './biz_node.vue'
    import hostList from './host_list.vue'
    export default {
        components: {
            bizNode,
            hostList
        },
        data() {
            return {
                radioList: [{
                    value: '业务节点',
                    label: '业务节点'
                }, {
                    value: '主机拓扑',
                    label: '主机拓扑'
                }, {
                    value: '主机列表',
                    label: '主机列表'
                }, {
                    value: '动态分组',
                    label: '动态分组'
                }],
                radioValue: '业务节点'
            }
        }
    }
</script>
