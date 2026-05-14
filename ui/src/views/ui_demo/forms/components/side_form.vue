<template>
    <div class="form">
        <div class="content">
            <div class="sort-form" v-if="formType === 'sort'">
                <bk-form ref="form" :label-width="200" form-type="vertical">
                    <bk-form-item label="作业名称" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="通知邮箱">
                        <bk-select style="background-color: #fff;">
                            <bk-option v-for="option in emailList" :key="option.id" :id="option.id" :name="option.name">
                            </bk-option>
                        </bk-select>
                    </bk-form-item>
                    <bk-form-item label="作业对象">
                        <bk-select style="background-color: #fff;">
                            <bk-option v-for="option in workObj" :key="option.id" :id="option.id" :name="option.name">
                            </bk-option>
                        </bk-select>
                    </bk-form-item>
                    <bk-form-item label="作业模板">
                        <bk-select style="background-color: #fff;">
                            <bk-option v-for="option in workTpl" :key="option.id" :id="option.id" :name="option.name">
                            </bk-option>
                        </bk-select>
                    </bk-form-item>
                    <bk-form-item style="margin-top: 30px;font-size: 0;">
                        <bk-button theme="primary" style="margin-right: 8px;">保存</bk-button>
                        <bk-button>取消</bk-button>
                    </bk-form-item>
                </bk-form>
            </div>
            <div class="long-form" v-else-if="formType === 'long'">
                <bk-form ref="form" :label-width="200" form-type="vertical">
                    <bk-form-item label="作业名称" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="通知邮箱">
                        <bk-select style="background-color: #fff;" placeholder="请选择通知对象邮箱">
                            <bk-option v-for="option in emailList" :key="option.id" :id="option.id" :name="option.name">
                            </bk-option>
                        </bk-select>
                    </bk-form-item>
                    <bk-form-item label="作业对象">
                        <bk-select style="background-color: #fff;" placeholder="输入作业对象">
                            <bk-option v-for="option in workObj" :key="option.id" :id="option.id" :name="option.name">
                            </bk-option>
                        </bk-select>
                    </bk-form-item>
                    <bk-form-item label="作业模板">
                        <bk-select style="background-color: #fff;">
                            <bk-option v-for="option in workTpl" :key="option.id" :id="option.id" :name="option.name">
                            </bk-option>
                        </bk-select>
                    </bk-form-item>
                    <bk-form-item label="新增属性1" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性2" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性3" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性4" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性5" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性6" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性7" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性8" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性9" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性10" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                    <bk-form-item label="新增属性11" :required="true">
                        <bk-input placeholder="输入作业任务名称"></bk-input>
                    </bk-form-item>
                </bk-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            formType: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                form: {},
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
                workObj: [{
                    name: '作业一',
                    id: 'work1'
                }],
                workTpl: [{
                    name: '模板一',
                    id: 'tpl1'
                }]
            }
        }
    }
</script>

<style scoped lang="scss">
    .form {
        .content {
            padding: 13px 24px 0 24px;
        }
    }
</style>
