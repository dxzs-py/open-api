<template>
    <div class="content-card" :class="{ 'show-border': showBorder }" :style="{ 'background': backgroundColor }">
        <div class="content-card-header" :class="{ 'no-header': !showHeader }">
            <div class="content-card-header-title">{{ title }}</div>
            <div class="content-card-header-custom">
                <slot name="header"></slot>
            </div>
        </div>
        <div class="content-card-body">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'card',
        props: {
            title: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: '#fff'
            },
            showBorder: {
                type: Boolean,
                default: true
            },
            showHeader: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content-card {
        width: 100%;
        min-height: 105px;

        .content-card-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: 20px;

            .content-card-header-title {
                font-weight: 600;
                color: #63656E;
                line-height: 20px;
            }
        }
    }

    .show-border {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding: 16px 20px;
    }

    .no-header {
        display: none !important;
    }
</style>
