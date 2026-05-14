<template>
    <div class="flow-card">
        <div class="flow-card-body">
            <bk-steps
                :ext-cls="extCls"
                :theme="theme"
                :direction="direction"
                size="small"
                line-type="solid"
                :status="status"
                :cur-step.sync="curStep"
                :steps="objectSteps"
                :controllable="controllable"
                @step-changed="handleStepChanged">
            </bk-steps>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'flow-card',
        props: {
            // step
            direction: {
                type: String,
                default: 'vertical'
            },
            curStep: {
                type: Number,
                default: 4
            },
            stepCount: {
                type: Number,
                default: 4
            },
            theme: {
                type: String,
                default: 'success'
            },
            status: {
                type: String,
                default: 'error'
            },
            controllable: {
                type: Boolean,
                default: false
            },
            extCls: {
                type: String,
                default: ''
            },
            // data
            stepList: {
                type: Array,
                default: () => ([])
            }
        },
        data() {
            return {
                objectSteps: []
            }
        },
        watch: {
            stepList: {
                handler(val, old) {
                    this.objectSteps = val.slice(0, this.stepCount)
                },
                immediate: true
            },
            stepCount: {
                handler(val, old) {
                    this.objectSteps = this.stepList.slice(0, val)
                },
                immediate: true
            }
        },
        methods: {
            handleClick(index) {
                this.$emit('click', this.stepList, this.objectSteps)
            },
            handleStepChanged(index) {
                this.$emit('step-changed', index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .flow-card {
        padding: 0 20px;
        display: flex;
        flex-direction: column;

        /deep/ .bk-steps-success {

            .bk-step.done .bk-step-number {
                background: #2dcb56;
            }

            .bk-step.done::after {
                background-image: linear-gradient(#D8D8D8 100%, transparent 0);
            }
        }

        /deep/ .bk-steps-vertical {

            .bk-step {
                margin-bottom: 0;
            }

            .bk-step::after {
                left: 4px !important;
                top: 10px !important;
            }

            .bk-step:nth-last-child(1)::after {
                display: none;
            }
        }

        /deep/ .bk-step {
            overflow: unset;

            .bk-step-indicator {
                width: 9px;
                height: 9px;
            }

            i, .bk-step-number .number {
                display: none;
            }

            .bk-step-title {
                line-height: 12px;
                font-size: 14px;
                color: #63656E !important;
            }

            .bk-step-description {
                margin-top: 10px;
                color: #979BA5 !important;
            }
        }
    }

    .flow-card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex: 1;
    }

    .flow-title {
        font-size: 14px;
        font-weight: 600;
        color: #63656E;
    }

    .flow-btn {
        font-size: 12px;
        font-weight: 400;
        color: #3A84FF;
    }

    .flow-card-body {
        flex: 10;
    }
</style>
