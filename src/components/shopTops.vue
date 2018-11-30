<template>
    <div class="v-rankings">
        <div class="v-rank">
            <h4>店铺销售额排名</h4>
            <div class="v-title margin-top-10 font-16">
                <p>店铺名称</p>
                <p>销售额</p>
                <p>排名</p>
            </div>
            <ul class="v-list font-16 listleft" v-for='(item,index) in shopTops' v-bind:key='index'>
                <li class="green" v-if="index === 0">
                    <p>{{item.shopName}}</p>
                    <p>{{item.sales}}万</p>
                    <p>TOP1</p>
                </li>
                <li class="green" v-if="index === 1">
                    <p >{{item.shopName}}</p>
                    <p>{{item.sales}}万</p>
                    <p>TOP2</p>
                </li>
                <li class="green" v-if="index === 2">
                    <p>{{item.shopName}}</p>
                    <p>{{item.sales}}万</p>
                    <p>TOP3</p>
                </li>
            </ul>
            <swiper :options="swiperOption1" v-if="shopTops !== undefined && shopTops.length > 1">
                <swiper-slide v-for='(item,index) in shopTops' v-bind:key='index'
                              v-if="index !== 0&&index !== 1&&index !== 2 ">
                    <ul class="v-list font-16 listleft">
                        <li >
                            <p>{{item.shopName}}</p>
                            <p>{{item.sales}}万</p>
                            <p v-if="index < 9">0{{index+1}}</p>
                            <p v-if="index > 8">{{index+1}}</p>
                        </li>
                    </ul>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
    name: 'shoptops',
    components: {swiper, swiperSlide},
    props: ['shopTops'],
    data () {
        return {
            swiperOption1: {
                direction: 'vertical',
                autoplay: true,
                loop: true,
                speed: 1000,
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: '2%',
                observer: true,
                observeParents: true,
                autoplayDisableOnInteraction: false
            }
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
        }
    }
}
</script>

<style scoped>
    .v-rankings {
        position: absolute;
        top: 161px;
        left: 51px;
        width: 440px;
        height: 442px;
        padding: 10px 16px 11px;
        background: url("../../static/images/lefttop.png") no-repeat;
        background-size: 100% 100%;
    }

    .v-rank {
        width: 405px;
    }
    .v-list.font-14{
        font-size: 14px;
    }
    .v-list.font-16{
        font-size: 16px;
    }
    .green {
        background-image: linear-gradient(180deg,
        #248ea5 0%,
        #1f8196 100%);
    }

    .vgreen {
        background-image: linear-gradient(6deg,
        #092938 0%,
        #0b3245 100%);
    }

    .v-list {
        width: 405px;
    }

    .v-list li {
        clear: both;
        background-color: rgb(20, 30, 60);
        line-height: 42px;
        overflow: hidden;
    }
    .listleft li p:nth-child(1){
        text-align: left;
        margin-left: 3%;
    }
    .font-16{
        font-size: 16px;
    }
    .font-18{
        font-size: 18px;
    }
    .v-list p {
        float: left;
        height: 42px;
        text-align: center;
    }
    .v-title p {
        float: left;
        height: 42px;
    }
    .v-title p:nth-child(1){
        width: 53%;
        margin-left: 15%;
    }
    .v-title p:nth-child(2){
        width: 16%;
        text-align: center;
    }
    .v-title p:nth-child(3){
        width: 16%;
        text-align: center;
    }
    .v-list p:nth-child(1){
        width: 64%;
    }
    .v-list p:nth-child(2){
        width: 18%;
    }
    .v-list p:nth-child(3){
        width: 15%;
    }
    h4 {
        font-size: 26px;
        text-align: center;
    }
</style>
