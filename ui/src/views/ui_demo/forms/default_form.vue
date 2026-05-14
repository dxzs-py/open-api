<template>
    <div class="default-form">
        <div class="header">
            <cw-alert type="info" :content="`操作提示信息显示,可手动关闭, 打开默认显示提示信息。`"></cw-alert>
        </div>
        <div class="content">
            <bk-form :label-width="82" :rules="rules" :model="form" ext-cls="custom-form" ref="form">
                <bk-form-item label="作业名称" :error-display-type="'normal'" :required="true" :property="'name1'">
                    <bk-input style="width: 690px;"></bk-input>
                </bk-form-item>
                <bk-form-item label="通知邮箱">
                    <bk-select style="width: 690px;background-color: #fff;" multiple display-tag>
                        <bk-option v-for="option in emailList" :key="option.id" :id="option.id" :name="option.name">
                        </bk-option>
                    </bk-select>
                </bk-form-item>
                <bk-form-item label="作业对象" :error-display-type="'normal'" :required="true" :property="'name2'">
                    <bk-select style="width: 690px;background-color: #fff;">
                        <bk-option v-for="option in objList" :key="option.id" :id="option.id" :name="option.name">
                        </bk-option>
                    </bk-select>
                </bk-form-item>
                <bk-form-item label="作业模板" :error-display-type="'normal'" :required="true" :property="'name3'">
                    <bk-select style="width: 690px;background-color: #fff;">
                        <bk-option v-for="option in templateList" :key="option.id" :id="option.id" :name="option.name">
                        </bk-option>
                    </bk-select>
                </bk-form-item>
                <bk-form-item label="执行时间" :error-display-type="'normal'" :required="true" :property="'name4'">
                    <bk-radio-group v-model="form.name4">
                        <div style="margin-top: 6px;">
                            <bk-radio :value="'now'">立即</bk-radio>
                        </div>
                        <div style="margin-top: 10px;">
                            <bk-radio :value="'time'" class="mr20">定时</bk-radio>
                            <bk-date-picker :placeholder="'选择日期时间'" :type="'datetime'" style="width: 260px;" :disabled="executTimeDisabled('time')"></bk-date-picker>
                        </div>
                        <div class="cycle-time">
                            <bk-radio :value="'cycle'" class="mr20">周期</bk-radio>
                            <bk-date-picker :placeholder="'选择日期时间'" :type="'datetime'" style="width: 260px;" class="mr20"
                                :disabled="executTimeDisabled('cycle')"></bk-date-picker>
                            <div style="margin-right: 6px;">每</div>
                            <bk-input clearable type="number" style="width: 120px;" class="mr10" :disabled="executTimeDisabled('cycle')"></bk-input>
                            <bk-select style="width: 104px;" :style="{ backgroundColor: executTimeDisabled('cycle') ? '#fafbfd' : '#fff' }"
                                searchable class="mr10" :disabled="executTimeDisabled('cycle')">
                                <bk-option v-for="option in timeTypeList" :key="option.id" :id="option.id" :name="option.name">
                                </bk-option>
                            </bk-select>
                            <span>执行一次</span>
                        </div>
                    </bk-radio-group>
                </bk-form-item>
                <bk-form-item label="作业目标" :error-display-type="'normal'" :required="true" :property="'name5'">
                    <bk-button theme="primary" @click="visible = true">选择目标</bk-button>
                    <bk-table :data="tableList" style="margin: 10px 0 0 0;" v-if="tableList.length">
                        <bk-table-column label="指标1" prop="name1" :show-overflow-tooltip="true"></bk-table-column>
                        <bk-table-column label="指标2" prop="name2" :show-overflow-tooltip="true"></bk-table-column>
                        <bk-table-column label="指标3" prop="name3" :show-overflow-tooltip="true"></bk-table-column>
                        <bk-table-column label="指标4" prop="name4" :show-overflow-tooltip="true"></bk-table-column>
                        <bk-table-column label="指标5" prop="name5" :show-overflow-tooltip="true"></bk-table-column>
                    </bk-table>
                </bk-form-item>
                <bk-form-item v-if="!overScreenFlag">
                    <div style="font-size: 0;">
                        <bk-button style="margin-right: 10px;" theme="primary">保存</bk-button>
                        <bk-button>取消</bk-button>
                    </div>
                </bk-form-item>
            </bk-form>
            <div style="height: 72px;" v-if="overScreenFlag"></div>
            <div class="footer" v-if="overScreenFlag">
                <bk-button style="margin: 0 10px 0 106px;" theme="primary">保存</bk-button>
                <bk-button>取消</bk-button>
            </div>
            <bk-dialog v-model="visible" theme="primary" :mask-close="false" title="选择目标" :show-footer="true" :position="{ top: 80 }"
                width="600" header-position="left" ext-cls="default-form-dialog" :render-directive="'if'">
                <target-dialog></target-dialog>
            </bk-dialog>
        </div>
    </div>
</template>

<script>
    import targetDialog from './components/tar_dialog.vue'
    import cwAlert from '@/components/custom/cw_alert.vue'
    export default {
        name: 'default-form',
        components: {
            cwAlert,
            targetDialog
        },
        data() {
            return {
                visible: false,
                overScreenFlag: false, // 判断内容是否超出一屏
                form: {
                    name1: '',
                    name2: '',
                    name3: '',
                    name4: 'cycle',
                    name5: ''
                },
                value1: false,
                timeTypeList: [{
                    name: '天',
                    id: 'day'
                }, {
                    name: '时',
                    id: 'hours'
                }, {
                    name: '分',
                    id: 'minute'
                }],
                emailList: [{
                    name: '新浪',
                    id: 'xinlang'
                }, {
                    name: 'QQ',
                    id: 'QQ'
                }, {
                    name: 'Goole',
                    id: 'Goole'
                }],
                objList: [{
                    name: '主机',
                    id: 'host'
                }],
                templateList: [{
                    name: 'TEST123',
                    id: 'TEST123'
                }],
                tableList: [],
                rules: {
                    name1: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'change'
                    }],
                    name2: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'change'
                    }],
                    name3: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'change'
                    }],
                    name4: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'change'
                    }],
                    name5: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'change'
                    }]
                }
            }
        },
        created() {
            this.$api.Test.getDefaultFormList().then(res => {
                this.tableList = res.data.list
                this.overScreen()
            })
        },
        methods: {
            executTimeDisabled(str) {
                if (this.form.name4 === str) {
                    return false
                }
                return true
            },
            // 判断内容是否超过一屏
            overScreen() {
                this.$nextTick(() => {
                    if (((document.getElementsByClassName('default-form')[0].offsetHeight) - (document.documentElement
                        .clientHeight - 52)) > 0) {
                        this.overScreenFlag = true
                    } else {
                        this.overScreenFlag = false
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .default-form {
        padding-top: 20px;
        position: relative;

        .header {
            padding: 0 24px 0 24px;
        }

        .content {
            margin-top: 20px;

            .custom-form {
                padding: 0 24px 0 24px;

                .cycle-time {
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                }
            }

            .footer {
                position: fixed;
                width: 100%;
                bottom: 0;
                height: 52px;
                line-height: 52px;
                background: #FFFFFF;
                box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
                font-size: 0;
                z-index: 999;
            }
        }
    }
</style>
<style>
    .default-form-dialog > .bk-dialog > .bk-dialog-content > .bk-dialog-header {
        padding: 0 24px 2px 24px;
    }

    .default-form-dialog > .bk-dialog > .bk-dialog-content > .bk-dialog-body {
        padding: 0 24px 0 24px;
        height: 470px;
    }
</style>
