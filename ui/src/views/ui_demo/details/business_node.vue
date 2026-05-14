<template>
    <div class="business-node">
        <bk-resize-layout :collapsible="true" :border="false" style="height: 100%;" initial-divide="272px" ext-cls="custom-layout"
            :min="200">
            <div slot="aside" class="left" ref="aside">
                <left-tree></left-tree>
            </div>
            <div slot="main" class="right">
                <bk-exception class="exception-wrap-item" type="403">
                    <span class="text-title">无业务权限</span>
                    <div class="text-subtitle">你没有相应业务的访问权限，请前往申请相关业务权限</div>
                    <div class="text-wrap">
                        <bk-button theme="primary">去申请</bk-button>
                    </div>
                </bk-exception>
            </div>
        </bk-resize-layout>
    </div>
</template>

<script>
    import leftTree from './components/tree.vue'
    export default {
        name: 'business-node',
        components: {
            leftTree
        }
    }
</script>

<style lang="scss" scoped>
    .business-node {
        height: 100%;

        .left {
            height: 100%;
        }

        .right {
            height: 100%;
            position: relative;
            background-color: #fff;

            .exception-wrap-item {
                position: relative;
                top: 10%;

                .text-title {
                    height: 31px;
                    font-size: 24px;
                    font-family: MicrosoftYaHei;
                    color: #63656E;
                    line-height: 31px;
                }

                .text-subtitle {
                    margin-top: 14px;
                    height: 19px;
                    font-size: 14px;
                    font-family: MicrosoftYaHei;
                    color: #979BA5;
                    line-height: 19px;
                }

                .text-wrap {
                    margin-top: 24px;
                }
            }
        }
    }
</style>
