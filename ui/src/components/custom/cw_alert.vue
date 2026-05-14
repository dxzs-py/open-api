<template>
    <div class="cw-alert">
        <div :class="type" class="box">
            <slot name="icon" v-if="showIcon">
                <div class="left-icon">
                    <span class="iconfont icon-mianxingtubiao-tishi"></span>
                </div>
            </slot>
            <slot name="content">
                <span class="content">{{content}}</span>
            </slot>
            <slot name="close-icon" v-if="showCloseIcon">
                <div class="close-icon">
                    <span class="iconfont icon-changyongtubiao-chahao"></span>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'info'
            },
            content: {
                type: String,
                default: '提示信息'
            },
            showIcon: {
                type: Boolean,
                default: true
            },
            showCloseIcon: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cw-alert {
        .box {
            height: 42px;
            background: #F0F8FF;
            box-shadow: 0 2px 4px 0 #E1E8F4;
            border-radius: 2px;
            border: 1px solid #C5DAFF;
            padding: 11px 8px 11px 11px;
            display: flex;
            align-items: center;

            .left-icon {
                margin-right: 7px;
                font-size: 16px;
                margin-bottom: 1px;
            }

            .content {
                flex: 1;
                font-size: 14px;
                margin-bottom: 1px;
                color: #63656E;
            }

            .close-icon {
                width: 28px;
                height: 28px;
                font-size: 24px;
                line-height: 28px;
                cursor: pointer;
            }
        }

        .info {
            background-color: #F0F8FF;

            .left-icon {
                color: #3A84FF;
            }

            .close-icon {
                color: #A3C5FD;
            }
        }
    }
</style>
