<template>
    <div class="system-settings">
        <bk-container flex :col="8" :gutter="16" ext-cls="home-container">
            <bk-row>
                <bk-col :span="0">
                    <Card :title="'Logo设置'">
                        <template slot="content">
                            <logo-setting></logo-setting>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="0">
                    <Card :title="'系统设置'">
                        <template slot="content">
                            <sys-setting></sys-setting>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
            <bk-row>
                <bk-col :span="0">
                    <Card :show-header="false" :show-border="false">
                        <template slot="content">
                            <sys-tab></sys-tab>
                        </template>
                    </Card>
                </bk-col>
            </bk-row>
        </bk-container>
    </div>
</template>

<script>
    import Card from '@/components/base/card'
    import LogoSetting from '@/components/custom/logo_setting'
    import SysSetting from './components/sys_setting'
    import SysTab from './components/sys_tab'

    export default {
        name: 'system-settings',
        components: {
            Card,
            LogoSetting,
            SysSetting,
            SysTab
        }
    }
</script>

<style lang="scss" scoped>
    .system-settings {
        padding: 20px 24px 20px 24px;
        .home-container {
            padding: 0 0 !important;

            .bk-grid-row + .bk-grid-row {
                margin-top: 16px;
            }

            .font-btn {
                font-size: 12px;
            }
        }
    }
</style>
