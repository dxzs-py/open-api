<template>
    <div class="process-card">
        <div class="single-process" v-for="(process,index) in data" :key="index">
            <div class="num-process" :style="{ background: process.background, color: process.color }">{{index + 1}}</div>
            <div class="content-process">{{process.info}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'process-card',
        props: {
            data: {
                type: Array,
                default: () => ([])
            }
        }
    }
</script>

<style lang="scss" scoped>
    .process-card {
        display: flex;
        flex-direction: column;
        min-height: 160px;
        height: 100%;
        justify-content: space-around;

        .single-process {
            display: flex;
            flex-direction: row;
            align-items: center;

            .num-process {
                height: 24px;
                width: 24px;
                border-radius: 50%;
                font-size: 12px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                text-align: center;
                font-weight: 600;
            }

            .content-process {
                margin-left: 5px;
                font-size: 12px;
                font-weight: 400;
                color: #63656E;
                width: 89%;
            }
        }
    }
</style>
