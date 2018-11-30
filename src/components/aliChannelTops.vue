<template>
    <div class="v-channel">
        <div class="bounce-dot">
            <div></div>
            <div></div>
        </div>
        <h4>阿里各营销频道销售额(含占比)</h4>
        <div class="v-border">
            <swiper :options="aliSwiperOption" v-if="aliChannelTops !== undefined && aliChannelTops.length > 1">
                <swiper-slide v-for="(item, index) in aliChannelTops" v-bind:key="index">
                    <div class="v-bchannel">
                        <div class="circlebg"></div>
                        <div class="element1">{{item.percent}}%</div>
                        <p class="v-num">{{item.sales}}万</p>
                        <p class="v-name">{{item.channelName}}</p>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="blue-line">
                <div class="pink-line"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
    name: 'alichanneltops',
    components: {swiper, swiperSlide},
    props: ['aliChannelTops'],
    data () {
        return {
            aliSwiperOption: {
                slidesPerView: 3,
                initialSlide: 0,
                speed: 3000,
                autoplay: true,
                loop: true,
                observer: true,
                observeParents: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    mounted () {
    },
    methods: {}
}
</script>

<style scoped>
    .v-channel {
        position: absolute;
        bottom: 30px;
        right: 50px;
        width: 500px;
        height: 410px;
        overflow: hidden;
        background: url("../../static/images/rightbottom.png") no-repeat;
        background-size: 100% 100%;
    }

    .bounce-dot {
        position: absolute;
        right: 70px;
    }

    .v-bchannel {
        height: 270px;
        text-align: center;
        position: relative;
    }

    .v-border {
        width: 410px;
        position: relative;
        top: 46px;
        right: -60px;
    }

    .circlebg {
        width: 140px;
        height: 140px;
        background-image: url("../../static/images/redcircle.png");
        background-size: cover;
        -webkit-animation: warn 5s linear;
        -moz-animation: warn 5s linear;
        animation: warn 5s linear;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    .element1 {
        position: absolute;
        left: 35px;
        top: 11px;
        width: 72px;
        font-size: 16px;
        height: 72px;
        line-height: 72px;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 50%;
        box-shadow: 0 0 0 16px rgb(35, 50, 126);
        margin: auto;
        margin-top: 23px;
        color: rgb(228, 17, 104);
    }

    .v-num, .v-name {
        margin-top: 20px;
        height: 40px;
        font-size: 16px;
        overflow: hidden;
    }

    .blue-line {
        position: absolute;
        top: 200px;
        width: 404px;
        height: 4px;
        background: rgb(68, 102, 244);
    }

    .pink-line {
        position: absolute;
        top: -2px;
        width: 60px;
        height: 8px;
        margin-left: 10px;
        background: rgb(228, 17, 104);
        -webkit-animation: warn1 4s linear;
        -moz-animation: warn1 4s linear;
        animation: warn1 4s linear;
        -webkit-animation-iteration-count: infinite;
        -moz-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
    }

    h4 {
        margin: 10px 110px;
        font-size: 22px;
        width: 100%;
    }

    @keyframes warn {
        0% {
            transform: rotate(0deg);

        }
        100% {
            transform: rotate(-360deg);

        }
    }

    @-webkit-keyframes warn {
        0% {
            transform: rotate(0deg);

        }
        100% {
            transform: rotate(-360deg);

        }
    }

    @keyframes warn1 {
        0% {
            transform: translateX(0);

        }
        100% {
            transform: translateX(330px);

        }
    }

    @-webkit-keyframes warn1 {
        0% {
            transform: translateX(0);

        }
        100% {
            transform: translateX(330px);

        }
    }
</style>
