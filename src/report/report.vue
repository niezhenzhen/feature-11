<template>
    <div class="report-wrap">
        <div id="ReportArea" class="report" v-if="totalSale">
            <div class="report-title">全公司GMV</div>

            <div class="total-sale">
                <div class="money-symbol"></div>
                <div class="total-sale-dot"></div>
                <div class="sale-num">
                    <template v-for="(item, i) in totalSale">
                        <div v-bind:key="i" class="sale-num-item">{{item}}</div>
                    </template>
                </div>
                <div class="sale-unit">万</div>
            </div>

            <div class="report-yoy">
                同比增长 <span>{{yoy}}</span> %
            </div>

            <div class="report-date-time">截止 {{nowDateTime}}</div>

            <div class="report-table" v-if="platformTopList.length">
                <div class="table-head">各平台</div>
                <template v-for="(item, i) in platformTopList">
                    <div v-bind:key="i" class="table-row">
                        <span>{{item.platformName}}</span>
                        <span>{{item.sales}}万</span>
                    </div>
                </template>
            </div>

            <div class="report-table" v-if="brandTopList.length">
                <div class="table-head">各品牌</div>
                <template v-for="(item, i) in brandTopList">
                    <div v-bind:key="i" class="table-row">
                        <span>{{item.brandName}}</span>
                        <span>{{item.sales}}万</span>
                    </div>
                </template>
            </div>

            <div class="report-table" v-if="deptTopList.length">
                <div class="table-head">各事业部群</div>
                <template v-for="(item, i) in deptTopList">
                    <div v-bind:key="i" class="table-row">
                        <span>{{item.deptName}}</span>
                        <span>{{item.sales}}万</span>
                    </div>
                </template>
            </div>

            <div class="report-logo">
                <img src="../../static/images/logo.png" alt="南极电商">
            </div>
        </div>

        <div class="report-actions">
            <div class="report-btn" @click="exportReport">导出图片</div>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import dayjs from 'dayjs'

function formatMoney (amount, decimalCount = 2, decimal = '.', thousands = ',') {
    try {
        decimalCount = Math.abs(decimalCount)
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount

        const negativeSign = amount < 0 ? '-' : ''

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
        let j = (i.length > 3) ? i.length % 3 : 0

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
    } catch (e) {
        console.log(e)
    }
}

export default {
    name: 'Report',

    data () {
        return {
            reportData: null,
            totalSale: '000,000',
            yoy: '',
            nowDateTime: '',
            platformTopList: [],
            brandTopList: [],
            deptTopList: []
        }
    },

    methods: {
        dataURLtoBlob (dataurl) {
            let arr = dataurl.split(',')
            let mime = arr[0].match(/:(.*?);/)[1]
            let bstr = atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new Blob([u8arr], {type: mime})
        },

        exportReport () {
            html2canvas(document.getElementById('ReportArea'), {
                scale: 3
            })
                .then((canvas) => {
                    let link = document.createElement('a')
                    let imgData = canvas.toDataURL({
                        format: 'png', multiplier: 4
                    })
                    let blob = this.dataURLtoBlob(imgData)
                    let objurl = URL.createObjectURL(blob)

                    const date = dayjs().format('YYYY-MM-DD')
                    link.download = '全公司GMV_' + date + '.png'

                    link.href = objurl

                    link.click()
                })
        },

        loadData () {
            this.axios.get('/d11/double/elevenmanag', {
                responseType: 'json'
            })
                .then(response => {
                    if (response.status !== 200) {
                        alert('请求错误!')
                        return false
                    }
                    const res = response.data
                    if (res.code !== 200) {
                        alert(res.msg)
                        return false
                    }
                    const { allSales, yoy, nowDateTime, brandTopList, deptTopList, platformTopList } = res.body

                    /**
                     * 格式化总销售额
                     *
                     *  1. 每三位添加逗号
                     *  2. 不足6位则补0
                     */
                    let totalSale = (allSales / 10000).toFixed()
                    let len = 6 - totalSale.length
                    if (totalSale.length < 6) {
                        for (let i = 0; i < len; i++) {
                            totalSale = '0' + totalSale
                        }
                    }
                    this.totalSale = totalSale
                    this.yoy = yoy.replace('%', '')
                    this.nowDateTime = dayjs(nowDateTime).format('YYYY 年 MM 月 DD 日 HH:mm')

                    // 元 改为万元
                    const commonIterator = item => {
                        item.sales = formatMoney(item.sales / 10000, 0)
                        return item
                    }
                    this.brandTopList = brandTopList.map(commonIterator)
                    this.deptTopList = deptTopList.map(commonIterator)
                    this.platformTopList = platformTopList.map(commonIterator)
                    window.scrollTop = 0
                })
        }
    },

    created () {
        this.loadData()
    }
}
</script>

<style lang="scss">
body,
html {
    width: auto;
    height: auto;
    overflow: scroll;
}

.report-wrap {
    .report-actions {
        margin: 30px auto;
        text-align: center;
        .report-btn {
            width: 414px;
            overflow-x: scroll;
            background: #49b1f5;
            border: 1px solid #49b1f5;
            line-height: 38px;
            text-align: center;
            user-select: none;
        }
    }

    .report {
        overflow-x: scroll;
        width: 414px;
        padding-top: 158px;
        padding-bottom: 24px;
        line-height: 1;
        background: url("../../static/images/report-bg.png") no-repeat #080c22;
        background-size: 100%;

        &-title {
            text-align: center;
            font-size: 20px;
            color: #fff;
            margin-bottom: 10px;
        }

        .total-sale {
            position: relative;
            padding: 0 70px;
            margin-bottom: 18px;
            .money-symbol {
                position: absolute;
                left: 46px;
                top: 39px;
                width: 20px;
                height: 20px;
                background: url("../../static/images/money-symbol.png");
                background-size: contain;
            }

            &-dot {
                position: absolute;
                left: 204px;
                bottom: 0;
                width: 6px;
                height: 9px;
                background: url("../../static/images/report-dot.png");
                background-size: contain;
            }

            .sale-num {
                display: flex;
                font-size: 38px;
                &-dot {

                }
                &-item {
                    font-family: PixelLCD;
                    padding-top: 14px;
                    width: 38px;
                    height: 60px;
                    background: #e41168;
                    border: solid 1px #191952;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:not(:first-child) {
                        margin-left: 8px;
                    }
                    &:nth-child(3) {
                        margin-right: 7px;
                    }
                }
            }

            .sale-unit {
                position: absolute;
                top: 33px;
                right: 42px;
                font-size: 26px;
            }
        }

        &-yoy {
            line-height: 1;
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
            span {
                font-size: 24px;
            }
        }

        &-date-time {
            text-align: center;
            font-size: 14px;
            font-weight: lighter;
            color: rgba(255, 255, 255, 0.8);
        }

        &-table {
            margin: 24px 32px 0;
            .table-head {
                width: 100%;
                height: 38px;
                line-height: 38px;
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 6px;
                text-align: center;
                background: url("../../static/images/report-table-bg.png");
                background-size: 100% 100%;
                margin-bottom: 14px;
            }
            .table-row {
                background: rgba(20, 30, 60, 0.5);
                width: 100%;
                height: 38px;
                padding: 0 32px;
                font-size: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 11px;
            }
        }

        &-logo {
            text-align: center;
            img {
                height: 26px;
                margin: 0 auto;
            }
        }
    }
}
</style>
