<template>
    <div class="biz-node">
        <div class="select-input">
            <bk-checkbox :true-value="'yes'" :false-value="'no'" v-model="demo2" style="flex: 1;">
                全选任务
            </bk-checkbox>
            <bk-input clearable :placeholder="'请输入业务名'" :right-icon="'bk-icon icon-search'" style="width: 280px;"></bk-input>
        </div>
        <div class="content">
            <bk-big-tree ref="topoTree" :data="treeList" :options="defaultProps" :display-matched-node-descendants="true"
                :ext-cls="'custom-tree'" :expand-on-click="false" :default-expand-all="true" :show-checkbox="true">
            </bk-big-tree>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                demo2: 'no',
                defaultProps: {
                    idKey: 'id',
                    nameKey: 'label',
                    childrenKey: 'child'
                },
                treeList: []
            }
        },
        created() {
            this.$api.Test.getLinuxBiznodeTree().then(res => {
                this.treeList = res.data.list
            })
        }
    }
</script>

<style lang="scss" scoped>
    .biz-node {
        .select-input {
            display: flex;
            align-items: center;
        }
        .content {
            max-height: 320px;
            margin-top: 10px;
            overflow: scroll;
        }
    }
</style>
