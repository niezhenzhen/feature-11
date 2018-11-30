<template>
    <div class="v-burangings">
        <div class="v-bur">
            <h4>各事业部销售额排名</h4>
            <div class="v-list margin-top-10"><p>排名</p>
                <p>事业部名称</p>
            <p>销售额</p></div>
            <swiper ref="mySwiper" :options="swiperOption" v-if="deptTops !== undefined &&deptTops.length > 1">
                <swiper-slide v-for='(item,index) in deptTops' v-bind:key="index">
                    <div class="v-burlist listleft">
                        <p v-if="index < 9"><span class="circle-blue">0{{index+1}}</span></p>
                        <p v-if="index > 8"><span class="circle-blue">{{index+1}}</span></p>
                        <p>{{item.deptName}}</p>
                        <p>{{item.sales}}万</p>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
    name: 'depttops',
    components: {
        swiper,
        swiperSlide
    },
    props: ['deptTops'],
    data () {
        return {
            swiperOption: {
                direction: 'vertical',
                autoplay: true,
                loop: true,
                speed: 5000,
                slidesPerView: 7,
                slidesPerGroup: 7,
                observer: true,
                observeParents: true,
                disableOnInteraction: false,
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
    .v-burangings {
        position: absolute;
        top: 166px;
        right: 50px;
        width: 445px;
        height: 445px;
        overflow: hidden;
        padding-top: 15px;
        background: url("../../static/images/righttop.png") no-repeat;
        background-size: 100% 100%;
    }

    .v-bur {
        width: 400px;
        margin-left: 15px;
    }

    .v-burlist {
        height: 42px;
        padding-top: 5px;
        clear: both;
    }
    .v-burlist p{
        text-align: center;
        float: left;
        font-size: 16px;
        height: 42px;
        line-height: 42px;
        overflow: hidden;
    }
    .listleft p:nth-child(2){
        text-align: left;
        padding-left: 5%;
    }
    .v-burlist p:nth-child(1){
        width: 20%;
    }
    .v-burlist p:nth-child(2){
        width: 45%;
        background-color: rgb(20, 30, 60);
    }
    .v-burlist p:nth-child(3){
        width: 35%;
        background-color: rgb(20, 30, 60);
    }

    .v-list {
        width: 100%;
        height: 30px;
        display: inline-block;
    }

    .v-list p{
        width: 41%;
        text-align: center;
        float: left;
        font-size: 16px;
        overflow: hidden;
    }
    .v-list p:nth-child(1){
        width: 20%;
    }
    .v-list p:nth-child(2){
        width: 50%;
    }
    .v-list p:nth-child(3){
        width: 30%;
    }
    h4 {
        font-size: 26px;
        text-align: center;
    }

    .circle-blue {
        display: block;
        width: 35px;
        height: 35px;
        line-height: 35px;
        border-radius: 35px;
        background: #1f8196;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2px;
    }
</style>
