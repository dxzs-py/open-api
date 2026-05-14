<template>
    <div class="cw-fading-circle" :style="{ '--custom-bg': color, height: size, width: size }">
        <div class="cw-circle1 cw-circle"></div>
        <div class="cw-circle2 cw-circle"></div>
        <div class="cw-circle3 cw-circle"></div>
        <div class="cw-circle4 cw-circle"></div>
        <div class="cw-circle5 cw-circle"></div>
        <div class="cw-circle6 cw-circle"></div>
        <div class="cw-circle7 cw-circle"></div>
        <div class="cw-circle8 cw-circle"></div>
    </div>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: '#3A84FF'
            },
            size: {
                type: String,
                default: '12px'
            }
        }
    }
</script>

<style>
    .cw-fading-circle {
        position: relative;
    }

    .cw-fading-circle .cw-circle {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .cw-fading-circle .cw-circle::before {
        content: "";
        display: block;
        margin: 0 auto;
        width: 16%;
        height: 25%;
        /* background-color: #3A84FF; */
        background-color: var(--custom-bg);
        border-radius: 50%;
        -webkit-animation: cw-circleFadeDelay 1s infinite ease-in-out both;
        animation: cw-circleFadeDelay 1s infinite ease-in-out both;
    }

    .cw-fading-circle .cw-circle1 {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    .cw-fading-circle .cw-circle2 {
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .cw-fading-circle .cw-circle3 {
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .cw-fading-circle .cw-circle4 {
        -webkit-transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        transform: rotate(135deg);
    }

    .cw-fading-circle .cw-circle5 {
        -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    .cw-fading-circle .cw-circle6 {
        -webkit-transform: rotate(225deg);
        -ms-transform: rotate(225deg);
        transform: rotate(225deg);
    }

    .cw-fading-circle .cw-circle7 {
        -webkit-transform: rotate(270deg);
        -ms-transform: rotate(270deg);
        transform: rotate(270deg);
    }

    .cw-fading-circle .cw-circle8 {
        -webkit-transform: rotate(315deg);
        -ms-transform: rotate(315deg);
        transform: rotate(315deg);
    }

    .cw-fading-circle .cw-circle1::before {
        -webkit-animation-delay: .13s;
        animation-delay: .13s;
    }

    .cw-fading-circle .cw-circle2::before {
        -webkit-animation-delay: .26s;
        animation-delay: .26s;
    }

    .cw-fading-circle .cw-circle3::before {
        -webkit-animation-delay: .39s;
        animation-delay: .39s;
    }

    .cw-fading-circle .cw-circle4::before {
        -webkit-animation-delay: .52s;
        animation-delay: .52s;
    }

    .cw-fading-circle .cw-circle5::before {
        -webkit-animation-delay: .65s;
        animation-delay: .65s;
    }

    .cw-fading-circle .cw-circle6::before {
        -webkit-animation-delay: .78s;
        animation-delay: .78s;
    }

    .cw-fading-circle .cw-circle7::before {
        -webkit-animation-delay: .91s;
        animation-delay: .91s;
    }

    .cw-fading-circle .cw-circle8::before {
        animation-delay: 1.04s;
    }

    @-webkit-keyframes cw-circleFadeDelay {

        0% {
            opacity: .05;
        }

        100% {
            opacity: .7;
        }
    }

    @keyframes cw-circleFadeDelay {

        0% {
            opacity: .05;
        }

        100% {
            opacity: .7;
        }
    }
</style>
