<template>
    <div class="stats-card" :style="{ height: `${height}px` }">
        <div class="card-body" v-for="(card,index) in cards" :key="index">
            <div class="card-icon" v-if="showIcon">
                <div class="card-icon-background">
                    <i :class="card.icon"></i>
                </div>
            </div>
            <div class="card-text" :class="objClass">
                <div class="card-text-num" :title="card.num" :style="{ color: card.color }">{{ card.num }}</div>
                <div class="card-text-name">
                    <div class="card-name" :title="card.name">{{ card.name }}</div>
                    <span v-if="card.info.length > 0 && displayInfo" style="margin-left: 9px;">
                        <bk-popover :content="card.info" placement="bottom-start" style="margin-top: 3px;">
                            <i class="iconfont icon-xianxingtubiao-tishi"></i>
                        </bk-popover>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'display-card',
        props: {
            // card
            displayInfo: {
                type: Boolean,
                default: true
            },
            height: {
                type: Number,
                default: 66
            },
            showIcon: {
                type: Boolean,
                default: true
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
            objClass: function() {
                return {
                    'no-icon': !this.showIcon
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
        }
    }
</script>

<style lang="scss" scoped>
    .stats-card {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .card-body {
        flex-grow: 1;
        display: flex;
        height: 100%;
        background: #ffffff;
        flex-direction: row;
        align-items: center;
        padding: 3px 24px;
        border-left: 1px solid #DCDEE5;
    }

    .card-body:nth-child(1) {
        border-left: none;
    }

    .card-text {
        height: 100%;
        margin-left: 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
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
        align-items: center;
    }

    .card-name {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        text-align: center;
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
        color: #3A84FF;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: url("../../assets/svg/background-hexagon.svg") 3px 0 no-repeat;
    }

    .no-icon {
        margin: 0 auto !important;
    }
</style>
