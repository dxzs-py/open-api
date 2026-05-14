<template>
    <div class="tree-form">
        <bk-button @click="visible = true" theme="primary">树选择-选择结果</bk-button>
        <bk-dialog v-model="visible" theme="primary" :mask-close="false" :show-footer="true" :position="{ top: 80 }"
            width="827" header-position="left" ext-cls="tree-form-dialog" :close-icon="false">
            <div class="content">
                <div class="left-content">
                    <div class="title" style="font-size: 14px;color: #313238;font-weight: 500;">
                        转移到其他业务模块
                    </div>
                    <bk-input style="width: 476px;margin-top: 17px;" clearable :placeholder="'请输入拓扑节点'"
                        :right-icon="'bk-icon icon-search'">
                    </bk-input>
                    <bk-big-tree ref="topoTree" :data="treeList" :options="defaultProps"
                        :display-matched-node-descendants="true" :ext-cls="'custom-tree'" :expand-on-click="false"
                        :default-expand-all="false" :show-checkbox="true" style="max-height: 350px;margin-top: 12px;"
                        :show-link-line="true">
                    </bk-big-tree>
                </div>
                <div class="right-content">
                    <div class="title" style="font-size: 14px;color: #313238;font-weight: 500;">
                        结果预览
                    </div>
                    <div class="select-header" style="margin-top: 12px;font-size: 12px;">
                        <div style="float: left;">
                            已选<span style="color: #3A84FF;"> {{resultList.length}} </span>个模块
                        </div>
                        <div style="float: right;color: #3A84FF;margin-right: 4px;cursor: pointer;"
                            @click="handleEmpty">清空</div>
                    </div>
                    <div style="clear: both;"></div>
                    <div style="margin-top: 6px;max-height: 407px;overflow: scroll;" class="select-result"
                        v-if="resultList.length">
                        <div v-for="(item, index) in resultList" :key="index"
                            style="height: 48px;display: flex;align-items: center;padding: 5px 5px 5px 12px;"
                            @mouseenter="handleIsShowClose(item)" @mouseleave="handleIsShowClose(item)">
                            <div class="left-result" style="font-size: 12px;flex: 1;">
                                <span style="color: #63656E;">{{item.name1}}</span><br>
                                <span style="color: #979BA5;">{{item.name2}}</span>
                            </div>
                            <div class="right-result" style="font-size: 18px;" v-show="item.closeShow">
                                <span class="iconfont icon-changyongtubiao-chahao"></span>
                            </div>
                        </div>
                    </div>
                    <div v-else style="position: relative;transform: translateY(-80%);top: 50%;">
                        <bk-exception style="height: 100%;width: 100%;" type="empty" scene="part"> </bk-exception>
                    </div>
                </div>
            </div>
        </bk-dialog>
    </div>
</template>

<script>
    export default {
        name: 'tree-form',
        data() {
            return {
                visible: false,
                defaultProps: {
                    idKey: 'id',
                    nameKey: 'label',
                    childrenKey: 'child'
                },
                treeList: [],
                resultList: [{
                    name1: 'South Wendellmouth1',
                    name2: '一级名称/二级名称/三级名称',
                    closeShow: false
                }, {
                    name1: 'South Wendellmouth2',
                    name2: '一级名称/二级名称/三级名称',
                    closeShow: false
                }, {
                    name1: 'South Wendellmouth2',
                    name2: '一级名称/二级名称/三级名称',
                    closeShow: false
                }, {
                    name1: 'South Wendellmouth2',
                    name2: '一级名称/二级名称/三级名称',
                    closeShow: false
                }, {
                    name1: 'South Wendellmouth2',
                    name2: '一级名称/二级名称/三级名称',
                    closeShow: false
                }]
            }
        },
        created() {
            this.$api.Test.getTreeFormTreelist().then(res => {
                console.log(res)
                this.treeList = res.data.list
            })
        },
        methods: {
            handleEmpty() {
                this.resultList = []
            },
            handleIsShowClose(item) {
                item.closeShow = !item.closeShow
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tree-form {
        padding: 20px 24px;
    }
</style>
<style lang="scss">
    .tree-form-dialog {
        .bk-dialog-tool {
            display: none;
        }

        .bk-dialog-body {
            padding: 0;
            height: 470px;

            .content {
                height: 100%;

                .left-content {
                    float: left;
                    width: 507px;
                    padding: 20px 16px 0 16px;
                }

                .right-content {
                    position: relative;
                    float: right;
                    width: 320px;
                    background-color: #F5F6FA;
                    border-left: 1px solid #DCDEE5;
                    box-sizing: border-box;
                    // border: 1px solid #DCDEE5;
                    padding: 10px 23px 0 25px;
                    height: 100%;

                    .select-result > div {
                        background-color: #fff;
                        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                        border-radius: 0 2px 2px 0;
                        border-bottom: 1px solid #DCDEE5;
                    }

                    .select-result > div:last-of-type {
                        border-bottom: 0;
                    }

                    .select-result > div:hover {
                        background-color: #E1ECFF;
                        cursor: pointer;
                    }

                    .select-result > div:hover > .right-result {
                        color: #3A84FF;
                    }
                }
            }
        }
    }
</style>
