<template>
    <div class="sale">
        <div class="money-symbol"></div>
        <IOdometer
            class="sale-total odometer"
            format="(,ddd)"
            :number-length="numberLength"
            :duration="duration"
            :value="total"
        />
    </div>
</template>

<script>
/**
 * odometer 默认不支持数字补0
 *
 * 这里通过修改源码的方式对 odometer 做了扩展
 * https://github.com/wqzwh/odometer
 */
import IOdometer from '../../static/lib/odometer'
import '../../static/styles/odometer-theme-default.css'

export default {
    name: 'totalsales',
    components: {IOdometer},
    props: ['total'],
    data () {
        return {
            numberLength: 10,
            duration: 5000
        }
    },
    methods: {}
}
</script>

<style lang="scss">
    .sale {
        position: absolute;
        top: 180px;
        left: 0;
        right: 0;
        margin: auto;
        width: 790px;
        height: 129px;

        &-total {
            position: absolute;
            top: 0;
            left: 41px;
            font-size: 65px;
            color: #fff;
            height: 92px;
        }
    }

    .money-symbol {
        position: absolute;
        top: 47px;
        left: 0;
        width: 40px;
        height: 40px;
        background: url("../../static/images/money-symbol.png");
        background-size: contain;
    }
</style>
