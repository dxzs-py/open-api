<template>
    <div id="sys-tab">
        <bk-tab :active.sync="active">
            <bk-tab-panel
                v-for="(panel, index) in panels"
                v-bind="panel"
                :key="index">
                <sys-setting></sys-setting>
            </bk-tab-panel>
        </bk-tab>
    </div>
</template>

<script>
    import SysSetting from './sys_setting'

    export default {
        name: 'sys-tab',
        components: {
            SysSetting
        },
        data() {
            return {
                panels: [
                    {name: 'system', label: '系统设置', count: 10},
                    {name: 'template', label: '通知模板', count: 20},
                    {name: 'management', label: '插件管理', count: 30},
                    {name: 'information', label: '基本信息', count: 40}
                ],
                active: 'system'
            }
        }
    }
</script>
