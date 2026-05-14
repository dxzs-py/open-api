<template>
    <div class="drawer-form">
        <bk-button theme="primary" @click="handleOpenDrawer('sort', '固定内容长度抽屉')">内容固定抽屉</bk-button><br>
        <bk-button theme="primary" style="margin-top: 20px;" @click="handleOpenDrawer('long', '自定义内容抽屉')">内容可自定义</bk-button>
        <bk-sideslider :is-show.sync="visible" :quick-close="true" :title="title" :width="540">
            <div slot="content" style="padding-bottom: 20px;">
                <side-form :form-type="formType"></side-form>
            </div>
            <div slot="footer" v-if="formType === 'long'">
                <div class="sidelider-footer">
                    <bk-button theme="primary" style="margin: 0 8px 0 24px;">保存</bk-button>
                    <bk-button>取消</bk-button>
                </div>
            </div>
        </bk-sideslider>
    </div>
</template>

<script>
    import sideForm from './components/side_form.vue'
    export default {
        name: 'drawer-form',
        components: {
            sideForm
        },
        data() {
            return {
                visible: false,
                title: '',
                formType: ''
            }
        },
        methods: {
            handleOpenDrawer(prop, title) {
                this.title = title
                this.formType = prop
                this.visible = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .drawer-form {
        padding: 20px 24px;

        .sidelider-footer {
            width: 540px;
            height: 52px;
            background: #FFFFFF;
            box-shadow: 0 -1px 6px 0 rgba(0, 0, 0, 0.1);
            line-height: 52px;
            font-size: 0;
        }
    }
</style>
