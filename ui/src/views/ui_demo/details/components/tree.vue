<template>
    <div class="business-tree">
        <div class="select-biz">
            <bk-select class="header-select" :clearable="true" style="background-color: #fff;" placeholder="请选择">
                <bk-option v-for="(item, index) in bizList" :key="index" :id="item.value" :name="item.name">
                </bk-option>
            </bk-select>
        </div>
        <div class="tree">
            <div style="padding: 10px 16px;">
                <bk-input clearable :placeholder="'请输入关键字'" :right-icon="'bk-icon icon-search'">
                </bk-input>
            </div>
            <bk-big-tree ref="topoTree" :data="treeList" :options="defaultProps" :ext-cls="'custom-tree'"
                :expand-on-click="false" :default-expand-all="true" :selectable="true">
            </bk-big-tree>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                bizList: [{
                    value: '蓝鲸业务',
                    name: '蓝鲸业务'
                }],
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
    .business-tree {
        .select-biz {
            padding: 10px 16px;
            border-bottom: 1px solid #DCDEE5;
        }

        .tree {
            .custom-tree {
                margin-top: 10px;
                /deep/ .bk-big-tree-node {
                    padding-left: calc(var(--level) * 30px + 16px);
                    // margin-left: 16px;
                }
            }
        }
    }
</style>
