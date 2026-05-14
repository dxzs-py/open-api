<template>
    <div id="sys-setting">
        <bk-form :label-width="150" :model="formData">
            <bk-form-item label="系统配置第一项" :property="'first'">
                <bk-input v-model="formData.first"
                    style="max-width: 1056px; width: 97%;"
                    :input-style="{ background: '#FAFBFD' }"></bk-input>
                <bk-popover placement="bottom-start" content="这里是提示文字">
                    <i class="sys-popover-icon iconfont icon-xianxingtubiao-tishi"></i>
                </bk-popover>
            </bk-form-item>
            <bk-form-item label="系统配置第二项" :property="'second'">
                <bk-input v-model="formData.second"
                    style="max-width: 1056px; width: 97%;"
                    :input-style="{ 'background': '#FAFBFD' }"></bk-input>
                <bk-popover placement="bottom-start" content="这里是提示文字">
                    <i class="sys-popover-icon iconfont icon-xianxingtubiao-tishi"></i>
                </bk-popover>
            </bk-form-item>
            <bk-form-item label="系统配置控制开关" :property="'switch'">
                <bk-switcher v-model="formData.switch" theme="primary"></bk-switcher>
            </bk-form-item>
            <bk-form-item label="系统配置第N项" :property="'nth'">
                <bk-input v-model="formData.nth"
                    style="max-width: 1056px; width: 97%;"
                    :input-style="{ 'background': '#FAFBFD' }"></bk-input>
                <bk-popover placement="bottom-start" content="这里是提示文字">
                    <i class="sys-popover-icon iconfont icon-xianxingtubiao-tishi"></i>
                </bk-popover>
            </bk-form-item>
            <bk-form-item label="系统配置单选" :property="'radio'">
                <bk-radio-group v-model="formData.radio">
                    <bk-radio :value="'selected'">
                        已选择
                    </bk-radio>
                    <bk-radio :value="'unselect'">
                        未选择
                    </bk-radio>
                </bk-radio-group>
            </bk-form-item>
        </bk-form>
        <bk-button :theme="'primary'" :title="'修改'" class="mr10" ext-cls="update-btn" @click="handleUpdate">
            修改
        </bk-button>
    </div>
</template>

<script>
    export default {
        name: 'sys-setting',
        data() {
            return {
                formData: {
                    first: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/changelog',
                    second: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/changelog',
                    switch: true,
                    nth: 'https://magicbox.bk.tencent.com/static_api/v3/components_vue/2.0/example/index.html#/changelog',
                    radio: 'selected'
                }
            }
        },
        methods: {
            handleUpdate() {
                console.log('修改')
            }
        }
    }
</script>

<style lang="scss" scoped>
    #sys-setting {
        width: 100%;
        padding: 32px 16px 10px 0;

        .sys-input {
            background: #DCDEE5;
        }

        /deep/ .bk-tooltip .bk-tooltip-ref {
            left: -30px;
            top: 2px;
        }

        .sys-popover-icon {
            font-size: 16px;
            color: #979BA5;
        }

        .bk-form-radio {
            margin-right: 24px;
        }

        .update-btn {
            margin-left: 160px;
            margin-top: 20px;
        }
    }
</style>
