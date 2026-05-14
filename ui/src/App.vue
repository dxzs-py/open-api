<template>
    <div id="app">
        <left-navigation></left-navigation>
    </div>
</template>

<script>
    import leftNavigation from '@/components/base/left_navigation'

    export default {
        name: 'app',
        components: {
            leftNavigation
        },
        data() {
            return {
                userInfo: {}
            }
        },
        mounted() {
        },
        created() {
            this.getUser()
        },
        methods: {
            async getUser() {
                const res = await this.$api.Test.GetDashboard()
                if (!res.result) return
                this.userInfo = res.data
            }
        }
    }
</script>
<style lang="scss">
    html, body {
        height: 100%;
        min-width: 1280px;
        font-size: 14px;
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background: rgba(255, 0, 0, .4);
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: rgba(255, 255, 255, .07);
    }

    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: rgba(11, 54, 106, .52);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .5);
    }

    ::-webkit-scrollbar-thumb:window-inactive {
        background-color: rgba(255, 255, 255, .07);
    }
</style>
