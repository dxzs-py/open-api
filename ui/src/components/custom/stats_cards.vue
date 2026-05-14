<template>
    <div class="stats-card" :class="bodyClass">
        <div :class="cardClass" v-for="(card,index) in cards" :key="index" @click="handleClick">
            <div class="card-text">
                <div class="card-text-num" :title="card.num">{{ card.num }}</div>
                <div class="card-text-name">
                    <div class="card-name" :title="card.name">{{ card.name }}</div>
                    <div v-if="card.info.length > 0 && displayInfo" style="margin-left: 9px;">
                        <bk-popover :content="card.info" placement="bottom-start" style="margin-top: 2px;">
                            <i class="iconfont icon-xianxingtubiao-tishi"></i>
                        </bk-popover>
                    </div>
                </div>
            </div>
            <div class="card-icon">
                <div class="card-icon-background" :class="shapeClass" :style="{ background: card.background }">
                    <i :class="card.icon" :style="{ color: card.color }"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'stats-card',
        props: {
            // card
            displayDirection: {
                type: String,
                default: 'horizontal'
            },
            shape: {
                type: String,
                default: 'circle'
            },
            displayInfo: {
                type: Boolean,
                default: true
            },
            showVertical: {
                type: Boolean,
                default: false
            },
            // data
            cardList: {
                type: Array,
                default: () => ([])
            }
        },
        data() {
            return {
                cards: []
            }
        },
        computed: {
            bodyClass() {
                return {
                    'show-vertical': this.showVertical
                }
            },
            cardClass() {
                return {
                    'card-body': true,
                    'horizontal-body': this.displayDirection === 'horizontal',
                    'vertical-body': this.displayDirection === 'vertical'
                }
            },
            shapeClass() {
                return {
                    'card-icon-hexagon': this.shape === 'hexagon',
                    'card-icon-circle': this.shape === 'circle'
                }
            }
        },
        watch: {
            cardList: {
                handler(val) {
                    this.cards = val
                },
                immediate: true
            }
        },
        methods: {
            handleClick() {
                this.$emit('card-click')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .stats-card {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
    }

    .show-vertical {
        flex-direction: column;
        justify-content: space-between;

        .card-body {
            margin-left: 0;
        }
    }

    .card-body {
        flex-grow: 1;
        display: flex;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        margin-left: 16px;
        background: #ffffff;
    }

    .card-body:hover {
        cursor: pointer;
        box-shadow: 0 1px 5px 0 rgba(25, 40, 60, 0.2);
        /*卡片动效*/
        /*.card-icon {*/
        /*    animation: enlarge 100ms linear;*/
        /*    animation-fill-mode: forwards;*/
        /*}*/
    }

    .vertical-body {
        flex-direction: column-reverse;
        justify-content: space-around;
        align-items: center;
        min-height: 230px;
        padding: 20px 20px;
    }

    .horizontal-body {
        flex-direction: row;
        justify-content: space-between;
        max-height: 105px;
        padding: 20px 24px;
    }

    .card-body:nth-child(1) {
        margin-left: 0;
    }

    .card-text {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .card-text-num {
        max-width: 130px;
        font-size: 24px;
        font-weight: bold;
        color: #63656E;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .card-text-name {
        font-size: 12px;
        font-weight: 400;
        color: #979BA5;
        display: flex;
        flex-direction: row;
    }

    .card-name {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .card-icon {
        width: 60px;
        height: 60px;
        text-align: center;
        font-size: 30px;

        .iconfont {
            font-size: inherit;
        }
    }

    .card-icon-background {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .card-icon-circle {
        border-radius: 50%;
    }

    .card-icon-hexagon {
        background: url("../../assets/svg/background-hexagon.svg") 3px -1px no-repeat !important;
    }

    /*放大特效*/
    @keyframes enlarge {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1.2);
        }
    }

</style>
