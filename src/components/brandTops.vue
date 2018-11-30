<template>
    <div class="brand">
        <div class="brand-title">各品牌销售额</div>
        <div class="spin-circle"></div>
        <div class="brand-logos"></div>
        <div class="bounce-dot">
            <div></div>
            <div></div>
        </div>
        <div class="breath-circle">
            <div class="logo-swiper">
                <swiper ref="logoSwiper" :options="logoSwiperOpt" v-if="brandTops !== undefined && brandTops.length > 1">
                    <swiper-slide v-for='(item,index) in brandTops' v-bind:key='index'>
                        <div class="logo-swiper-item">
                            <div class="item-logo">
                                <img :src="item.iconUrl" alt="">
                            </div>
                            <div class="item-val">{{item.sales}}</div>
                            <div class="item-unit">万元</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
    name: 'brandtops',
    props: ['brandTops'],
    components: {swiper, swiperSlide},
    data () {
        return {
            logoSwiperOpt: {
                autoplay: true,
                loop: true,
                speed: 2000
            }
        }
    },
    watch: {
        brandTops: {
            handler (val, oldVal) {
                this.brandTops = val
            },
            deep: true
        }
    },
    mounted () {
    },
    methods: {}
}
</script>

<style scoped lang="scss">
    .brand {
        position: absolute;
        bottom: 30px;
        left: 50px;
        width: 390px;
        height: 400px;
        background: url("../../static/images/leftbottom.png") no-repeat;
        background-size: 100% 100%;
        &-title {
            position: absolute;
            top: 10px;
            left: 167px;
            font-size: 22px;
            color: #fefdfa;
            letter-spacing: 3px;
        }
    }

    .spin-circle {
        position: absolute;
        top: 120px;
        left: 34px;
        width: 248px;
        height: 248px;
        background: url("../../static/images/brand-circle.png");
        background-size: contain;
        animation-name: spin;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    /*
     * https://mrxf.github.io/2016/11/18/css3-breathing-lamp-effect/
     */
    .breath-circle {
        position: absolute;
        top: 110px;
        left: 277px;
        width: 142px;
        height: 142px;
        border-radius: 50%;
        overflow: hidden;
        border: 5px solid #e70f73;
        animation-timing-function: ease-in-out;
        animation-name: breath;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    .brand-logos {
        position: absolute;
        top: 170px;
        left: 80px;
        width: 159px;
        height: 165px;
        background: url("../../static/images/brands_logo.png") no-repeat;
        background-size: contain;
    }

    .logo-swiper {
        &-item {
            padding-top: 25px;
            text-align: center;
        }
        .item {
            &-logo {
                line-height: 1;
                height: 32px;
                overflow: hidden;
                img {
                    height: 32px;
                }
            }
            &-val {
                line-height: 1;
                color: #e41168;
                font-size: 18px;
                margin: 9px 0;
            }
            &-unit {
                line-height: 1;
                color: #ffffff;
                font-size: 20px;
            }
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes breath {
        0% {
            opacity: .6;
            box-shadow: 0 5px 2px rgba(231, 15, 115, 0.4), 0 1px 1px rgba(231, 15, 115, 0.1) inset;
        }
        100% {
            opacity: 1;
            box-shadow: 0 1px 40px rgba(231, 15, 115, 1), 0 1px 30px rgba(231, 15, 115, 1) inset;
        }
    }
    .bounce-dot {
        position: absolute;
        top: 48px;
        left: 90px;
    }
</style>
